import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VerdeUrbano - Blog & Huerta Urbana',
  description: 'Plataforma comunitaria de jardinería, consejos y huerta en casa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-800 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6">{children}</main>
        <footer className="bg-emerald-900 text-emerald-100 text-center py-6 mt-12">
          <p>© 2026 VerdeUrbano - Blog & Huerta Urbana. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}