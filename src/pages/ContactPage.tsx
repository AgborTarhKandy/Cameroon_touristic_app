import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/translations';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const { state } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(state.language === 'en' 
      ? 'Thank you for your message! We\'ll get back to you soon.'
      : 'Merci pour votre message! Nous vous répondrons bientôt.'
    );
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const faqItems = [
    {
      question: state.language === 'en' 
        ? 'How do you ensure cultural sensitivity in your tours?'
        : 'Comment assurez-vous la sensibilité culturelle dans vos circuits?',
      answer: state.language === 'en'
        ? 'We work closely with local communities and cultural leaders to ensure our tours respect traditions and provide authentic experiences that benefit local people.'
        : 'Nous travaillons étroitement avec les communautés locales et les leaders culturels pour nous assurer que nos circuits respectent les traditions et offrent des expériences authentiques qui bénéficient aux populations locales.'
    },
    {
      question: state.language === 'en'
        ? 'What safety measures do you have in place?'
        : 'Quelles mesures de sécurité avez-vous en place?',
      answer: state.language === 'en'
        ? 'All our guides are certified professionals with first aid training. We maintain comprehensive insurance coverage and follow strict safety protocols for all activities.'
        : 'Tous nos guides sont des professionnels certifiés avec une formation de premiers secours. Nous maintenons une couverture d\'assurance complète et suivons des protocoles de sécurité stricts pour toutes les activités.'
    },
    {
      question: state.language === 'en'
        ? 'Can tours be customized for special interests?'
        : 'Les circuits peuvent-ils être personnalisés pour des intérêts spéciaux?',
      answer: state.language === 'en'
        ? 'Absolutely! We specialize in creating custom itineraries that highlight specific aspects of Cameroon\'s diversity based on your interests.'
        : 'Absolument! Nous nous spécialisons dans la création d\'itinéraires sur mesure qui mettent en valeur des aspects spécifiques de la diversité du Cameroun selon vos intérêts.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('contact', state.language)}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {state.language === 'en' 
                ? 'Get in touch with our team to plan your perfect Cameroon adventure'
                : 'Contactez notre équipe pour planifier votre parfaite aventure au Cameroun'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:space-x-12">
          {/* Contact Form */}
          <div className="lg:w-2/3 mb-12 lg:mb-0">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-8 h-8 text-primary-500" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {state.language === 'en' ? 'Send us a message' : 'Envoyez-nous un message'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {state.language === 'en' ? 'Full Name' : 'Nom Complet'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {state.language === 'en' ? 'Subject' : 'Sujet'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">{state.language === 'en' ? 'Select a subject' : 'Sélectionnez un sujet'}</option>
                    <option value="general">{state.language === 'en' ? 'General Inquiry' : 'Demande Générale'}</option>
                    <option value="booking">{state.language === 'en' ? 'Booking Support' : 'Support de Réservation'}</option>
                    <option value="custom">{state.language === 'en' ? 'Custom Tour Request' : 'Demande de Circuit Personnalisé'}</option>
                    <option value="partnership">{state.language === 'en' ? 'Partnership Opportunity' : 'Opportunité de Partenariat'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {state.language === 'en' ? 'Message' : 'Message'}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder={state.language === 'en' 
                      ? 'Tell us about your dream Cameroon adventure...'
                      : 'Parlez-nous de votre aventure de rêve au Cameroun...'
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{state.language === 'en' ? 'Send Message' : 'Envoyer le Message'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:w-1/3 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {state.language === 'en' ? 'Get in Touch' : 'Contactez-nous'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {state.language === 'en' ? 'Office Address' : 'Adresse du Bureau'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      123 Avenue Kennedy<br />
                      Yaoundé, Cameroon
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-accent-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {state.language === 'en' ? 'Phone' : 'Téléphone'}
                    </h4>
                    <p className="text-gray-600 text-sm">+237 690 123 456</p>
                    <p className="text-gray-600 text-sm">+237 677 987 654</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-secondary-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600 text-sm">info@cameroontours.cm</p>
                    <p className="text-gray-600 text-sm">bookings@cameroontours.cm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {state.language === 'en' ? 'Business Hours' : 'Heures d\'Ouverture'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {state.language === 'en' ? 'Mon - Fri: 8:00 AM - 6:00 PM' : 'Lun - Ven: 8h00 - 18h00'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {state.language === 'en' ? 'Sat: 9:00 AM - 4:00 PM' : 'Sam: 9h00 - 16h00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {state.language === 'en' ? 'Find Us' : 'Nous Trouver'}
              </h3>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Interactive Map</p>
                  <p className="text-xs">Yaoundé, Cameroon</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">
                {state.language === 'en' ? 'Emergency Contact' : 'Contact d\'Urgence'}
              </h3>
              <p className="text-red-700 text-sm mb-3">
                {state.language === 'en' 
                  ? 'For travelers currently on tour who need immediate assistance:'
                  : 'Pour les voyageurs actuellement en circuit qui ont besoin d\'aide immédiate:'
                }
              </p>
              <div className="flex items-center space-x-2 text-red-800 font-medium">
                <Phone className="w-4 h-4" />
                <span>+237 690 911 911</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {state.language === 'en' ? 'Frequently Asked Questions' : 'Questions Fréquemment Posées'}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;