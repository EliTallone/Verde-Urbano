'use client';

import Link from 'next/link';
import { Sprout, BookOpen, ShoppingBag, Calendar, User, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-3">
        {/* Identidad del Proyecto */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide hover:text-emerald-200 transition-colors">
          <Sprout className="w-7 h-7 text-emerald-400" />
          <span>VerdeUrbano</span>
        </Link>

        {/* Links de Navegación Principal */}
        <nav className="flex items-center gap-4 md:gap-6 font-medium text-sm md:text-base">
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

        {/* Acceso a Usuario / Registro / Login */}
        <div className="flex items-center gap-2.5">
          <Link href="/login" className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">
            <User className="w-4 h-4" /> Iniciar Sesión
          </Link>
          <Link href="/registro" className="flex items-center gap-1 bg-white hover:bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">
            <UserPlus className="w-4 h-4" /> Registrarse
          </Link>
        </div>
      </div>
    </header>
  );
}