import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import './styles.css'
import { buttonVariants } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession()
  const user = await getUser()
  const authStatus = await isAuthenticated()

  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 sm:flex-row sm:text-left">
      <div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chateá con <span className="text-blue-600">Legisbot</span>,<br />
          tu asesor legal.
        </h1>
        <p className="mt-2 max-w-prose text-zinc-700 sm:text-lg">
          Asesoramiento penal instantáneo con IA.
        </p>
        {/* <Button className="p-5 mt-4 bg-blue-600">Empezá</Button> */}
        {!user && !authStatus ? (
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
        )}
      </div>
      <div className="sm:block mb-5 flex justify-center">
        <Image
          src="/images/legisbot.png"
          alt="Legisbot"
          sizes="100%"
          width={0}
          height={0}
          className="legisbot"
        />
      </div>
    </MaxWidthWrapper>
  )
}
