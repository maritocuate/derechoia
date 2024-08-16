import { LogoutButton } from './LogoutButton'
/* import { SubscriptionButton } from './SubscriptionButton' */
import { checkSubscription } from '@/lib/subscription'

export const Navbar = async () => {
  const isPro = await checkSubscription()

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <LogoutButton />
        {isPro ? (
          <div className="badge badge-success">Pro</div>
        ) : (
          <div>no Pro</div>
        )}
        {/* <SubscriptionButton isPro={isPro} /> */}
      </div>
    </div>
  )
}
