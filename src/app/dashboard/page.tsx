import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from '../../../components/Navbar'
import ChatWrapper from './components/chat/ChatWrapper'

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
  const userId = user?.id

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
    <>
      <Navbar />

      {userId && (
        <div className="flex w-screen h-screen flex-col">
          <ChatWrapper userId={userId} />
        </div>
      )}
    </>
  )
}
