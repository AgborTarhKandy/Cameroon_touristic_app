import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/translations';
import { 
  User, Heart, Calendar, MapPin, Clock, Star, 
  Phone, Mail, Edit3, Settings, CreditCard 
} from 'lucide-react';
import TourCard from '../components/Tours/TourCard';
import { format } from 'date-fns';

const DashboardPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: state.user?.name || '',
    phone: state.user?.phone || '',
    interests: state.user?.preferences.interests || []
  });

  if (!state.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please login to access your dashboard</p>
        </div>
      </div>
    );
  }

  const wishlistedTours = state.tours.filter(tour => state.user?.wishlist.includes(tour.id));
  const upcomingBookings = state.bookings.filter(booking => 
    booking.userId === state.user?.id && 
    new Date(booking.startDate) > new Date() &&
    booking.status === 'confirmed'
  );
  const pastBookings = state.bookings.filter(booking => 
    booking.userId === state.user?.id && 
    new Date(booking.startDate) <= new Date()
  );

  const handleSaveProfile = () => {
    const updatedUser = {
      ...state.user!,
      name: editData.name,
      phone: editData.phone,
      preferences: {
        ...state.user!.preferences,
        interests: editData.interests
      }
    };
    dispatch({ type: 'SET_USER', payload: updatedUser });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'overview', label: state.language === 'en' ? 'Overview' : 'Aperçu', icon: User },
    { id: 'bookings', label: state.language === 'en' ? 'My Bookings' : 'Mes Réservations', icon: Calendar },
    { id: 'wishlist', label: state.language === 'en' ? 'Wishlist' : 'Liste de Souhaits', icon: Heart },
    { id: 'profile', label: state.language === 'en' ? 'Profile' : 'Profil', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-2">
                {state.language === 'en' ? 'Welcome back' : 'Bienvenue'}, {state.user.name}!
              </h2>
              <p className="opacity-90">
                {state.language === 'en' 
                  ? 'Ready for your next adventure in Cameroon?'
                  : 'Prêt pour votre prochaine aventure au Cameroun?'
                }
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Calendar className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800">{upcomingBookings.length}</div>
                <div className="text-sm text-gray-600">
                  {state.language === 'en' ? 'Upcoming Tours' : 'Circuits à Venir'}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800">{wishlistedTours.length}</div>
                <div className="text-sm text-gray-600">
                  {state.language === 'en' ? 'Saved Tours' : 'Circuits Sauvegardés'}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800">{pastBookings.length}</div>
                <div className="text-sm text-gray-600">
                  {state.language === 'en' ? 'Completed Tours' : 'Circuits Terminés'}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {state.language === 'en' ? 'Recent Activity' : 'Activité Récente'}
              </h3>
              <div className="space-y-3">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={booking.tour.images[0]}
                        alt={booking.tour.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{booking.tour.title}</h4>
                        <p className="text-sm text-gray-600">
                          {format(new Date(booking.startDate), 'MMM dd, yyyy')} • {booking.numberOfPeople} people
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">${booking.totalPrice}</div>
                        <div className="text-xs text-green-600">{booking.status}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    {state.language === 'en' 
                      ? 'No recent bookings. Start exploring tours!'
                      : 'Aucune réservation récente. Commencez à explorer les circuits!'
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {state.language === 'en' ? 'My Bookings' : 'Mes Réservations'}
            </h2>

            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {state.language === 'en' ? 'Upcoming Tours' : 'Circuits à Venir'}
                </h3>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={booking.tour.images[0]}
                          alt={booking.tour.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">{booking.tour.title}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{format(new Date(booking.startDate), 'MMM dd, yyyy')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>{booking.numberOfPeople} people</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4" />
                              <span>${booking.totalPrice}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {state.language === 'en' ? 'Past Tours' : 'Circuits Passés'}
                </h3>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 opacity-75">
                      <div className="flex items-start space-x-4">
                        <img
                          src={booking.tour.images[0]}
                          alt={booking.tour.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">{booking.tour.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{format(new Date(booking.startDate), 'MMM dd, yyyy')}</span>
                            <span>{booking.numberOfPeople} people</span>
                            <span>${booking.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {upcomingBookings.length === 0 && pastBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {state.language === 'en' ? 'No bookings yet' : 'Aucune réservation pour l\'instant'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {state.language === 'en' 
                    ? 'Start exploring our amazing tours in Cameroon'
                    : 'Commencez à explorer nos circuits incroyables au Cameroun'
                  }
                </p>
                <button 
                  onClick={() => window.location.href = '/tours'}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {state.language === 'en' ? 'Browse Tours' : 'Parcourir les Circuits'}
                </button>
              </div>
            )}
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {state.language === 'en' ? 'My Wishlist' : 'Ma Liste de Souhaits'}
            </h2>

            {wishlistedTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {state.language === 'en' ? 'No saved tours' : 'Aucun circuit sauvegardé'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {state.language === 'en' 
                    ? 'Save tours to your wishlist to book them later'
                    : 'Sauvegardez des circuits dans votre liste de souhaits pour les réserver plus tard'
                  }
                </p>
              </div>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {state.language === 'en' ? 'Profile Settings' : 'Paramètres du Profil'}
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 text-primary-500 hover:text-primary-600"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {state.language === 'en' ? 'Full Name' : 'Nom Complet'}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{state.user.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{state.user.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {state.language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>{state.user.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {state.language === 'en' ? 'Language Preference' : 'Préférence de Langue'}
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span>{state.user.preferences.language === 'en' ? 'English' : 'Français'}</span>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      {state.language === 'en' ? 'Save Changes' : 'Sauvegarder'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      {state.language === 'en' ? 'Cancel' : 'Annuler'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:space-x-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                      activeTab === tab.id ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-500' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;