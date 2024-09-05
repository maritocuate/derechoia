import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import ImageLogo from './ImageLogo'
import AuthButton from './AuthButton'

export default async function HeadingSection() {
  const { getUser, isAuthenticated } = getKindeServerSession()
  const user = await getUser()
  const authStatus = await isAuthenticated()

  return (
    <div className="flex justify-between flex-col-reverse sm:flex-row sm:text-left">
      <div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chateá con <span className="text-blue-600">Legisbot</span>,<br />
          tu asesor legal.
        </h1>
        <p className="mt-2 max-w-prose text-zinc-700 sm:text-lg">
          Asesoramiento penal instantáneo con IA.
        </p>

        <AuthButton user={user} authStatus={authStatus} />
      </div>
      <ImageLogo />
    </div>
  )
}
