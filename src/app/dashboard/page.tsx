'use client'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutLink>Logout</LogoutLink>
    </div>
  )
}
