import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../utils/translations';
import { Search, MapPin, Users, Star, ArrowRight, Calendar } from 'lucide-react';
import TourCard from '../components/Tours/TourCard';

const HomePage: React.FC = () => {
  const { state } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const heroImages = [
    'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg', // Wildlife
    'https://images.pexels.com/photos/6249959/pexels-photo-6249959.jpeg', // Culture
    'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg', // Mountains
    'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', // Beaches
    'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg', // Sahel
  ];

  const diversitySpotlight = [
    {
      title: state.language === 'en' ? 'Northern Sahel' : 'Sahel du Nord',
      description: state.language === 'en' 
        ? 'Experience nomadic Fulani culture and vast savanna landscapes'
        : 'Vivez la culture nomade peule et les vastes paysages de savane',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg',
      color: 'bg-secondary-500'
    },
    {
      title: state.language === 'en' ? 'Eastern Rainforests' : 'Forêts de l\'Est',
      description: state.language === 'en'
        ? 'Discover pristine rainforests and incredible wildlife diversity'
        : 'Découvrez des forêts tropicales pristines et une incroyable diversité faunique',
      image: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
      color: 'bg-primary-500'
    },
    {
      title: state.language === 'en' ? 'Atlantic Coast' : 'Côte Atlantique',
      description: state.language === 'en'
        ? 'Relax on volcanic black sand beaches and coastal culture'
        : 'Détendez-vous sur les plages de sable noir volcanique et la culture côtière',
      image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
      color: 'bg-accent-500'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const featuredTours = state.tours.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Cameroon diversity ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('heroTitle', state.language)}
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-yellow-300">
              {t('heroSubtitle', state.language)}
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              {t('heroDescription', state.language)}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder', state.language)}
                className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
              />
              <Link
                to={`/tours${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
                className="bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 transition-colors font-medium"
              >
                {t('searchButton', state.language)}
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-primary-400 mb-2">250+</div>
              <p className="text-gray-300">Ethnic Groups</p>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-accent-400 mb-2">500+</div>
              <p className="text-gray-300">Wildlife Species</p>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-secondary-400 mb-2">10</div>
              <p className="text-gray-300">Diverse Regions</p>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-yellow-400 mb-2">4</div>
              <p className="text-gray-300">Climate Zones</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {state.language === 'en' ? 'Featured Tours' : 'Circuits Vedettes'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {state.language === 'en' 
                ? 'Explore our handpicked selection of tours showcasing Cameroon\'s incredible diversity'
                : 'Explorez notre sélection de circuits mettant en valeur l\'incroyable diversité du Cameroun'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/tours"
              className="inline-flex items-center space-x-2 bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              <span>{state.language === 'en' ? 'View All Tours' : 'Voir Tous les Circuits'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Diversity Spotlight */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {state.language === 'en' ? 'Diversity Spotlight' : 'Diversité en Vedette'}
            </h2>
            <p className="text-lg text-gray-600">
              {state.language === 'en' 
                ? 'From desert to rainforest, discover why Cameroon is called Africa in Miniature'
                : 'Du désert à la forêt tropicale, découvrez pourquoi le Cameroun s\'appelle l\'Afrique en miniature'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {diversitySpotlight.map((spotlight, index) => (
              <div 
                key={index} 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={spotlight.image}
                    alt={spotlight.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 ${spotlight.color} bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{spotlight.title}</h3>
                    <p className="text-sm opacity-90">{spotlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {state.language === 'en' ? 'Why Choose Us' : 'Pourquoi Nous Choisir'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {state.language === 'en' ? 'Local Expertise' : 'Expertise Locale'}
              </h3>
              <p className="text-gray-600">
                {state.language === 'en' 
                  ? 'Our guides are local experts who share authentic cultural insights'
                  : 'Nos guides sont des experts locaux qui partagent des aperçus culturels authentiques'
                }
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-200 transition-colors">
                <Star className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {state.language === 'en' ? 'Exceptional Service' : 'Service Exceptionnel'}
              </h3>
              <p className="text-gray-600">
                {state.language === 'en' 
                  ? 'Personalized experiences with attention to every detail'
                  : 'Expériences personnalisées avec attention à chaque détail'
                }
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors">
                <MapPin className="w-8 h-8 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {state.language === 'en' ? 'Sustainable Tourism' : 'Tourisme Durable'}
              </h3>
              <p className="text-gray-600">
                {state.language === 'en' 
                  ? 'Supporting local communities while preserving natural heritage'
                  : 'Soutenir les communautés locales tout en préservant le patrimoine naturel'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {state.language === 'en' ? 'Ready for Adventure?' : 'Prêt pour l\'Aventure ?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {state.language === 'en' 
              ? 'Start planning your journey through Cameroon\'s incredible diversity today'
              : 'Commencez à planifier votre voyage à travers l\'incroyable diversité du Cameroun aujourd\'hui'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tours"
              className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>{t('bookNow', state.language)}</span>
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-500 transition-colors font-medium"
            >
              {t('learnMore', state.language)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;