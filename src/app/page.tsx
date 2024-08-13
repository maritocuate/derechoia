import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import './styles.css'

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 sm:flex-row sm:text-left text-center flex-col-reverse flex align-top justify-between">
      <div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chateá con <span className="text-blue-600">Legisbot</span>,<br />
          tu asesor legal.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Asesoramiento penal instantáneo con IA.
        </p>
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
