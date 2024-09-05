import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import './styles.css'
import { buttonVariants } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import Seo from '@/components/Seo'

export default async function Home() {
  const { getUser, isAuthenticated } = getKindeServerSession()
  const user = await getUser()
  const authStatus = await isAuthenticated()

  return (
    <>
      <Seo metaRobots="index" url="https://legisbot.com.ar" />
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40">
        <div className="flex justify-between sm:flex-row sm:text-left">
          <div>
            <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
              Chateá con <span className="text-blue-600">Legisbot</span>,<br />
              tu asesor legal.
            </h1>
            <p className="mt-2 max-w-prose text-zinc-700 sm:text-lg">
              Asesoramiento penal instantáneo con IA.
            </p>
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
        </div>

        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-2 lg:px-4">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/images/dashboard-preview.jpg"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  )
}
