import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../utils/translations';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error(state.language === 'en' 
        ? 'Passwords do not match' 
        : 'Les mots de passe ne correspondent pas'
      );
      return;
    }

    // Simulate authentication
    const user = {
      id: Date.now().toString(),
      email: formData.email,
      name: isLogin ? 'Demo User' : formData.name,
      phone: isLogin ? '+237 690 123 456' : formData.phone,
      preferences: {
        language: state.language,
        interests: ['cultural', 'wildlife']
      },
      bookings: [],
      wishlist: []
    };

    dispatch({ type: 'SET_USER', payload: user });
    
    toast.success(isLogin 
      ? (state.language === 'en' ? 'Welcome back!' : 'Bienvenue!')
      : (state.language === 'en' ? 'Account created successfully!' : 'Compte créé avec succès!')
    );

    navigate(from);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">CM</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isLogin 
              ? (state.language === 'en' ? 'Welcome back' : 'Bienvenue')
              : (state.language === 'en' ? 'Create account' : 'Créer un compte')
            }
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin 
              ? (state.language === 'en' ? 'Sign in to your account' : 'Connectez-vous à votre compte')
              : (state.language === 'en' ? 'Join us in exploring Cameroon' : 'Rejoignez-nous pour explorer le Cameroun')
            }
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {state.language === 'en' ? 'Full Name' : 'Nom Complet'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={state.language === 'en' ? 'Enter your full name' : 'Entrez votre nom complet'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {state.language === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+237 690 123 456"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={state.language === 'en' ? 'Enter your email' : 'Entrez votre email'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {state.language === 'en' ? 'Password' : 'Mot de Passe'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={state.language === 'en' ? 'Enter your password' : 'Entrez votre mot de passe'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {state.language === 'en' ? 'Confirm Password' : 'Confirmer le Mot de Passe'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={state.language === 'en' ? 'Confirm your password' : 'Confirmez votre mot de passe'}
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            {isLogin 
              ? t('login', state.language)
              : t('register', state.language)
            }
          </button>
        </form>

        {/* Toggle Form */}
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            {isLogin 
              ? (state.language === 'en' 
                  ? 'Don\'t have an account? Sign up'
                  : 'Pas de compte? S\'inscrire'
                )
              : (state.language === 'en' 
                  ? 'Already have an account? Sign in'
                  : 'Déjà un compte? Se connecter'
                )
            }
          </button>
        </div>

        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>{state.language === 'en' ? 'Demo Mode:' : 'Mode Démo:'}</strong>{' '}
            {state.language === 'en' 
              ? 'Use any email and password to sign in. This is a demonstration system.'
              : 'Utilisez n\'importe quel email et mot de passe pour vous connecter. Ceci est un système de démonstration.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;