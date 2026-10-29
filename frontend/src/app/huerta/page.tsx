'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Sprout, Plus, Calendar, Droplets, Sun, CheckCircle, ArrowLeft } from 'lucide-react';

interface Planta {
  id: number;
  nombre_comun?: string;
  nombre?: string;
  nombre_cientifico?: string;
  riego?: string;
  luz?: string;
  temporada?: string;
}

interface ItemHuerta {
  id: number;
  planta_detalle?: Planta;
  fecha_plantacion?: string;
  notas?: string;
}

export default function HuertaPage() {
  const router = useRouter();
  const [catEspecies, setCatEspecies] = useState<Planta[]>([]);
  const [miHuerta, setMiHuerta] = useState<ItemHuerta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const cargarDatos = async () => {
    try {
      // 1. Cargar especies de plantas del backend
      const resPlantas = await api.get('/plantas/').catch(() => ({ data: [] }));
      if (Array.isArray(resPlantas.data)) {
        setCatEspecies(resPlantas.data);
      } else if (resPlantas.data && Array.isArray(resPlantas.data.results)) {
        setCatEspecies(resPlantas.data.results);
      } else {
        setCatEspecies([]);
      }

      // 2. Cargar mi huerta personal
      const resHuerta = await api.get('/huerta-usuario/').catch(() => ({ data: [] }));
      if (Array.isArray(resHuerta.data)) {
        setMiHuerta(resHuerta.data);
      } else if (resHuerta.data && Array.isArray(resHuerta.data.results)) {
        setMiHuerta(resHuerta.data.results);
      } else {
        setMiHuerta([]);
      }
    } catch (err) {
      console.error('Error al cargar datos de huerta:', err);
      setError('No se pudieron obtener los cultivos de la base de datos.');
      setCatEspecies([]);
      setMiHuerta([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const agregarAHuerta = async (plantaId: number) => {
    try {
      await api.post('/huerta-usuario/', {
        planta: plantaId,
        fecha_plantacion: new Date().toISOString().split('T')[0],
      });
      setMensajeExito('¡Planta agregada a tu huerta personal!');
      setTimeout(() => setMensajeExito(''), 3000);
      cargarDatos();
    } catch (err) {
      console.error('Error al agregar cultivo:', err);
      alert('Inicia sesión o verifica los permisos para agregar cultivos.');
    }
  };

  const listaMiHuertaSegura = Array.isArray(miHuerta) ? miHuerta : [];
  const listaEspeciesSegura = Array.isArray(catEspecies) ? catEspecies : [];

  if (cargando) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 py-8">
      {/* Botón Volver Atrás */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver atrás
      </button>

      {/* Encabezado */}
      <header className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          <Sprout className="w-8 h-8 text-teal-600" />
          Mi Huerta Urbana
        </h1>
        <p className="text-slate-600 mt-2">
          Administra tus especies cultivadas, controla las fechas de siembra y consulta requerimientos de riego.
        </p>
      </header>

      {mensajeExito && (
        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>{mensajeExito}</span>
        </div>
      )}

      {/* Sección 1: Mis Cultivos Activos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Mis Cultivos Registrados</h2>
        
        {listaMiHuertaSegura.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500">Aún no agregaste cultivos a tu huerta personal.</p>
            <p className="text-xs text-slate-400 mt-1">Selecciona una planta del catálogo de abajo para comenzar.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listaMiHuertaSegura.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                    En Cultivo
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.planta_detalle?.nombre_comun || item.planta_detalle?.nombre || 'Planta sin nombre'}
                  </h3>
                  {item.fecha_plantacion && (
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Sembrada: {new Date(item.fecha_plantacion).toLocaleDateString('es-AR')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección 2: Catálogo de Plantas Disponibles */}
      <section className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Catálogo de Especies</h2>

        {listaEspeciesSegura.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No hay especies registradas en la base de datos.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listaEspeciesSegura.map((planta) => (
              <div key={planta.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    {planta.nombre_comun || planta.nombre || `Especie #${planta.id}`}
                  </h3>
                  {planta.nombre_cientifico && (
                    <p className="text-xs italic text-slate-500">{planta.nombre_cientifico}</p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-600">
                    {planta.riego && (
                      <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Droplets className="w-3.5 h-3.5 text-blue-500" /> {planta.riego}
                      </span>
                    )}
                    {planta.luz && (
                      <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Sun className="w-3.5 h-3.5 text-amber-500" /> {planta.luz}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => agregarAHuerta(planta.id)}
                  className="mt-5 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Agregar a Mi Huerta
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}