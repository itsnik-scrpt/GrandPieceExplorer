import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Grand Piece Explorer',
  description:
    'Collaborative deep-sea research platform for One Piece fans tracking the 651m mystery.',
  keywords: ['One Piece', 'Grand Piece', '651m', 'Deep Sea', 'Oda'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}

