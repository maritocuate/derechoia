import BackgroundShapes from '@/components/BackgroundShapes'
import Image from 'next/image'

export default function ImageSection() {
  return (
    <div className="relative isolate">
      <BackgroundShapes />
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
  )
}
