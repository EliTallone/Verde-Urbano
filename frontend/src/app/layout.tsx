import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VerdeUrbano | Comunidad & Huerta',
  description: 'Plataforma para gestión de huertas urbanas, blog de botánica e insumos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
          {children}
        </main>
        <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-12 border-t border-slate-800">
          <p>© {new Date().getFullYear()} VerdeUrbano - Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}