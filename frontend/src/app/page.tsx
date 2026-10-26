import Link from 'next/link';
import { Sprout, BookOpen, ShoppingBag, ArrowRight, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-8">
      {/* Banner Principal */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-5 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold border border-emerald-500/30">
            <Sprout className="w-4 h-4" /> Proyecto VerdeUrbano
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Cultiva tu propio espacio verde en la ciudad 🌱
          </h1>
          <p className="text-emerald-100 text-lg leading-relaxed">
            Aprende sobre botánica, gestiona el seguimiento de tus cultivos urbanos y comparte experiencias con nuestra comunidad.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-3">
            <Link href="/blog" className="bg-white text-emerald-900 hover:bg-emerald-50 px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
              Explorar Blog <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/huerta" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
              Mi Huerta
            </Link>
          </div>
        </div>
      </section>

      {/* Tarjetas de Secciones Principales */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Artículos y Guías</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Consejos sobre sustratos, temporadas de siembra, poda y control ecológico de plagas.
            </p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:underline text-sm">
            Ver publicaciones <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Registro de Huerta</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Lleva el control de tus plantas, fechas de siembra y un seguimiento interactivo de tus cultivos.
            </p>
          </div>
          <Link href="/huerta" className="inline-flex items-center gap-1 text-teal-700 font-semibold hover:underline text-sm">
            Ir a mi huerta <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Tienda e Insumos</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Catálogo de herramientas, semillas de temporada y fertilizantes orgánicos para tu huerta.
            </p>
          </div>
          <Link href="/tienda" className="inline-flex items-center gap-1 text-amber-700 font-semibold hover:underline text-sm">
            Ver insumos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}