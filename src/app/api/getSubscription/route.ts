import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export async function POST(request: Request) {
  console.log('1')
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const userId = user?.id

    if (!userId || !user) {
      return new NextResponse('Unauthorized no log in', { status: 401 })
    }

    const body = await request.json()
    const preapprovalId = body.preapproval_id
    const response = await fetch(
      `https://api.mercadopago.com/preapproval/${preapprovalId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESSTOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()

    if (data.status !== 'authorized') {
      return new NextResponse(`MP webhook error: ${data.status}`, {
        status: 400,
      })
    }
    if (data.external_reference === undefined) {
      return new NextResponse(`User Id (external_reference) is required`, {
        status: 400,
      })
    }

    const startDate = new Date(data.auto_recurring.start_date)
    const endDate = new Date(data.next_payment_date)
    const userSubscription = await prismadb.userSubscription.findFirst({
      where: { userId: data.external_reference },
    })
    if (userSubscription) {
      console.log('UPDATE')
      await prismadb.userSubscription.update({
        where: {
          userId: data.external_reference,
        },
        data: {
          subscriptionId: String(data.payer_id),
          mercadoPagoCurrentPeriodEnd: endDate,
        },
      })
    } else {
      console.log('CREATE')
      await prismadb.userSubscription.create({
        data: {
          userId: data.external_reference,
          subscriptionId: String(data.payer_id),
          mercadoPagoCurrentPeriodEnd: endDate,
        },
      })
    }

    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.log('[MERCADOPAGO_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
