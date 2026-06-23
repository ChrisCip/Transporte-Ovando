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
import { DEFAULT_SERVICES, SERVICES_STORAGE_KEY } from './data/constants';
import { createServiceId, getInitialServices } from './utils/helpers';

const App = () => {
  const [services, setServices] = useState(getInitialServices);
  const [view, setView] = useState("client");
  const [adminAuth, setAdminAuth] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingPrefill, setBookingPrefill] = useState({});
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
  }, [services]);

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

  const handleCreateService = (newService) => {
    setServices((current) => [{ ...newService, id: createServiceId() }, ...current]);
    showToast("Servicio creado");
  };

  const handleUpdateService = (serviceId, updated) => {
    setServices((current) => current.map((service) => (
      service.id === serviceId ? { ...updated, id: serviceId } : service
    )));
    showToast("Servicio actualizado");
  };

  const handleDeleteService = (serviceId) => {
    setServices((current) => current.filter((service) => service.id !== serviceId));
    showToast("Servicio eliminado");
  };

  const handleResetServices = () => {
    setServices(DEFAULT_SERVICES);
    showToast("Servicios restaurados");
  };

  const handleQuote = (quote) => {
    setBookingPrefill(quote);
    const target = services.find((service) => service.type === "transfer") || services[0];
    if (target) {
      setBookingService(target);
    } else {
      const element = document.getElementById("servicios");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBook = (service) => {
    setBookingPrefill({});
    setBookingService(service);
  };

  const submitBooking = async (bookingData) => {
    setBookingSubmitting(true);
    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const error = new Error(response.status === 503 ? "email_not_configured" : "send_failed");
        error.status = response.status;
        throw error;
      }

      setBookingService(null);
      setBookingPrefill({});
      showToast("Solicitud enviada. Te contactaremos para confirmar.");
    } catch (error) {
      const message = error?.status === 503
        ? "El correo de reservas no está configurado en Vercel."
        : "No se pudo enviar la solicitud. Intenta por WhatsApp.";
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
            <Hero onQuote={handleQuote} />
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
