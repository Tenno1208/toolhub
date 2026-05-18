import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar' // Import komponen Navbar

const inter = Inter({ subsets: ['latin'] })

// =========================================================================
// 🚀 FIXED: METADATA & OPEN GRAPH DIUPGRADE BIAR EMUT/NONGOL FOTO DI WA
// =========================================================================
export const metadata = {
  title: 'ToolHub - The Ultimate Digital Toolbox',
  description: 'Ekosistem utilitas digital gratis, modern, dan tanpa iklan. Enkripsi teks, kompresi media, dan pembuat portofolio berjalan 100% aman lokal di browsermu.',
  
  // Ini kunci utama buat WhatsApp, Telegram, dan Facebook
  openGraph: {
    title: 'ToolHub - The Ultimate Digital Toolbox',
    description: 'Ekosistem utilitas digital gratis, modern, dan tanpa iklan. Enkripsi teks, kompresi media, dan pembuat portofolio berjalan 100% aman lokal di browsermu.',
    url: 'https://707-tools.netlify.app', // Ganti pakai domain Vercel/Netlify milikmu nanti le
    siteName: 'ToolHub Ecosystem',
    type: 'website',
  },

  // Ini buat pratinjau di Twitter / X
  twitter: {
    card: 'summary_large_image',
    title: 'ToolHub - The Ultimate Digital Toolbox',
    description: 'Semua alat utilitas digital dalam satu tempat, aman dan cepat.',
  },
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