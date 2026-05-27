import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from './Icon';

const ADMIN_PASSWORD = "admin123";
const SERVICES_STORAGE_KEY = "transporte-ovando-services";

const SERVICE_TYPES = {
  transfer: "Traslado",
  excursion: "Excursión",
  rental: "Alquiler"
};

const ICON_OPTIONS = [
  ["Car", "Coche"],
  ["Bus", "Bus"],
  ["Palmtree", "Palmera"],
  ["Crown", "VIP"],
  ["Users", "Grupo"],
  ["Map", "Mapa"],
  ["Plane", "Aeropuerto"],
  ["ShipWheel", "Tour"]
];

const MOCK_IMAGE_OPTIONS = [
  {
    label: "Aeropuerto VIP",
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
  },
  {
    label: "Playa Caribe",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    label: "Vehículo familiar",
    url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    label: "Tour privado",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  }
];

const EMPTY_SERVICE = {
  name: "",
  type: "transfer",
  location: "",
  destination: "",
  description: "",
  price: "",
  paxLimit: "",
  icon: "Car",
  imageUrl: MOCK_IMAGE_OPTIONS[0].url
};

const DEFAULT_SERVICES = [
  {
    id: "vip-airport-transfer",
    name: "Traslado VIP Aeropuerto",
    type: "transfer",
    location: "Aeropuerto Punta Cana",
    destination: "Hoteles Bávaro / Punta Cana",
    description: "Traslado privado en SUV premium con WiFi a bordo, agua fría y asistencia desde la terminal hasta tu hotel.",
    price: 75,
    paxLimit: 5,
    icon: "Crown",
    imageUrl: MOCK_IMAGE_OPTIONS[0].url
  },
  {
    id: "isla-saona-excursion",
    name: "Excursión Isla Saona",
    type: "excursion",
    location: "Bayahíbe",
    destination: "Isla Saona",
    description: "Día completo en catamarán y lancha rápida, con almuerzo buffet, bebidas y paradas en aguas cristalinas.",
    price: 85,
    paxLimit: 25,
    icon: "Palmtree",
    imageUrl: MOCK_IMAGE_OPTIONS[1].url
  },
  {
    id: "family-minivan",
    name: "Minivan Familiar",
    type: "transfer",
    location: "Aeropuerto",
    destination: "Uvero Alto / Macao",
    description: "Vehículo amplio para equipaje y grupos familiares, con opción de silla para bebé bajo solicitud.",
    price: 60,
    paxLimit: 8,
    icon: "Users",
    imageUrl: MOCK_IMAGE_OPTIONS[2].url
  }
];

const getInitialServices = () => {
  if (typeof window === "undefined") return DEFAULT_SERVICES;

  try {
    const savedServices = window.localStorage.getItem(SERVICES_STORAGE_KEY);
    if (!savedServices) return DEFAULT_SERVICES;

    const parsedServices = JSON.parse(savedServices);
    return Array.isArray(parsedServices) && parsedServices.length ? parsedServices : DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
};

const formatCurrency = (amount) => `$${Number(amount || 0).toLocaleString("en-US")}`;

const getServiceTypeLabel = (type) => SERVICE_TYPES[type] || SERVICE_TYPES.transfer;

const createServiceId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return Date.now().toString();
};

const ServiceImage = ({ service, className = "" }) => (
  <img
    src={service.imageUrl || "/logo.jpg"}
    alt={service.name}
    className={className}
    loading="lazy"
    onError={(event) => {
      event.currentTarget.src = "/logo.jpg";
    }}
  />
);

// --- Header ---
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Transporte Ovando" className={`h-12 w-auto object-contain rounded-lg shadow-sm transition-all ${scrolled ? "" : "ring-2 ring-white/20"}`} />
        </a>
        <nav className={`hidden md:flex items-center gap-6 font-medium ${scrolled ? "text-navy-800" : "text-white"}`}>
          <a href="#inicio" className="hover:text-brand-400 transition">Inicio</a>
          <a href="#servicios" className="hover:text-brand-400 transition">Servicios</a>
          <a href="#admin" className={`text-sm px-4 py-2 rounded-full transition font-bold ${scrolled ? "bg-navy-100 text-navy-700 hover:bg-navy-200" : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"}`}>Panel Admin</a>
        </nav>
      </div>
    </header>
  );
};

// --- Hero ---
const Hero = () => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-navy-900 text-white overflow-hidden hero-bg grain">
      <div className="max-w-7xl mx-auto px-5 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
        <div className="rise">
          <span className="inline-block py-1 px-4 rounded-full bg-brand-500/20 text-brand-300 text-sm font-semibold mb-5 border border-brand-500/30">
            Tu viaje en buenas manos
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
            Descubre el Caribe con <span className="text-brand-400">Transporte Ovando</span>
          </h1>
          <p className="text-lg md:text-xl text-navy-100 mb-8 max-w-lg leading-relaxed">
            Traslados seguros, excursiones inolvidables y vehículos de primera clase para que disfrutes de tu estadía sin preocupaciones.
          </p>
          <div className="flex gap-4">
            <a href="#servicios" className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-glow flex items-center gap-2">
              Ver Servicios <Icon name="ArrowRight" size={20} />
            </a>
          </div>
        </div>
        <div className="hidden lg:block rise delay-2 relative">
          <img src="/logo.jpg" alt="Ovando" className="relative z-10 w-full max-w-md mx-auto rounded-[2rem] shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500 border-4 border-white/10" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sand-100 to-transparent"></div>
    </section>
  );
};

// --- Services List ---
const ServicesList = ({ services, onBook }) => {
  return (
    <section id="servicios" className="py-24 bg-sand-100 relative">
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 rise">
          <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block">Nuestra Oferta</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-6">Servicios Turísticos</h2>
          <p className="text-navy-600 text-lg">Elige el servicio que mejor se adapte a tus necesidades. Desde traslados privados hasta excursiones de día completo.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <article key={svc.id} className="bg-white rounded-[1.5rem] shadow-soft lift rise border border-navy-100 flex flex-col overflow-hidden" style={{ animationDelay: `${(idx % 3) * 0.1}s` }}>
              <div className="relative aspect-[4/3] bg-navy-100 overflow-hidden">
                <ServiceImage service={svc} className="w-full h-full object-cover transition duration-500 hover:scale-105" />
                <div className="absolute left-5 top-5 w-14 h-14 bg-white/95 text-sky-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Icon name={svc.icon || "Car"} size={28} strokeWidth={1.5} />
                </div>
                <div className="absolute right-5 top-5 px-4 py-1.5 rounded-full bg-navy-900/85 text-white text-xs font-bold uppercase tracking-wider backdrop-blur">
                  {getServiceTypeLabel(svc.type)}
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-2xl font-display font-bold text-navy-900 mb-3 leading-tight">{svc.name}</h3>
                <p className="text-navy-600 mb-6 flex-1">{svc.description}</p>

                <div className="space-y-3 mb-8 text-sm text-navy-700 bg-navy-50/50 p-4 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={18} className="text-brand-500 shrink-0 mt-0.5" />
                    <span><strong>Destino:</strong> {svc.destination}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Users" size={18} className="text-brand-500 shrink-0 mt-0.5" />
                    <span><strong>Límite:</strong> {svc.paxLimit} pax</span>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-6 border-t border-navy-100 gap-4">
                  <div>
                    <p className="text-xs text-navy-500 uppercase font-bold tracking-wider mb-1">Costo</p>
                    <p className="text-3xl font-display font-bold text-navy-900">{formatCurrency(svc.price)}</p>
                  </div>
                  <button
                    onClick={() => onBook(svc)}
                    className="bg-navy-900 hover:bg-brand-500 text-white px-7 py-3.5 rounded-xl font-bold transition shadow-md flex items-center gap-2"
                  >
                    Reservar <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Booking Modal ---
const BookingModal = ({ service, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: service.destination,
    date: "",
    pax: 1
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...formData, serviceName: service.name });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop rise">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-navy-900 text-white p-6 md:p-8 relative shrink-0">
          <button onClick={onClose} className="absolute top-6 right-6 text-navy-200 hover:text-white transition w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Cerrar reserva">
            <Icon name="X" size={20} />
          </button>
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            Reservación
          </div>
          <h3 className="text-3xl font-display font-bold mb-2 leading-tight">Solicitar Reserva</h3>
          <p className="text-navy-200 text-lg flex items-center gap-2">
            <Icon name="CheckCircle2" size={18} className="text-palm-400" /> {service.name}
          </p>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-navy-800 mb-2">Nombre Completo <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400">
                  <Icon name="User" size={18} />
                </div>
                <input required type="text" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-navy-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition bg-navy-50/50 text-navy-900 font-medium" placeholder="Ej. Juan Pérez" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-navy-800 mb-2">Número Telefónico <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400">
                  <Icon name="Phone" size={18} />
                </div>
                <input required type="tel" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-navy-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition bg-navy-50/50 text-navy-900 font-medium" placeholder="+1 (809) 000-0000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-navy-800 mb-2">Destino <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400">
                  <Icon name="MapPin" size={18} />
                </div>
                <input required type="text" value={formData.destination} onChange={(event) => setFormData({ ...formData, destination: event.target.value })} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-navy-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition bg-navy-50/50 text-navy-900 font-medium" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-navy-800 mb-2">Fecha <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400">
                    <Icon name="Calendar" size={18} />
                  </div>
                  <input required type="date" value={formData.date} onChange={(event) => setFormData({ ...formData, date: event.target.value })} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-navy-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition bg-navy-50/50 text-navy-900 font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-800 mb-2">Personas <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400">
                    <Icon name="Users" size={18} />
                  </div>
                  <input required type="number" min="1" max={service.paxLimit} value={formData.pax} onChange={(event) => setFormData({ ...formData, pax: event.target.value })} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-navy-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition bg-navy-50/50 text-navy-900 font-medium" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 md:p-8 border-t border-navy-100 bg-sand-50 shrink-0">
          <button form="booking-form" type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white py-4 rounded-xl font-bold text-lg transition shadow-glow flex justify-center items-center gap-2">
            <Icon name="Mail" size={20} /> Enviar Reserva por Correo
          </button>
          <p className="text-center text-xs text-navy-500 mt-4 flex items-center justify-center gap-1.5">
            <Icon name="Info" size={14} /> La reserva no requiere pago adelantado
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Admin Panel ---
const AdminPanel = ({ services, onCreate, onUpdate, onDelete, onReset, auth, setAuth }) => {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const formTitle = editingService ? "Editar Servicio" : "Nuevo Servicio";

  const handleLogin = (event) => {
    event.preventDefault();
    if (pass === ADMIN_PASSWORD) {
      setAuth(true);
      setError(false);
      setPass("");
    } else {
      setError(true);
    }
  };

  const handleSubmitService = (serviceData) => {
    if (editingService) {
      onUpdate(editingService.id, serviceData);
      setEditingService(null);
      return;
    }

    onCreate(serviceData);
  };

  if (!auth) {
    return (
      <div className="flex-1 flex items-center justify-center p-5 bg-navy-900 admin-gradient">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2rem] shadow-float max-w-sm w-full rise text-center border border-white/10">
          <div className="w-20 h-20 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Icon name="LockKeyhole" size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">Panel Admin</h2>
          <p className="text-navy-500 mb-8 text-sm">Ingresa tu contraseña para continuar</p>

          <div className="text-left mb-6">
            <input
              type="password"
              placeholder="Contraseña"
              value={pass}
              onChange={(event) => {
                setPass(event.target.value);
                setError(false);
              }}
              className={`w-full px-5 py-4 rounded-xl border-2 outline-none transition font-medium ${error ? "border-red-400 bg-red-50 focus:border-red-500 text-red-900" : "border-navy-100 bg-navy-50 focus:border-brand-500 focus:bg-white"}`}
            />
            {error && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><Icon name="AlertCircle" size={14} /> Contraseña incorrecta</p>}
          </div>

          <button type="submit" className="w-full bg-navy-900 hover:bg-brand-500 text-white py-4 rounded-xl font-bold text-lg transition shadow-md flex items-center justify-center gap-2">
            Ingresar <Icon name="ArrowRight" size={20} />
          </button>

          <div className="mt-8 pt-6 border-t border-navy-100">
            <a href="#inicio" className="text-sm font-medium text-navy-500 hover:text-brand-500 flex items-center justify-center gap-2 transition">
              <Icon name="ArrowLeft" size={16} /> Volver al sitio web
            </a>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-sand-100 min-h-screen">
      <header className="bg-navy-900 text-white px-6 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
              <Icon name="ShieldCheck" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold leading-tight">Administración</h1>
              <p className="text-xs text-navy-300">Transporte Ovando</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={onReset} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
              <Icon name="RotateCcw" size={16} /> Restaurar mock
            </button>
            <a href="#inicio" className="text-sm font-medium text-navy-200 hover:text-white flex items-center gap-2 transition px-2 py-2">
              <Icon name="Globe" size={16} /> Ver sitio
            </a>
            <button onClick={() => setAuth(false)} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
              <Icon name="LogOut" size={16} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 lg:p-8 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 h-fit lg:sticky lg:top-28">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-soft border border-navy-100">
            <h2 className="text-2xl font-display font-bold text-navy-900 mb-2 flex items-center gap-2">
              <Icon name={editingService ? "Pencil" : "PlusSquare"} size={24} className="text-brand-500" /> {formTitle}
            </h2>
            <p className="text-sm text-navy-500 mb-6">Los cambios se guardan en este navegador hasta conectar una base de datos.</p>
            <AdminForm
              key={editingService?.id || "new-service"}
              initialService={editingService}
              onSubmit={handleSubmitService}
              onCancel={editingService ? () => setEditingService(null) : undefined}
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-navy-900 flex items-center gap-2">
              <Icon name="LayoutList" size={24} className="text-brand-500" /> Servicios Activos
            </h2>
            <span className="bg-navy-900 text-white text-sm font-bold px-3 py-1 rounded-full">{services.length}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((svc) => (
              <article key={svc.id} className="bg-white rounded-2xl shadow-sm border border-navy-100 overflow-hidden hover:shadow-md transition">
                <div className="aspect-[16/9] bg-navy-100 overflow-hidden">
                  <ServiceImage service={svc} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center shrink-0">
                        <Icon name={svc.icon || "Car"} size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-900 leading-tight mb-1">{svc.name}</h3>
                        <p className="text-xs text-navy-500 flex items-center gap-1"><Icon name="MapPin" size={12} /> {svc.location}</p>
                      </div>
                    </div>
                    <span className="font-display font-bold text-lg text-brand-600 whitespace-nowrap">{formatCurrency(svc.price)}</span>
                  </div>

                  <p className="text-sm text-navy-600 line-clamp-2">{svc.description}</p>

                  <div className="pt-4 border-t border-navy-50 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{getServiceTypeLabel(svc.type)}</span>
                      <span className="text-xs font-semibold text-navy-700 flex items-center gap-1"><Icon name="Users" size={12} /> {svc.paxLimit} pax</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingService(svc)} className="w-10 h-10 rounded-lg bg-navy-50 hover:bg-navy-100 text-navy-700 flex items-center justify-center transition" aria-label={`Editar ${svc.name}`}>
                        <Icon name="Pencil" size={16} />
                      </button>
                      <button onClick={() => onDelete(svc.id)} className="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition" aria-label={`Eliminar ${svc.name}`}>
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

const AdminForm = ({ initialService, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => ({
    ...EMPTY_SERVICE,
    ...(initialService || {}),
    price: initialService?.price ?? "",
    paxLimit: initialService?.paxLimit ?? ""
  }));

  const previewService = useMemo(() => ({
    name: formData.name || "Vista previa del servicio",
    imageUrl: formData.imageUrl
  }), [formData.imageUrl, formData.name]);

  const updateField = (field, value) => {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      paxLimit: Number(formData.paxLimit),
      imageUrl: formData.imageUrl.trim()
    });

    if (!initialService) {
      setFormData(EMPTY_SERVICE);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="aspect-[16/9] rounded-2xl bg-navy-100 overflow-hidden border border-navy-100">
        <ServiceImage service={previewService} className="w-full h-full object-cover" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Imagen del servicio *</label>
        <input required type="url" value={formData.imageUrl} onChange={(event) => updateField("imageUrl", event.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 transition" placeholder="https://..." />
        <div className="grid grid-cols-2 gap-2 mt-3">
          {MOCK_IMAGE_OPTIONS.map((imageOption) => (
            <button key={imageOption.url} type="button" onClick={() => updateField("imageUrl", imageOption.url)} className="text-xs bg-navy-50 hover:bg-brand-50 text-navy-700 hover:text-brand-700 border border-navy-100 hover:border-brand-100 px-3 py-2 rounded-lg font-semibold transition">
              {imageOption.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Nombre del Servicio *</label>
        <input required type="text" value={formData.name} onChange={(event) => updateField("name", event.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 transition" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Tipo *</label>
          <div className="relative">
            <select value={formData.type} onChange={(event) => updateField("type", event.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 transition appearance-none">
              {Object.entries(SERVICE_TYPES).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-navy-500"><Icon name="ChevronDown" size={16} /></div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Ícono *</label>
          <div className="relative">
            <select value={formData.icon} onChange={(event) => updateField("icon", event.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 transition appearance-none">
              {ICON_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-navy-500"><Icon name="ChevronDown" size={16} /></div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Ubicación de Salida *</label>
        <input required type="text" value={formData.location} onChange={(event) => updateField("location", event.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 transition" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Destino(s) *</label>
        <input required type="text" value={formData.destination} onChange={(event) => updateField("destination", event.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 transition" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Descripción *</label>
        <textarea required rows="3" value={formData.description} onChange={(event) => updateField("description", event.target.value)} className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 resize-none transition"></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Costo ($) *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400 font-bold">$</div>
            <input required type="number" min="0" value={formData.price} onChange={(event) => updateField("price", event.target.value)} className="w-full pl-8 pr-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 transition" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy-600 mb-1.5">Pax Max. *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400"><Icon name="Users" size={16} /></div>
            <input required type="number" min="1" value={formData.paxLimit} onChange={(event) => updateField("paxLimit", event.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy-200 focus:border-brand-500 outline-none bg-navy-50 transition" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className="sm:w-1/3 bg-navy-100 hover:bg-navy-200 text-navy-700 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
            <Icon name="X" size={20} /> Cancelar
          </button>
        )}
        <button type="submit" className="flex-1 bg-navy-900 hover:bg-brand-500 text-white py-4 rounded-xl font-bold text-lg transition shadow-md flex items-center justify-center gap-2">
          <Icon name="Save" size={20} /> {initialService ? "Guardar Cambios" : "Guardar Servicio"}
        </button>
      </div>
    </form>
  );
};

// --- Toast ---
const Toast = ({ data, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 left-6 sm:left-auto z-[110] bg-navy-900 text-white px-6 py-4 rounded-2xl shadow-float flex items-center gap-4 rise border border-white/10">
      <div className="w-10 h-10 rounded-full bg-palm-500/20 text-palm-400 flex items-center justify-center shrink-0">
        <Icon name="CheckCircle2" size={24} />
      </div>
      <div>
        <h4 className="font-bold text-sm mb-0.5">Éxito</h4>
        <p className="text-navy-200 text-sm">{data.message}</p>
      </div>
      <button onClick={onClose} className="ml-auto text-navy-400 hover:text-white transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Cerrar mensaje">
        <Icon name="X" size={16} />
      </button>
    </div>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="bg-navy-900 text-navy-200 py-16 border-t border-navy-800">
    <div className="max-w-7xl mx-auto px-5">
      <div className="grid md:grid-cols-3 gap-10 items-center border-b border-navy-800 pb-12 mb-8">
        <div className="text-center md:text-left">
          <img src="/logo.jpg" alt="Logo" className="h-16 w-auto mx-auto md:mx-0 object-contain rounded-lg mb-4 opacity-90 grayscale hover:grayscale-0 transition duration-500" />
          <p className="max-w-xs mx-auto md:mx-0 text-sm text-navy-400 leading-relaxed">Brindando las mejores experiencias de transporte en el Caribe. Viaja seguro, viaja con Ovando.</p>
        </div>
        <div className="text-center">
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Enlaces Rápidos</h4>
          <div className="flex flex-col gap-3 text-sm">
            <a href="#inicio" className="hover:text-brand-400 transition inline-block">Inicio</a>
            <a href="#servicios" className="hover:text-brand-400 transition inline-block">Nuestros Servicios</a>
          </div>
        </div>
        <div className="text-center md:text-right">
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contacto</h4>
          <div className="flex flex-col gap-3 text-sm items-center md:items-end text-navy-400">
            <span className="flex items-center gap-2"><Icon name="Phone" size={16} className="text-brand-400" /> +1 (809) 801-6460</span>
            <span className="flex items-center gap-2"><Icon name="Mail" size={16} className="text-brand-400" /> reservas@ovando.com</span>
            <a href="https://www.instagram.com/transporteturisticoovando/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-400 transition mt-2">
              <Icon name="Instagram" size={16} className="text-brand-400" /> Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-navy-500">
        <p>© 2026 Transporte Turístico Ovando. Todos los derechos reservados.</p>
        <a href="#admin" className="hover:text-brand-400 transition flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-navy-800 hover:border-brand-500/50">
          <Icon name="Lock" size={12} /> Acceso Administrador
        </a>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [services, setServices] = useState(getInitialServices);
  const [view, setView] = useState("client");
  const [adminAuth, setAdminAuth] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    const handleHashChange = () => {
      setView(window.location.hash === "#admin" ? "admin" : "client");
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 5000);
  };

  const handleCreateService = (newService) => {
    setServices((currentServices) => [{ ...newService, id: createServiceId() }, ...currentServices]);
    showToast("Servicio creado exitosamente");
  };

  const handleUpdateService = (serviceId, updatedService) => {
    setServices((currentServices) => currentServices.map((service) => (
      service.id === serviceId ? { ...updatedService, id: serviceId } : service
    )));
    showToast("Servicio actualizado exitosamente");
  };

  const handleDeleteService = (serviceId) => {
    setServices((currentServices) => currentServices.filter((service) => service.id !== serviceId));
    showToast("Servicio eliminado");
  };

  const handleResetServices = () => {
    setServices(DEFAULT_SERVICES);
    showToast("Servicios mock restaurados");
  };

  const submitBooking = (bookingData) => {
    const subject = encodeURIComponent(`Nueva Reserva: ${bookingData.serviceName}`);
    const body = encodeURIComponent(`Detalles de la Reserva:
----------------------
Cliente: ${bookingData.name}
Teléfono: ${bookingData.phone}
Servicio: ${bookingData.serviceName}
Destino: ${bookingData.destination}
Fecha: ${bookingData.date}
Pasajeros: ${bookingData.pax}`);

    window.open(`mailto:admin@ovandotransporte.com?subject=${subject}&body=${body}`);
    setBookingService(null);
    showToast("Reserva enviada. Revisa tu cliente de correo.");
  };

  return (
    <div className="min-h-screen bg-sand-100 font-sans text-navy-900 flex flex-col">
      {view === "client" ? (
        <>
          <Header />
          <main className="flex-1">
            <Hero />
            <ServicesList services={services} onBook={setBookingService} />
          </main>
          <Footer />
        </>
      ) : (
        <AdminPanel
          services={services}
          onCreate={handleCreateService}
          onUpdate={handleUpdateService}
          onDelete={handleDeleteService}
          onReset={handleResetServices}
          auth={adminAuth}
          setAuth={setAdminAuth}
        />
      )}
      {bookingService && <BookingModal service={bookingService} onClose={() => setBookingService(null)} onSubmit={submitBooking} />}
      {toast && <Toast data={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
