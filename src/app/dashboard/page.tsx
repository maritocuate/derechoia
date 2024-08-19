import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from '../../../components/Navbar'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { isAuthenticated, getUser } = getKindeServerSession()
  if (!(await isAuthenticated())) {
    redirect('/')
  }

  const user = await getUser()

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
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 sm:flex-row sm:text-left">
      <h1>Dashboard</h1>
      {user?.id}
      <Navbar />
    </MaxWidthWrapper>
  )
}
