import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          Asesoramiento Penal Instantáneo con IA
        </p>
      </div>
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
        Chateá con <span className="text-blue-600">Abotgado</span>, el mejor
        asesor legal.
      </h1>
      <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
        Obtén respuestas precisas y rápidas sobre derecho penal en cualquier
        momento.
      </p>
    </MaxWidthWrapper>
  )
}
