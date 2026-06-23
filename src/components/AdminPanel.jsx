import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { ServiceImage } from './ServiceImage';
import { AdminForm } from './AdminForm';
import { formatCurrency, getServiceTypeLabel } from '../utils/helpers';

export const AdminPanel = ({ services, onCreate, onUpdate, onDelete, onReset, saving = false, auth, setAuth }) => {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const formTitle = editingService ? "Editar servicio" : "Nuevo servicio";

  // Al entrar: verifica si ya hay sesión válida (cookie HttpOnly del servidor).
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/admin-session', { credentials: 'same-origin' });
        const data = await res.json();
        if (alive && data.authenticated) setAuth(true);
      } catch {
        /* sin backend disponible → no autenticado */
      } finally {
        if (alive) setChecking(false);
      }
    })();
    return () => { alive = false; };
  }, [setAuth]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password: pass }),
      });
      if (res.ok) {
        setAuth(true);
        setPass("");
      } else if (res.status === 503) {
        setError("Acceso admin no configurado en el servidor.");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin-logout', { method: 'POST', credentials: 'same-origin' });
    } catch {
      /* ignora; igual cerramos sesión local */
    }
    setAuth(false);
  };

  const handleSubmitService = async (serviceData) => {
    if (editingService) {
      const saved = await onUpdate(editingService.id, serviceData);
      if (saved) setEditingService(null);
      return saved;
    }
    return onCreate(serviceData);
  };

  if (checking) {
    return (
      <div className="flex-1 flex items-center justify-center p-5 admin-gradient text-white">
        <div className="flex items-center gap-3 text-sm font-medium">
          <Icon name="Loader" size={20} className="animate-spin" /> Verificando sesión…
        </div>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="flex-1 flex items-center justify-center p-5 admin-gradient">
        <form onSubmit={handleLogin} className="glass p-8 md:p-10 rounded-3xl max-w-sm w-full rise text-center">
          <div className="w-20 h-20 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Icon name="LockKeyhole" size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Panel Admin</h2>
          <p className="text-slate-500 mb-8 text-sm">Ingresa tu contraseña para continuar</p>

          <div className="text-left mb-6">
            <input
              type="password"
              placeholder="Contraseña"
              value={pass}
              autoComplete="current-password"
              onChange={(event) => { setPass(event.target.value); setError(""); }}
              className={`w-full px-5 py-4 rounded-xl border-2 outline-none transition font-medium ${error ? "border-rose-400 bg-rose-50 focus:border-rose-500 text-rose-900" : "border-slate-200 bg-white focus:border-cyan-500"}`}
            />
            {error && <p className="text-rose-500 text-sm mt-2 flex items-center gap-1"><Icon name="AlertCircle" size={14} /> {error}</p>}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
            {submitting ? <><Icon name="Loader" size={20} className="animate-spin" /> Ingresando…</> : <>Ingresar <Icon name="ArrowRight" size={20} /></>}
          </button>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <a href="#inicio" className="text-sm font-medium text-slate-500 hover:text-cyan-600 flex items-center justify-center gap-2 transition">
              <Icon name="ArrowLeft" size={16} /> Volver al sitio
            </a>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <header className="bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 text-white px-4 md:px-6 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-md">
              <Icon name="ShieldCheck" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold leading-tight">Administración</h1>
              <p className="text-xs text-cyan-200">Transporte Ovando</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={onReset} disabled={saving} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              <Icon name="RotateCcw" size={16} /> Restaurar catálogo
            </button>
            <a href="#inicio" className="text-sm font-medium text-cyan-100 hover:text-white flex items-center gap-2 transition px-2 py-2">
              <Icon name="Globe" size={16} /> Ver sitio
            </a>
            <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
              <Icon name="LogOut" size={16} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-4 h-fit lg:sticky lg:top-28">
          <div className="bg-white p-6 md:p-7 rounded-3xl shadow-soft border border-slate-100">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Icon name={editingService ? "Pencil" : "PlusSquare"} size={22} className="text-cyan-600" /> {formTitle}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {saving ? "Guardando en Vercel Blob..." : "Guardado remoto en Vercel Blob."}
            </p>
            <AdminForm
              key={editingService?.id || "new-service"}
              initialService={editingService}
              onSubmit={handleSubmitService}
              onCancel={editingService ? () => setEditingService(null) : undefined}
              submitting={saving}
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
              <Icon name="LayoutList" size={22} className="text-cyan-600" /> Servicios activos
            </h2>
            <span className="bg-slate-900 text-white text-sm font-bold px-3 py-1 rounded-full">{services.length}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((service) => (
              <article key={service.id} className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                  <ServiceImage service={service} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center shrink-0">
                        <Icon name={service.icon || "Car"} size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 leading-tight mb-1">{service.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Icon name="MapPin" size={12} /> {service.location}</p>
                      </div>
                    </div>
                    <span className="font-display font-bold text-lg text-amber-600 whitespace-nowrap">{formatCurrency(service.price)}</span>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">{service.description}</p>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-cyan-50 text-cyan-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">{getServiceTypeLabel(service.type)}</span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1"><Icon name="Users" size={12} /> {service.paxLimit} pax</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingService(service)} disabled={saving} className="w-10 h-10 rounded-lg bg-slate-50 hover:bg-cyan-50 hover:text-cyan-700 text-slate-700 flex items-center justify-center transition disabled:opacity-60 disabled:cursor-not-allowed" aria-label={`Editar ${service.name}`}>
                        <Icon name="Pencil" size={16} />
                      </button>
                      <button onClick={() => onDelete(service.id)} disabled={saving} className="w-10 h-10 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition disabled:opacity-60 disabled:cursor-not-allowed" aria-label={`Eliminar ${service.name}`}>
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
