import type { Metadata } from 'next'
import { Fira_Sans as FontSans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import Providers from '../components/Providers'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title:
    'Legisbot, tu asesor penal argentino. Alimentado con inteligencia artificial.',
  description:
    'Asesor legal orientado a la constitución argentina con inteligencia artificial.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="grainy">
      <Providers>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased grainy',
            fontSans.variable
          )}
        >
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  )
}
