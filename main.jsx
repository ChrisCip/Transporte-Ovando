const { useState, useEffect } = React;

const DEFAULT_SERVICES = [
  {
    id: "1",
    name: "Traslado VIP Aeropuerto",
    type: "transfer",
    location: "Punta Cana",
    destination: "Cualquier Hotel en Bávaro / Punta Cana",
    description: "Traslado privado en SUV premium con WiFi a bordo y agua fría. Máxima comodidad para ti y tus acompañantes.",
    price: 75,
    paxLimit: 5,
    icon: "Crown"
  },
  {
    id: "2",
    name: "Excursión Isla Saona",
    type: "excursion",
    location: "Bayahíbe",
    destination: "Isla Saona",
    description: "Día completo en catamarán y lancha rápida. Incluye almuerzo buffet, bebidas nacionales y tiempo en la piscina natural.",
    price: 85,
    paxLimit: 25,
    icon: "Palmtree"
  },
  {
    id: "3",
    name: "Minivan Familiar",
    type: "transfer",
    location: "Aeropuerto Punta Cana",
    destination: "Zonas de Uvero Alto / Macao",
    description: "Espacio amplio para equipaje y sillas de bebé. Ideal para familias grandes que buscan viajar juntas y cómodas.",
    price: 60,
    paxLimit: 8,
    icon: "Users"
  }
];

const App = () => {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [view, setView] = useState("client"); // "client" or "admin"
  const [adminAuth, setAdminAuth] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [toast, setToast] = useState(null);

  // Simple routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin") {
        setView("admin");
      } else {
        setView("client");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleAddService = (newService) => {
    setServices([{ ...newService, id: Date.now().toString() }, ...services]);
    showToast("Servicio creado exitosamente");
  };

  const handleBook = (service) => {
    setBookingService(service);
  };

  const submitBooking = (bookingData) => {
    console.log("=== NUEVA RESERVA (Simulación) ===", bookingData);
    
    // Generar mailto link
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
    showToast("Reserva enviada. El cliente de correo se ha abierto.");
  };

  return (
    <div className="min-h-screen bg-sand-100 font-sans text-navy-900 flex flex-col">
      {view === "client" ? (
        <>
          <Header />
          <main className="flex-1">
            <Hero />
            <ServicesList services={services} onBook={handleBook} />
          </main>
          <Footer />
        </>
      ) : (
        <AdminPanel 
          services={services} 
          onAdd={handleAddService} 
          auth={adminAuth} 
          setAuth={setAdminAuth} 
        />
      )}

      {bookingService && (
        <BookingModal 
          service={bookingService} 
          onClose={() => setBookingService(null)} 
          onSubmit={submitBooking} 
        />
      )}

      {toast && <Toast data={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
