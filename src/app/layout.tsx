import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  metadataBase: new URL('https://707-tools.netlify.app'),
  title: 'ToolHub — Sedang Dalam Pemeliharaan',
  description: 'ToolHub sedang ditingkatkan ke versi 4.0. Semua alat digital akan kembali tersedia setelah pembaruan selesai.',
  openGraph: {
    title: 'ToolHub — Pemeliharaan Sistem',
    description: 'ToolHub sedang ditingkatkan ke versi 4.0. Semua alat digital akan kembali tersedia setelah pembaruan selesai.',
    url: 'https://707-tools.netlify.app',
    siteName: 'ToolHub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolHub — Pemeliharaan Sistem',
    description: 'ToolHub sedang ditingkatkan ke versi 4.0.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-[var(--bg)] text-[var(--fg)] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
