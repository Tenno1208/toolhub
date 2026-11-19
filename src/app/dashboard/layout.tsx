import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Selama masa pemeliharaan besar-besaran, seluruh akses dashboard dialihkan ke halaman maintenance
  redirect('/');
  return null;
}
