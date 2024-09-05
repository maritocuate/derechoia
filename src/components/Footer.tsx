import Link from 'next/link'

export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between p-7 justify-center height-auto items-center w-full bg-white relative bottom-0 h-10 text-xs text-gray-400">
      <div>Copyright © 2024 Legisbot IA Inc.</div>
      <Link href="https://mariodev.com.ar">⚙️ mariodev</Link>
    </div>
  )
}
