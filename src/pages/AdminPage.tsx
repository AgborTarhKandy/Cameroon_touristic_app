import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, Calendar, TrendingUp, Settings, 
  Plus, Edit, Trash2, Eye, DollarSign 
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Simple admin authentication
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Invalid admin password');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Login as Admin
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Demo password: admin123
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'tours', label: 'Manage Tours', icon: Calendar },
    { id: 'bookings', label: 'Bookings', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Tours</p>
                    <p className="text-2xl font-bold text-gray-800">{state.tours.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-800">{state.bookings.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-accent-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">$24,580</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-secondary-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-800">4.7</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">New booking for Bamileke Cultural Tour</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">5-star review received for Mount Cameroon Adventure</span>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">New tour added: Kribi Beach Retreat</span>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tours':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Manage Tours</h2>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New Tour</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {state.tours.map((tour) => (
                      <tr key={tour.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={tour.images[0]}
                              alt={tour.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                              <div className="text-sm text-gray-500">{tour.region}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {tour.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${tour.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {tour.rating} ⭐ ({tour.reviewsCount})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-accent-600 hover:text-accent-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {state.bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Customer #{booking.userId}</div>
                          <div className="text-sm text-gray-500">{booking.numberOfPeople} people</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.tour.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(booking.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${booking.totalPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Tour Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cultural Tours</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-secondary-500 h-2 rounded-full w-3/4"></div>
                      </div>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Wildlife Tours</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full w-2/3"></div>
                      </div>
                      <span className="text-sm text-gray-600">67%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Adventure Tours</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-accent-500 h-2 rounded-full w-1/2"></div>
                      </div>
                      <span className="text-sm text-gray-600">50%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2">$24,580</div>
                  <div className="text-sm text-green-600">↑ 12% from last month</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Regional Popularity</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Northern', 'Eastern', 'Western', 'Southwest', 'Littoral', 'Center'].map((region) => (
                  <div key={region} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-800">{region}</div>
                    <div className="text-sm text-gray-600">{Math.floor(Math.random() * 50 + 25)} bookings</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => setIsAdminAuthenticated(false)}
            className="text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>

        <div className="lg:flex lg:space-x-8">
          {/* Sidebar */}
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

export default AdminPage;