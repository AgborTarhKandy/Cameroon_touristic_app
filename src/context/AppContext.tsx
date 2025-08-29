import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Tour, Booking } from '../types';
import { mockTours } from '../data/mockData';

interface AppState {
  user: User | null;
  tours: Tour[];
  bookings: Booking[];
  language: 'en' | 'fr';
  isLoading: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_TOURS'; payload: Tour[] }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'SET_BOOKINGS'; payload: Booking[] }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'fr' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

const initialState: AppState = {
  user: null,
  tours: mockTours,
  bookings: [],
  language: 'en',
  isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOURS':
      return { ...state, tours: action.payload };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_TO_WISHLIST':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            wishlist: [...state.user.wishlist, action.payload]
          }
        };
      }
      return state;
    case 'REMOVE_FROM_WISHLIST':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            wishlist: state.user.wishlist.filter(id => id !== action.payload)
          }
        };
      }
      return state;
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedLanguage = localStorage.getItem('language') as 'en' | 'fr';
    
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
    if (savedLanguage) {
      dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage });
    }
  }, []);

  // Save user data to localStorage when user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', state.language);
  }, [state.language]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};