// Reseñas de respaldo (siempre disponibles, sin API).
// Forma normalizada que también produce el hook desde la Places API:
//   { id, author, rating, text, relativeDate, photoUrl? }
// Para actualizarlas a mano: copia texto/nombre/estrellas desde tu ficha de Google.
export const FALLBACK_REVIEWS = [
  {
    id: 'r1',
    author: 'María Fernández',
    rating: 5,
    relativeDate: 'Hace 2 semanas',
    text: 'Excelente servicio desde el aeropuerto de Punta Cana hasta Bávaro. El chofer nos esperaba con un cartel, vehículo impecable y con aire. Puntualísimos. ¡100% recomendados!',
  },
  {
    id: 'r2',
    author: 'James Carter',
    rating: 5,
    relativeDate: 'Hace 1 mes',
    text: 'Booked a private transfer from PUJ to our resort. Driver was bilingual, friendly and on time. Clean SUV, cold water on board. Made our arrival stress-free. Highly recommend!',
  },
  {
    id: 'r3',
    author: 'Carlos Jiménez',
    rating: 5,
    relativeDate: 'Hace 3 semanas',
    text: 'Hicimos la excursión a Isla Saona con ellos y fue espectacular. Coordinaron todo el traslado puerta a puerta sin demoras. Trato cercano y profesional.',
  },
  {
    id: 'r4',
    author: 'Sophie Laurent',
    rating: 5,
    relativeDate: 'Hace 1 mes',
    text: 'Service au top ! Chauffeur ponctuel et très courtois. Véhicule confortable pour toute la famille avec siège bébé. Je referai appel à eux sans hésiter.',
  },
  {
    id: 'r5',
    author: 'Pedro Rosario',
    rating: 5,
    relativeDate: 'Hace 2 meses',
    text: 'Contraté el traslado SDQ a Uvero Alto para mi familia. Minivan amplia, equipaje sin problema y precio justo. Comunicación rápida por WhatsApp. Volveré a usarlos.',
  },
  {
    id: 'r6',
    author: 'Ashley Thompson',
    rating: 4,
    relativeDate: 'Hace 1 mes',
    text: 'Great airport pickup and very professional driver. Only had to wait a few extra minutes but they kept me updated the whole time. Would book again.',
  },
  {
    id: 'r7',
    author: 'Luis Mateo',
    rating: 5,
    relativeDate: 'Hace 3 meses',
    text: 'De lo mejor en Punta Cana. Choferes certificados, muy seguros al manejar y conocen toda la zona. Nos llevaron a Cap Cana y de tour por la costa. Inmejorable.',
  },
  {
    id: 'r8',
    author: 'Giulia Romano',
    rating: 5,
    relativeDate: 'Hace 2 semanas',
    text: 'Servizio eccellente e puntuale dall’aeroporto. Autista gentile e disponibile, auto pulita e comoda. Consigliatissimo per chi visita Punta Cana!',
  },
];
