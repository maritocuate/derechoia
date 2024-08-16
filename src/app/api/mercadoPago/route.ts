import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import { absoluteUrl } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const settingsUrl = absoluteUrl('/settings')

export async function POST() {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const userId = user?.id
    // const { userId } = auth();
    // const user = await currentUser();

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

    /* if (userSubscription && userSubscription.subscriptionId) {
      const data = {
        init_point:
          "https://www.mercadopago.cl/subscriptions#from-section=menu",
      };
      return new NextResponse(JSON.stringify(data), { status: 200 });
    } */

    const response = await fetch(
      'https://api.mercadopago.com/preapproval_plan',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESSTOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: 'DerechoIA',
          external_reference: userId,
          payer_email: user.email,
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            start_date: new Date().toISOString(),
            transaction_amount: 9000,
            currency_id: 'ARS',
            // notification_url: `${process.env.KINDE_SITE_URL}/api/webhook`, // webhook
          },
          back_url: `${process.env.KINDE_SITE_URL}/callback`, // http://localhost:3000/settings
          // failure: 'http://localhost:3000/dashboard',
          status: 'active',
        }),
      }
    )

    const data = await response.json()
    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    console.log('[MERCADOPAGO_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
