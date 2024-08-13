import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex align-top justify-between">
      <div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chateá con <span className="text-blue-600">Legisbot</span>,<br />
          tu asesor legal.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Asesoramiento Penal Instantáneo con IA.
        </p>
      </div>
      <div>
        <Image
          src="/images/legisbot.png"
          alt="Legisbot"
          sizes="100%"
          width={0}
          height={0}
          style={{ width: '100px', height: 'auto' }}
        />
      </div>
    </MaxWidthWrapper>
  )
}
