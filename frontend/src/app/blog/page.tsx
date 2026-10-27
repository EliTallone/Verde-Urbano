'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { BookOpen, Calendar, User, Tag, ArrowLeft } from 'lucide-react';

interface Categoria {
  id: number;
  nombre: string;
}

interface Autor {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
}

interface Articulo {
  id: number;
  titulo: string;
  contenido: string;
  fecha_publicacion?: string;
  fecha_creacion?: string;
  autor?: Autor;
  categoria?: Categoria;
}

export default function BlogPage() {
  const router = useRouter();
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerArticulos = async () => {
      try {
        const respuesta = await api.get('/articulos/');
        if (Array.isArray(respuesta.data)) {
          setArticulos(respuesta.data);
        } else if (respuesta.data && Array.isArray(respuesta.data.results)) {
          setArticulos(respuesta.data.results);
        } else {
          setArticulos([]);
        }
      } catch (err) {
        console.error('Error al cargar artículos:', err);
        setError('No se pudieron cargar las publicaciones del blog.');
        setArticulos([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerArticulos();
  }, []);

  const listaArticulosSegura = Array.isArray(articulos) ? articulos : [];

  if (cargando) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Botón Volver Atrás */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver atrás
      </button>

      <header className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-emerald-600" />
          Blog de Huerta & Jardinería
        </h1>
        <p className="text-slate-600 mt-2">
          Consejos, guías paso a paso y experiencias compartidas por la comunidad de VerdeUrbano.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {!error && listaArticulosSegura.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-lg">No hay artículos disponibles en este momento.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listaArticulosSegura.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              {post.categoria?.nombre && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Tag className="w-3 h-3" /> {post.categoria.nombre}
                </span>
              )}
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {post.titulo}
              </h2>
              <p className="text-slate-600 text-sm line-clamp-3">
                {post.contenido}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {post.autor?.username || 'Comunidad'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {post.fecha_publicacion || post.fecha_creacion
                  ? new Date(post.fecha_publicacion || post.fecha_creacion!).toLocaleDateString('es-AR')
                  : 'Reciente'}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}