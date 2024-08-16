import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from '../../../components/Navbar'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { isAuthenticated } = getKindeServerSession()
  if (!(await isAuthenticated())) {
    redirect('/')
  }

  const preapprovalId = searchParams['preapproval_id'] as string
  if (preapprovalId) {
    await fetch(`${process.env.KINDE_SITE_URL}/api/webhook`, {
      method: 'POST',
      body: JSON.stringify({ preapproval_id: preapprovalId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <Navbar /> */}
    </div>
  )
}
