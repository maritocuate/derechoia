import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prismadb from './prismadb'

const DAY_IN_MS = 86_400_000
export const checkSubscription = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const userId = user?.id

  if (!userId) {
    return false
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: '123',
    },
  })
  return true

  /*if (!userSubscription) {
    return false
  }

  const isValid =
    userSubscription.subscriptionId &&
    userSubscription.mercadoPagoCurrentPeriodEnd!.getTime() + DAY_IN_MS >
      Date.now()

  return !!isValid */
}
