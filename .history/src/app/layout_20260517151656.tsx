import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar' // Import komponen Navbar

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
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased flex flex-col min-h-screen`}>
        {/* Navbar dipasang di sini */}
        <Navbar />
        
        {/* Konten halaman akan masuk ke sini */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  )
}