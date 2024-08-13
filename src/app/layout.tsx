import type { Metadata } from 'next'
import { Fira_Sans as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

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
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased grainy',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
