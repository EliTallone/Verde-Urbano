'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { User, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const respuesta = await api.post('/login/', {
        username,
        password,
      });

      if (respuesta.data && respuesta.data.token) {
        localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('username', username);
        router.push('/huerta');
      }
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      setError('Usuario o contraseña incorrectos. Verifica tus credenciales.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
      {/* Botón Volver */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver atrás
      </button>

      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
          <LogIn className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800">Iniciar Sesión</h1>
        <p className="text-slate-500 text-sm">
          Ingresa tus credenciales para administrar tu huerta urbana.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3.5 rounded-xl border border-red-200 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Nombre de Usuario
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="Ej: admin o eliana"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
        >
          {cargando ? 'Verificando...' : 'Ingresar a mi Cuenta'}
        </button>
      </form>

      <div className="text-center pt-2 text-xs text-slate-500">
        ¿Aún no tienes cuenta?{' '}
        <Link href="/registro" className="text-emerald-700 font-bold hover:underline">
          Crear una cuenta
        </Link>
      </div>
    </div>
  );
}