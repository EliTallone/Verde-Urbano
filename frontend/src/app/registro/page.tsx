'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { User, Lock, Mail, UserPlus, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export default function RegistroPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await api.post('/registro/', {
        username,
        email,
        password,
      });

      setExito(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Error al registrar usuario:', err);
      if (err.response?.data?.username) {
        setError('El nombre de usuario ya está registrado.');
      } else if (err.response?.data?.email) {
        setError('El correo electrónico ya está registrado.');
      } else {
        setError('Ocurrió un error al crear la cuenta. Inténtalo nuevamente.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
      {/* Botón Volver Atrás */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver atrás
      </button>

      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
          <UserPlus className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800">Crear Cuenta</h1>
        <p className="text-slate-500 text-sm">
          Únete a la comunidad de VerdeUrbano y gestiona tu huerta.
        </p>
      </div>

      {exito && (
        <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl border border-emerald-200 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>¡Cuenta creada con éxito! Redirigiendo al login...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-3.5 rounded-xl border border-red-200 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleRegistro} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Nombre de Usuario
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="Ej: eliana_urban"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              placeholder="tuemail@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          disabled={cargando || exito}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
        >
          {cargando ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>

      <div className="text-center pt-2 text-xs text-slate-500">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="text-emerald-700 font-bold hover:underline">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}