'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { ShoppingBag, Search, Tag, ShoppingCart, Check } from 'lucide-react';

interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number | string;
  stock?: number;
  categoria_nombre?: string;
}

export default function TiendaPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [agregados, setAgregados] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await api.get('/productos/');
        if (Array.isArray(respuesta.data)) {
          setProductos(respuesta.data);
        } else if (respuesta.data && Array.isArray(respuesta.data.results)) {
          setProductos(respuesta.data.results);
        } else {
          setProductos([]);
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudo cargar el catálogo de insumos.');
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const agregarAlCarrito = (id: number) => {
    setAgregados((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAgregados((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const listaSegura = Array.isArray(productos) ? productos : [];

  const productosFiltrados = listaSegura.filter((p) =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.descripcion && p.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  if (cargando) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <header className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-amber-600" />
            Tienda de Insumos & Jardinería
          </h1>
          <p className="text-slate-600 mt-1">
            Encuentra herramientas, sustratos, semillas de temporada y productos ecológicos para tu huerta.
          </p>
        </div>

        {/* Buscador de Insumos */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-white"
          />
        </div>
      </header>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {!error && productosFiltrados.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-lg">No se encontraron insumos disponibles.</p>
        </div>
      )}

      {/* Rejilla de Productos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosFiltrados.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              {item.categoria_nombre && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Tag className="w-3 h-3" /> {item.categoria_nombre}
                </span>
              )}
              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                {item.nombre}
              </h3>
              {item.descripcion && (
                <p className="text-slate-600 text-sm line-clamp-3">
                  {item.descripcion}
                </p>
              )}
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Precio</span>
                <span className="text-2xl font-black text-slate-900">
                  ${Number(item.precio || 0).toLocaleString('es-AR')}
                </span>
              </div>

              <button
                onClick={() => agregarAlCarrito(item.id)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
                  agregados[item.id]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {agregados[item.id] ? (
                  <>
                    <Check className="w-4 h-4" /> Añadido
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Agregar
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}