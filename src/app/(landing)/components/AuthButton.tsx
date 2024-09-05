import { buttonVariants } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'

interface AuthButtonProps {
  user: any
  authStatus: boolean
}

export default function AuthButton({ user, authStatus }: AuthButtonProps) {
  return !user && !authStatus ? (
    <LoginLink
      className={buttonVariants({
        size: 'lg',
        className: 'mt-5',
      })}
    >
      Ingresá
    </LoginLink>
  ) : (
    <Link
      className={buttonVariants({
        size: 'lg',
        className: 'mt-5',
      })}
      href="/dashboard"
    >
      Empezá
    </Link>
  )
}
