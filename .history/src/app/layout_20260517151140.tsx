import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToolHub - The Ultimate Digital Toolbox',
  description: 'Semua alat utilitas digital dalam satu tempat, aman dan cepat.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  )
}