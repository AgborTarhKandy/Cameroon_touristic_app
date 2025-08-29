import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../utils/translations';
import { Calendar, Users, MapPin, Clock, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedDate: '',
    numberOfPeople: 1,
    specialRequests: '',
    travelerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      emergencyContact: '',
    }
  });

  const tour = state.tours.find(t => t.id === id);
  
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tour Not Found</h2>
          <button onClick={() => navigate('/tours')} className="text-primary-500 hover:text-primary-600">
            ← Back to Tours
          </button>
        </div>
      </div>
    );
  }

  if (!state.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to continue with your booking</p>
          <button 
            onClick={() => navigate('/auth')}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Login / Register
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = tour.price * formData.numberOfPeople;
  const steps = [
    { number: 1, title: state.language === 'en' ? 'Tour Details' : 'Détails du Circuit' },
    { number: 2, title: state.language === 'en' ? 'Traveler Info' : 'Info Voyageur' },
    { number: 3, title: state.language === 'en' ? 'Payment' : 'Paiement' },
    { number: 4, title: state.language === 'en' ? 'Confirmation' : 'Confirmation' },
  ];

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('travelerInfo.')) {
      const infoField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        travelerInfo: {
          ...prev.travelerInfo,
          [infoField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePayment = async () => {
    // Simulate payment processing
    toast.loading('Processing payment...', { duration: 2000 });
    
    setTimeout(() => {
      const booking = {
        id: Date.now().toString(),
        userId: state.user!.id,
        tourId: tour.id,
        tour,
        startDate: formData.selectedDate,
        numberOfPeople: formData.numberOfPeople,
        totalPrice,
        status: 'confirmed' as const,
        specialRequests: formData.specialRequests,
        createdAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_BOOKING', payload: booking });
      toast.success('Payment successful!');
      navigate(`/confirmation/${booking.id}`);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('selectDate', state.language)}
              </label>
              <select
                value={formData.selectedDate}
                onChange={(e) => handleInputChange('selectedDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">{state.language === 'en' ? 'Choose a date' : 'Choisir une date'}</option>
                {tour.availableDates.map((date, index) => (
                  <option key={index} value={date}>
                    {new Date(date).toLocaleDateString(state.language === 'en' ? 'en-US' : 'fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('numberOfPeople', state.language)}
              </label>
              <select
                value={formData.numberOfPeople}
                onChange={(e) => handleInputChange('numberOfPeople', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Array.from({ length: tour.maxGroupSize }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('specialRequests', state.language)}
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder={state.language === 'en' 
                  ? 'Any special requests or dietary requirements...' 
                  : 'Demandes spéciales ou exigences alimentaires...'
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {state.language === 'en' ? 'First Name' : 'Prénom'}
                </label>
                <input
                  type="text"
                  value={formData.travelerInfo.firstName}
                  onChange={(e) => handleInputChange('travelerInfo.firstName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {state.language === 'en' ? 'Last Name' : 'Nom'}
                </label>
                <input
                  type="text"
                  value={formData.travelerInfo.lastName}
                  onChange={(e) => handleInputChange('travelerInfo.lastName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.travelerInfo.email}
                onChange={(e) => handleInputChange('travelerInfo.email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {state.language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}
              </label>
              <input
                type="tel"
                value={formData.travelerInfo.phone}
                onChange={(e) => handleInputChange('travelerInfo.phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {state.language === 'en' ? 'Emergency Contact' : 'Contact d\'Urgence'}
              </label>
              <input
                type="text"
                value={formData.travelerInfo.emergencyContact}
                onChange={(e) => handleInputChange('travelerInfo.emergencyContact', e.target.value)}
                placeholder={state.language === 'en' 
                  ? 'Name and phone number' 
                  : 'Nom et numéro de téléphone'
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {state.language === 'en' ? 'Payment Summary' : 'Résumé du Paiement'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{tour.title}</span>
                  <span>${tour.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>{formData.numberOfPeople} x {state.language === 'en' ? 'people' : 'personnes'}</span>
                  <span>${tour.price * formData.numberOfPeople}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>{t('totalPrice', state.language)}:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>{state.language === 'en' ? 'Note:' : 'Note:'}</strong>{' '}
                {state.language === 'en' 
                  ? 'This is a demo payment system. No actual charges will be made.'
                  : 'Ceci est un système de paiement de démonstration. Aucun frais réel ne sera prélevé.'
                }
              </p>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              {state.language === 'en' ? 'Complete Payment' : 'Finaliser le Paiement'} (${totalPrice})
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedDate && formData.numberOfPeople > 0;
      case 2:
        return formData.travelerInfo.firstName && 
               formData.travelerInfo.lastName && 
               formData.travelerInfo.email && 
               formData.travelerInfo.phone;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className={`flex items-center ${index > 0 ? 'ml-4' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.number 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.number}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary-500' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className={`w-5 h-5 mx-2 ${
                    currentStep > step.number ? 'text-primary-500' : 'text-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="lg:flex lg:space-x-8">
          {/* Main Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {t('bookingTitle', state.language)}
              </h1>

              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    currentStep === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{state.language === 'en' ? 'Previous' : 'Précédent'}</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!canProceed()}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                      canProceed()
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <span>{state.language === 'en' ? 'Next' : 'Suivant'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {state.language === 'en' ? 'Booking Summary' : 'Résumé de Réservation'}
              </h2>

              {/* Tour Info */}
              <div className="mb-6">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-gray-800 mb-2">{tour.title}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{tour.rating} ({tour.reviewsCount} {t('reviews', state.language)})</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3 mb-6">
                {formData.selectedDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{state.language === 'en' ? 'Date:' : 'Date:'}</span>
                    <span className="font-medium">
                      {new Date(formData.selectedDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{state.language === 'en' ? 'Travelers:' : 'Voyageurs:'}</span>
                  <span className="font-medium">{formData.numberOfPeople}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('price', state.language)} ({state.language === 'en' ? 'per person' : 'par personne'}):</span>
                  <span>${tour.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('numberOfPeople', state.language)}:</span>
                  <span>{formData.numberOfPeople}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-2">
                  <span>{t('totalPrice', state.language)}:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              {/* Diversity Fact */}
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold text-primary-800 mb-2">
                  {state.language === 'en' ? 'Did you know?' : 'Le saviez-vous?'}
                </h4>
                <p className="text-sm text-primary-700">
                  {state.language === 'en' 
                    ? `Cameroon has over 250 ethnic groups, making it one of Africa's most culturally diverse countries!`
                    : `Le Cameroun compte plus de 250 groupes ethniques, ce qui en fait l'un des pays les plus diversifiés culturellement d'Afrique!`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;