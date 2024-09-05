import Image from 'next/image'

export default function ImageLogo() {
  return (
    <div className="flex justify-center sm:block mb-5">
      <Image
        src="/images/legisbot.png"
        alt="Legisbot"
        sizes="100%"
        width={0}
        height={0}
        className="legisbot"
      />
    </div>
  )
}
