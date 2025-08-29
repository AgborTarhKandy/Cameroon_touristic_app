import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../utils/translations';
import { 
  Star, Clock, Users, MapPin, Calendar, Check, X, 
  Heart, Share2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import TourCard from '../components/Tours/TourCard';
import toast from 'react-hot-toast';

const TourDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const tour = state.tours.find(t => t.id === id);
  
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour Not Found</h2>
          <Link to="/tours" className="text-primary-500 hover:text-primary-600">
            ← Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = state.user?.wishlist.includes(tour.id) || false;
  const relatedTours = state.tours
    .filter(t => t.id !== tour.id && (t.type === tour.type || t.region === tour.region))
    .slice(0, 3);

  const handleWishlistToggle = () => {
    if (!state.user) {
      toast.error(state.language === 'en' 
        ? 'Please login to add tours to wishlist' 
        : 'Veuillez vous connecter pour ajouter des circuits à votre liste de souhaits'
      );
      return;
    }

    if (isWishlisted) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: tour.id });
      toast.success(state.language === 'en' 
        ? 'Removed from wishlist' 
        : 'Retiré de la liste de souhaits'
      );
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: tour.id });
      toast.success(state.language === 'en' 
        ? 'Added to wishlist' 
        : 'Ajouté à la liste de souhaits'
      );
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'bg-secondary-100 text-secondary-800';
      case 'wildlife': return 'bg-primary-100 text-primary-800';
      case 'adventure': return 'bg-red-100 text-red-800';
      case 'eco-tourism': return 'bg-accent-100 text-accent-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Image Gallery */}
      <div className="relative h-96 md:h-[500px] bg-gray-900">
        <img
          src={tour.images[currentImageIndex]}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Navigation Arrows */}
        {tour.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {tour.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            {/* Tour Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(tour.type)}`}>
                      {t(tour.type, state.language)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tour.difficulty)}`}>
                      {tour.difficulty}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{tour.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{tour.region}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{tour.rating}</span>
                      <span>({tour.reviewsCount} {t('reviews', state.language)})</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleWishlistToggle}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'} hover:text-red-500 transition-colors`} 
                    />
                  </button>
                  <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-800">{tour.duration}</div>
                  <div className="text-xs text-gray-600">{t('duration', state.language)}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 text-accent-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-800">{tour.maxGroupSize}</div>
                  <div className="text-xs text-gray-600">Max Group</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-secondary-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-800">{tour.availableDates.length}</div>
                  <div className="text-xs text-gray-600">Available Dates</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-800">{tour.rating}</div>
                  <div className="text-xs text-gray-600">{t('rating', state.language)}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {state.language === 'en' ? 'About This Tour' : 'À Propos de ce Circuit'}
                </h3>
                <p className="text-gray-700 leading-relaxed">{tour.longDescription}</p>
              </div>

              {/* Diversity Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {state.language === 'en' ? 'Experience Highlights' : 'Points Forts de l\'Expérience'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tour.diversityTags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Included/Excluded */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {state.language === 'en' ? 'What\'s Included' : 'Ce qui est Inclus'}
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-2" />
                    {state.language === 'en' ? 'What\'s Excluded' : 'Ce qui n\'est pas Inclus'}
                  </h3>
                  <ul className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Itinerary */}
            {tour.itinerary.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {state.language === 'en' ? 'Itinerary' : 'Itinéraire'}
                </h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-6 pb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{day.title}</h3>
                      </div>
                      <p className="text-gray-700 mb-3">{day.description}</p>
                      <ul className="space-y-1">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-primary-300 rounded-full mr-3"></div>
                            <span className="text-sm">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t('reviews', state.language)} ({tour.reviewsCount})
              </h2>
              <div className="space-y-6">
                {/* Mock Reviews */}
                {[
                  {
                    name: 'Sarah Johnson',
                    rating: 5,
                    comment: state.language === 'en' 
                      ? 'Incredible experience! The cultural immersion was authentic and our guide was knowledgeable.'
                      : 'Expérience incroyable! L\'immersion culturelle était authentique et notre guide était compétent.',
                    date: '2024-12-15'
                  },
                  {
                    name: 'Pierre Dubois',
                    rating: 5,
                    comment: state.language === 'en'
                      ? 'Perfect organization and beautiful landscapes. Highly recommended!'
                      : 'Organisation parfaite et beaux paysages. Hautement recommandé!',
                    date: '2024-11-28'
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-800">{review.name}</h4>
                          <div className="flex">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800">${tour.price}</div>
                <div className="text-sm text-gray-600">
                  {state.language === 'en' ? 'per person' : 'par personne'}
                </div>
              </div>

              <Link
                to={`/book/${tour.id}`}
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium text-center block mb-4"
              >
                {t('bookNow', state.language)}
              </Link>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('duration', state.language)}:</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Max Group:</span>
                  <span className="font-medium">{tour.maxGroupSize} people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t('difficulty', state.language)}:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(tour.difficulty)}`}>
                    {tour.difficulty}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-800 mb-3">
                  {state.language === 'en' ? 'Available Dates' : 'Dates Disponibles'}
                </h4>
                <div className="space-y-2">
                  {tour.availableDates.slice(0, 3).map((date, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{new Date(date).toLocaleDateString()}</span>
                      <span className="text-green-600 font-medium">Available</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              {state.language === 'en' ? 'Related Tours' : 'Circuits Similaires'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTours.map((relatedTour) => (
                <TourCard key={relatedTour.id} tour={relatedTour} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDetailsPage;