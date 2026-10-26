'use client';

import Link from 'next/link';
import { Sprout, BookOpen, ShoppingBag, Calendar, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Identidad del Proyecto */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide hover:text-emerald-200 transition-colors">
          <Sprout className="w-7 h-7 text-emerald-400" />
          <span>VerdeUrbano</span>
        </Link>

        {/* Links de Navegación Principal */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/blog" className="flex items-center gap-1 hover:text-emerald-300 transition-colors">
            <BookOpen className="w-4 h-4" /> Blog
          </Link>
          <Link href="/huerta" className="flex items-center gap-1 hover:text-emerald-300 transition-colors">
            <Sprout className="w-4 h-4" /> Mi Huerta
          </Link>
          <Link href="/tienda" className="flex items-center gap-1 hover:text-emerald-300 transition-colors">
            <ShoppingBag className="w-4 h-4" /> Insumos
          </Link>
          <Link href="/talleres" className="flex items-center gap-1 hover:text-emerald-300 transition-colors">
            <Calendar className="w-4 h-4" /> Talleres
          </Link>
        </nav>

        {/* Acceso a Usuario / Login */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
            <User className="w-4 h-4" /> Iniciar Sesión
          </Link>
        </div>
      </div>
    </header>
  );
}