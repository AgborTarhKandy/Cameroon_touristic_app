import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Tour } from '../../types';
import { t } from '../../utils/translations';
import { Star, Clock, Users, Heart, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { state, dispatch } = useApp();
  const isWishlisted = state.user?.wishlist.includes(tour.id) || false;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <Link to={`/tours/${tour.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
          >
            <Heart 
              className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'} hover:text-red-500 transition-colors`} 
            />
          </button>
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(tour.type)}`}>
              {t(tour.type, state.language)}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{tour.region}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-500 transition-colors">
            {tour.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {tour.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tour.diversityTags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{tour.maxGroupSize}</span>
              </div>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tour.difficulty)}`}>
              {tour.difficulty}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{tour.rating}</span>
              <span className="text-sm text-gray-500">({tour.reviewsCount})</span>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">${tour.price}</div>
              <div className="text-sm text-gray-500">{state.language === 'en' ? 'per person' : 'par personne'}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;