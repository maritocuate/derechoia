import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from '../components/Navbar'

export default async function Dashboard() {
  const { isAuthenticated } = getKindeServerSession()
  if (!(await isAuthenticated())) {
    redirect('/')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Navbar />
    </div>
  )
}
