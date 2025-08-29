import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer: React.FC = () => {
  const { state } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(state.language === 'en' 
        ? 'Thank you for subscribing to our newsletter!' 
        : 'Merci de vous être abonné à notre newsletter!'
      );
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">CM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Cameroon Tours</h3>
                <p className="text-sm text-gray-300">{t('heroSubtitle', state.language)}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              {t('aboutCompany', state.language)}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/tours" className="text-gray-300 hover:text-white transition-colors">{t('tours', state.language)}</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">{t('about', state.language)}</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">{t('blog', state.language)}</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">{t('contact', state.language)}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">+237 690 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">info@cameroontours.cm</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">Yaoundé, Cameroon</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('newsletter', state.language)}</h4>
            <p className="text-gray-300 text-sm mb-4">
              {t('newsletterText', state.language)}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-colors"
              >
                {t('subscribe', state.language)}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Cameroon Tours. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;