import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExperienceStrip } from './components/ExperienceStrip';
import { GoogleReviews } from './components/GoogleReviews';
import { ServicesList } from './components/ServicesList';
import { InstagramSection } from './components/InstagramSection';
import { BookingModal } from './components/BookingModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { WhatsAppFab } from './components/WhatsAppFab';
import { DEFAULT_SERVICES } from './data/constants';
import { buildBookingWhatsAppLink } from './utils/bookingLead';
import { createServiceId, getInitialServices } from './utils/helpers';

const App = () => {
  const [services, setServices] = useState(getInitialServices);
  const [view, setView] = useState("client");
  const [adminAuth, setAdminAuth] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingPrefill, setBookingPrefill] = useState({});
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [servicesSaving, setServicesSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let alive = true;

    const loadServices = async () => {
      try {
        const response = await fetch('/api/services', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (alive && Array.isArray(data.services)) {
          setServices(data.services);
        }
      } catch {
        // Si la API no responde, mantenemos el catalogo base compilado.
      }
    };

    loadServices();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const handleHashChange = () => setView(window.location.hash === "#admin" ? "admin" : "client");
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const showToast = (message) => {
    setToast({ message });
    window.setTimeout(() => setToast(null), 4500);
  };

  const persistServices = async (nextServices, successMessage, previousServices) => {
    setServices(nextServices);
    setServicesSaving(true);

    try {
      const response = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ services: nextServices }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.message || 'save_failed');
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      if (Array.isArray(data.services)) setServices(data.services);
      showToast(successMessage);
      return true;
    } catch (error) {
      setServices(previousServices);
      if (error?.status === 401) {
        setAdminAuth(false);
        showToast("Tu sesion admin vencio. Ingresa de nuevo.");
      } else {
        showToast(error?.message || "No se pudo guardar el catalogo remoto.");
      }
      return false;
    } finally {
      setServicesSaving(false);
    }
  };

  const handleCreateService = (newService) => {
    const nextServices = [{ ...newService, id: createServiceId() }, ...services];
    return persistServices(nextServices, "Servicio creado", services);
  };

  const handleUpdateService = (serviceId, updated) => {
    const nextServices = services.map((service) => (
      service.id === serviceId ? { ...updated, id: serviceId } : service
    ));
    return persistServices(nextServices, "Servicio actualizado", services);
  };

  const handleDeleteService = (serviceId) => {
    const nextServices = services.filter((service) => service.id !== serviceId);
    return persistServices(nextServices, "Servicio eliminado", services);
  };

  const handleResetServices = () => {
    return persistServices(DEFAULT_SERVICES, "Servicios restaurados", services);
  };

  const handleQuote = (quote) => submitBooking(quote);

  const handleBook = (service) => {
    setBookingPrefill({});
    setBookingService(service);
  };

  const submitBooking = async (bookingData) => {
    setBookingSubmitting(true);
    const whatsappUrl = buildBookingWhatsAppLink(bookingData);

    try {
      const emailRequest = fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify(bookingData),
      });

      const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }

      const response = await emailRequest;
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(response.status === 503 ? "email_not_configured" : "send_failed");
        error.status = response.status;
        error.userMessage = data.message;
        throw error;
      }

      setBookingService(null);
      setBookingPrefill({});
      showToast("Solicitud enviada por correo. Continúa la conversación en WhatsApp.");
    } catch (error) {
      const message = error?.status === 503
        ? "El correo de reservas no está configurado en Vercel."
        : error?.userMessage || "No se pudo enviar la solicitud. Intenta por WhatsApp.";
      showToast(message);
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col overflow-x-hidden">
      {view === "client" ? (
        <>
          <Header />
          <main className="flex-1">
            <Hero onQuote={handleQuote} submitting={bookingSubmitting} />
            <ExperienceStrip />
            <GoogleReviews />
            <ServicesList services={services} onBook={handleBook} />
            <InstagramSection />
          </main>
          <Footer />
          <WhatsAppFab />
        </>
      ) : (
        <AdminPanel
          services={services}
          onCreate={handleCreateService}
          onUpdate={handleUpdateService}
          onDelete={handleDeleteService}
          onReset={handleResetServices}
          saving={servicesSaving}
          auth={adminAuth}
          setAuth={setAdminAuth}
        />
      )}
      {bookingService && (
        <BookingModal
          service={bookingService}
          prefill={bookingPrefill}
          onClose={() => { setBookingService(null); setBookingPrefill({}); }}
          onSubmit={submitBooking}
          submitting={bookingSubmitting}
        />
      )}
      {toast && <Toast data={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
