import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/translations';
import { Search, Filter, Grid, List, MapPin } from 'lucide-react';
import TourCard from '../components/Tours/TourCard';
import { useSearchParams } from 'react-router-dom';

const ToursPage: React.FC = () => {
  const { state } = useApp();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const regions = ['Northern', 'Eastern', 'Western', 'Southwest', 'Littoral', 'Center'];
  const types = ['cultural', 'wildlife', 'adventure', 'eco-tourism'];
  const difficulties = ['Easy', 'Moderate', 'Challenging'];

  const filteredTours = useMemo(() => {
    let filtered = state.tours;

    if (searchQuery) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.diversityTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(tour => tour.region === selectedRegion);
    }

    if (selectedType) {
      filtered = filtered.filter(tour => tour.type === selectedType);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(tour => tour.difficulty === selectedDifficulty);
    }

    filtered = filtered.filter(tour => tour.price >= priceRange[0] && tour.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      default: // popularity
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return filtered;
  }, [state.tours, searchQuery, selectedRegion, selectedType, selectedDifficulty, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('');
    setSelectedType('');
    setSelectedDifficulty('');
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('tours', state.language)}
          </h1>
          <p className="text-lg text-gray-600">
            {state.language === 'en' 
              ? 'Discover authentic experiences across Cameroon\'s diverse regions'
              : 'Découvrez des expériences authentiques à travers les diverses régions du Cameroun'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:space-x-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  {state.language === 'en' ? 'Clear All' : 'Tout Effacer'}
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {state.language === 'en' ? 'Search' : 'Recherche'}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder', state.language)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Region Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {state.language === 'en' ? 'Region' : 'Région'}
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{state.language === 'en' ? 'All Regions' : 'Toutes les Régions'}</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {state.language === 'en' ? 'Tour Type' : 'Type de Circuit'}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{state.language === 'en' ? 'All Types' : 'Tous les Types'}</option>
                  {types.map(type => (
                    <option key={type} value={type}>{t(type, state.language)}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('difficulty', state.language)}
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{state.language === 'en' ? 'All Levels' : 'Tous Niveaux'}</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('price', state.language)} Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                {filteredTours.length} {state.language === 'en' ? 'tours found' : 'circuits trouvés'}
              </p>
              
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-primary-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white text-primary-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                >
                  <option value="popularity">{state.language === 'en' ? 'Popularity' : 'Popularité'}</option>
                  <option value="price-low">{state.language === 'en' ? 'Price: Low to High' : 'Prix: Bas à Élevé'}</option>
                  <option value="price-high">{state.language === 'en' ? 'Price: High to Low' : 'Prix: Élevé à Bas'}</option>
                  <option value="rating">{state.language === 'en' ? 'Highest Rated' : 'Mieux Noté'}</option>
                  <option value="duration">{state.language === 'en' ? 'Duration' : 'Durée'}</option>
                </select>
              </div>
            </div>

            {/* Tours Grid/List */}
            {filteredTours.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {state.language === 'en' ? 'No tours found' : 'Aucun circuit trouvé'}
                </h3>
                <p className="text-gray-500">
                  {state.language === 'en' 
                    ? 'Try adjusting your filters or search terms'
                    : 'Essayez d\'ajuster vos filtres ou termes de recherche'
                  }
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-colors"
                >
                  {state.language === 'en' ? 'Clear Filters' : 'Effacer les Filtres'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;