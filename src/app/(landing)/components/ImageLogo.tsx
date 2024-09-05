import Image from 'next/image'

export default function ImageLogo() {
  return (
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
  )
}
