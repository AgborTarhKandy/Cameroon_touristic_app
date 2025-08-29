import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';
import { Menu, X, User, Globe, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: state.language === 'en' ? 'fr' : 'en' });
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">CM</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-800">Cameroon Tours</h1>
              <p className="text-xs text-gray-600">{t('heroSubtitle', state.language)}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-primary-500 transition-colors ${isActive('/') ? 'text-primary-500 font-medium' : ''}`}
            >
              {t('home', state.language)}
            </Link>
            <Link 
              to="/tours" 
              className={`text-gray-700 hover:text-primary-500 transition-colors ${isActive('/tours') ? 'text-primary-500 font-medium' : ''}`}
            >
              {t('tours', state.language)}
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-700 hover:text-primary-500 transition-colors ${isActive('/about') ? 'text-primary-500 font-medium' : ''}`}
            >
              {t('about', state.language)}
            </Link>
            <Link 
              to="/blog" 
              className={`text-gray-700 hover:text-primary-500 transition-colors ${isActive('/blog') ? 'text-primary-500 font-medium' : ''}`}
            >
              {t('blog', state.language)}
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-700 hover:text-primary-500 transition-colors ${isActive('/contact') ? 'text-primary-500 font-medium' : ''}`}
            >
              {t('contact', state.language)}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{state.language.toUpperCase()}</span>
            </button>

            {state.user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-primary-500">
                  <User className="w-4 h-4" />
                  <span>{state.user.name}</span>
                </Link>
                <Link to="/dashboard" className="relative">
                  <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
                  {state.user.wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {state.user.wishlist.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-500 transition-colors"
                >
                  {t('logout', state.language)}
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
              >
                {t('login', state.language)}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home', state.language)}
              </Link>
              <Link 
                to="/tours" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('tours', state.language)}
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about', state.language)}
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('blog', state.language)}
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-primary-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact', state.language)}
              </Link>
              
              <div className="pt-4 border-t space-y-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <Globe className="w-4 h-4" />
                  <span>{state.language.toUpperCase()}</span>
                </button>
                
                {state.user ? (
                  <div className="space-y-2">
                    <Link 
                      to="/dashboard" 
                      className="block text-gray-700 hover:text-primary-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('dashboard', state.language)}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block text-gray-700 hover:text-red-500"
                    >
                      {t('logout', state.language)}
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="block bg-primary-500 text-white px-4 py-2 rounded-md text-center hover:bg-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('login', state.language)}
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;