import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CheckCircle, Download, Calendar, Users, MapPin, Mail, Phone } from 'lucide-react';

const PaymentConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { state } = useApp();
  
  const booking = state.bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Not Found</h2>
          <Link to="/dashboard" className="text-primary-500 hover:text-primary-600">
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const relatedTours = state.tours
    .filter(t => t.id !== booking.tour.id && t.type === booking.tour.type)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {state.language === 'en' ? 'Booking Confirmed!' : 'Réservation Confirmée!'}
          </h1>
          <p className="text-lg text-gray-600">
            {state.language === 'en' 
              ? 'Your adventure in Cameroon awaits! We\'ve sent confirmation details to your email.'
              : 'Votre aventure au Cameroun vous attend! Nous avons envoyé les détails de confirmation à votre email.'
            }
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {state.language === 'en' ? 'Booking Details' : 'Détails de la Réservation'}
            </h2>
            <button className="flex items-center space-x-2 text-primary-500 hover:text-primary-600">
              <Download className="w-4 h-4" />
              <span>{state.language === 'en' ? 'Download PDF' : 'Télécharger PDF'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tour Information */}
            <div>
              <img
                src={booking.tour.images[0]}
                alt={booking.tour.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{booking.tour.title}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.tour.region}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{booking.numberOfPeople} people</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {state.language === 'en' ? 'Payment Summary' : 'Résumé du Paiement'}
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Tour Price</span>
                  <span>${booking.tour.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Number of People</span>
                  <span>{booking.numberOfPeople}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total Paid</span>
                  <span className="text-green-600">${booking.totalPrice}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {state.language === 'en' ? 'Booking Reference' : 'Référence de Réservation'}
                </h4>
                <p className="text-blue-700 font-mono text-lg">{booking.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {state.language === 'en' ? 'What\'s Next?' : 'Et Maintenant?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {state.language === 'en' ? 'Check Your Email' : 'Vérifiez Votre Email'}
              </h3>
              <p className="text-sm text-gray-600">
                {state.language === 'en' 
                  ? 'Detailed confirmation and travel documents sent'
                  : 'Confirmation détaillée et documents de voyage envoyés'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-accent-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {state.language === 'en' ? 'Contact Our Team' : 'Contactez Notre Équipe'}
              </h3>
              <p className="text-sm text-gray-600">
                {state.language === 'en' 
                  ? 'Questions? Our team is ready to help'
                  : 'Des questions? Notre équipe est prête à vous aider'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-secondary-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {state.language === 'en' ? 'Pre-Tour Briefing' : 'Briefing Pré-Circuit'}
              </h3>
              <p className="text-sm text-gray-600">
                {state.language === 'en' 
                  ? 'We\'ll contact you 48 hours before departure'
                  : 'Nous vous contacterons 48 heures avant le départ'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Upsell Related Tours */}
        {relatedTours.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {state.language === 'en' 
                ? 'Explore More of Cameroon\'s Diversity' 
                : 'Explorez Plus de la Diversité du Cameroun'
              }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={tour.images[0]}
                    alt={tour.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{tour.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{tour.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">${tour.price}</span>
                      <Link
                        to={`/tours/${tour.id}`}
                        className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                      >
                        {state.language === 'en' ? 'Learn More' : 'En Savoir Plus'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <Link
            to="/dashboard"
            className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            {state.language === 'en' ? 'View My Dashboard' : 'Voir Mon Tableau de Bord'}
          </Link>
          <Link
            to="/tours"
            className="inline-block bg-white text-primary-500 border-2 border-primary-500 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium"
          >
            {state.language === 'en' ? 'Book Another Tour' : 'Réserver un Autre Circuit'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;