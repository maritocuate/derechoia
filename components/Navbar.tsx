import { LogoutButton } from './LogoutButton'
import { SubscriptionButton } from './SubscriptionButton'
import { checkSubscription } from '@/lib/subscription'

export const Navbar = async () => {
  const isPro = await checkSubscription()

  return (
    <div className="fixed top-0 navbar bg-base-100">
      <div className="flex-1">
        <LogoutButton />
        {isPro && <p className="text-xs">IS PRO</p>}
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}
