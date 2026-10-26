import Link from 'next/link';
import { Sprout, BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Banner Principal */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white rounded-2xl p-8 md:p-12 shadow-lg text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Cultiva tu propio espacio verde en la ciudad 🌱
          </h1>
          <p className="text-emerald-100 text-lg">
            Aprende sobre botánica, gestiona el riego de tu huerta urbana y comparte experiencias con nuestra comunidad de jardinería.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <Link href="/blog" className="bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
              Explorar Blog <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/huerta" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
              Mi Huerta
            </Link>
          </div>
        </div>
      </section>

      {/* Tarjetas de Secciones Principales */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Artículos y Guías</h3>
          <p className="text-slate-600 text-sm">
            Consejos sobre sustratos, temporadas de siembra, poda y control ecológico de plagas.
          </p>
          <Link href="/blog" className="inline-block text-emerald-700 font-semibold hover:underline text-sm">
            Ver publicaciones →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Registro de Huerta</h3>
          <p className="text-slate-600 text-sm">
            Lleva el control de tus plantas, fechas de cultivo y un calendario interactivo de riego.
          </p>
          <Link href="/huerta" className="inline-block text-teal-700 font-semibold hover:underline text-sm">
            Ir a mi huerta →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Tienda e Insumos</h3>
          <p className="text-slate-600 text-sm">
            Catálogo de herramientas, semillas de temporada y fertilizantes orgánicos.
          </p>
          <Link href="/tienda" className="inline-block text-amber-700 font-semibold hover:underline text-sm">
            Ver insumos →
          </Link>
        </div>
      </section>
    </div>
  );
}