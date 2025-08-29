import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailsPage from './pages/TourDetailsPage';
import BookingPage from './pages/BookingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/tours/:id" element={<TourDetailsPage />} />
              <Route path="/book/:id" element={<BookingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/confirmation/:bookingId" element={<PaymentConfirmationPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;