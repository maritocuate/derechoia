'use client'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <LogoutLink>logout</LogoutLink>
      </div>
    </div>
  )
}
