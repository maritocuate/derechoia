import type { Metadata } from 'next'
import { Fira_Sans as FontSans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import './globals.css'
import Providers from './dashboard/components/Providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Derecho IA',
  description:
    'Inteligencia artificial al servicio de la constitución argentina.',
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
