import prismadb from '@/lib/prismadb'
import * as mercadopago from 'mercadopago'
import { NextRequest, NextResponse } from 'next/server'
import { addMonths } from 'date-fns'

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESSTOKEN!,
})

export async function POST(request: NextRequest) {
  console.log('xxx 1 WEBHOOK')
  const body = await request
    .json()
    .then(data => data as { preapproval_id: string })

  // Store body data in a variable
  const bodyData = body.preapproval_id
  try {
    const paymentId = Number(bodyData)
    console.log('xxx 1/2')
    var payment = await mercadopago.payment.get(paymentId)
  } catch (error: any) {
    console.log('xxx ERR')
    console.log(error.message)
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 })
  }

  console.log('xxxP', payment)
  if (
    payment.response.status !== 'approved' &&
    payment.response.status_detail !== 'accredited'
  ) {
    return new NextResponse(
      `Webhook error: ${payment.response.status_detail}`,
      { status: 400 }
    )
  }

  if (payment.response.external_reference === undefined) {
    return new NextResponse(`User Id is required`, { status: 400 })
  }

  console.log(payment.response.date_approved)

  const startDate = new Date(payment.response.date_approved)

  const endDate = addMonths(startDate, 1) // one month from the current date

  const userSubscription = await prismadb.userSubscription.findFirst({
    where: { userId: payment?.response?.external_reference },
  })

  if (userSubscription) {
    console.log('xxxUPDATE')
    await prismadb.userSubscription.update({
      where: {
        userId: payment?.response?.external_reference,
      },
      data: {
        subscriptionId: payment?.response?.payer.id,
        mercadoPagoCurrentPeriodEnd: endDate,
      },
    })
  } else {
    console.log('xxxCREATE')
    await prismadb.userSubscription.create({
      data: {
        userId: payment?.response?.external_reference,
        subscriptionId: payment?.response?.payer.id,
        mercadoPagoCurrentPeriodEnd: endDate,
      },
    })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
