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

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId: userId,
      },
      select: {
        subscriptionId: true,
      },
    })

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
    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.log('[MERCADOPAGO_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
