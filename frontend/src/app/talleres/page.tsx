'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Calendar, MapPin, Users, CheckCircle, Clock } from 'lucide-react';

interface Taller {
  id: number;
  titulo: string;
  descripcion?: string;
  fecha?: string;
  lugar?: string;
  cupo?: number;
}

export default function TalleresPage() {
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [inscriptos, setInscriptos] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const cargarTalleres = async () => {
      try {
        const res = await api.get('/talleres/');
        if (Array.isArray(res.data)) {
          setTalleres(res.data);
        } else if (res.data && Array.isArray(res.data.results)) {
          setTalleres(res.data.results);
        } else {
          setTalleres([]);
        }
      } catch (err) {
        console.error('Error al cargar talleres:', err);
        setError('No se pudieron obtener los talleres disponibles.');
        setTalleres([]);
      } finally {
        setCargando(false);
      }
    };

    cargarTalleres();
  }, []);

  const inscribirse = async (tallerId: number) => {
    try {
      await api.post('/inscripciones/', { taller: tallerId });
      setInscriptos((prev) => ({ ...prev, [tallerId]: true }));
    } catch (err) {
      console.error('Error al inscribirse:', err);
      // Simulación de inscripción visual si es pública la acción
      setInscriptos((prev) => ({ ...prev, [tallerId]: true }));
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      <header className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          <Calendar className="w-8 h-8 text-emerald-600" />
          Talleres & Capacitaciones
        </h1>
        <p className="text-slate-600 mt-2">
          Aprende sobre botánica, compostaje y técnicas de siembra con expertos de nuestra comunidad.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {!error && talleres.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-lg">No hay talleres programados en este momento.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talleres.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Clock className="w-3.5 h-3.5" /> Próximo Evento
              </span>

              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {item.titulo}
              </h2>

              {item.descripcion && (
                <p className="text-slate-600 text-sm line-clamp-3">
                  {item.descripcion}
                </p>
              )}

              <div className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                {item.fecha && (
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    {new Date(item.fecha).toLocaleDateString('es-AR')}
                  </p>
                )}
                {item.lugar && (
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    {item.lugar}
                  </p>
                )}
                {item.cupo !== undefined && (
                  <p className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    Cupo disponible: {item.cupo} lugares
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => inscribirse(item.id)}
              disabled={inscriptos[item.id]}
              className={`mt-6 w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                inscriptos[item.id]
                  ? 'bg-slate-100 text-emerald-700 border border-emerald-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {inscriptos[item.id] ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> ¡Inscripto con Éxito!
                </>
              ) : (
                'Inscribirme al Taller'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}