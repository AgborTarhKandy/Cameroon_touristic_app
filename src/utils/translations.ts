export const translations = {
  en: {
    // Navigation
    home: 'Home',
    tours: 'Tours',
    about: 'About Us',
    blog: 'Blog',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    
    // Hero Section
    heroTitle: 'Discover Cameroon',
    heroSubtitle: 'Africa in Miniature',
    heroDescription: 'Experience incredible diversity - from rainforest gorillas to Sahel nomads, volcanic peaks to pristine beaches',
    searchPlaceholder: 'Search tours by destination, activity, or experience...',
    searchButton: 'Search Tours',
    
    // Common
    bookNow: 'Book Now',
    learnMore: 'Learn More',
    viewDetails: 'View Details',
    price: 'Price',
    duration: 'Duration',
    difficulty: 'Difficulty',
    rating: 'Rating',
    reviews: 'reviews',
    
    // Tour Categories
    cultural: 'Cultural',
    wildlife: 'Wildlife',
    adventure: 'Adventure',
    'eco-tourism': 'Eco-Tourism',
    
    // Regions
    northern: 'Northern',
    eastern: 'Eastern',
    western: 'Western',
    southwest: 'Southwest',
    littoral: 'Littoral',
    center: 'Center',
    
    // Booking
    bookingTitle: 'Complete Your Booking',
    selectDate: 'Select Date',
    numberOfPeople: 'Number of People',
    specialRequests: 'Special Requests',
    totalPrice: 'Total Price',
    
    // Footer
    aboutCompany: 'Promoting sustainable tourism in Cameroon',
    followUs: 'Follow Us',
    newsletter: 'Newsletter',
    newsletterText: 'Stay updated with our latest tours and offers',
    subscribe: 'Subscribe',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    tours: 'Circuits',
    about: 'À Propos',
    blog: 'Blog',
    contact: 'Contact',
    login: 'Connexion',
    register: 'S\'inscrire',
    logout: 'Déconnexion',
    dashboard: 'Tableau de Bord',
    
    // Hero Section
    heroTitle: 'Découvrez le Cameroun',
    heroSubtitle: 'L\'Afrique en Miniature',
    heroDescription: 'Vivez une diversité incroyable - des gorilles de forêt aux nomades du Sahel, des pics volcaniques aux plages pristines',
    searchPlaceholder: 'Rechercher des circuits par destination, activité ou expérience...',
    searchButton: 'Rechercher',
    
    // Common
    bookNow: 'Réserver',
    learnMore: 'En Savoir Plus',
    viewDetails: 'Voir Détails',
    price: 'Prix',
    duration: 'Durée',
    difficulty: 'Difficulté',
    rating: 'Note',
    reviews: 'avis',
    
    // Tour Categories
    cultural: 'Culturel',
    wildlife: 'Faune',
    adventure: 'Aventure',
    'eco-tourism': 'Éco-Tourisme',
    
    // Regions
    northern: 'Nord',
    eastern: 'Est',
    western: 'Ouest',
    southwest: 'Sud-Ouest',
    littoral: 'Littoral',
    center: 'Centre',
    
    // Booking
    bookingTitle: 'Finaliser Votre Réservation',
    selectDate: 'Sélectionner la Date',
    numberOfPeople: 'Nombre de Personnes',
    specialRequests: 'Demandes Spéciales',
    totalPrice: 'Prix Total',
    
    // Footer
    aboutCompany: 'Promotion du tourisme durable au Cameroun',
    followUs: 'Suivez-nous',
    newsletter: 'Newsletter',
    newsletterText: 'Restez informé de nos derniers circuits et offres',
    subscribe: 'S\'abonner',
  }
};

export const t = (key: string, language: 'en' | 'fr'): string => {
  return translations[language][key as keyof typeof translations.en] || key;
};