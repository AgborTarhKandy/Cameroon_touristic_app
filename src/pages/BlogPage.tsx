import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const { state } = useApp();

  const blogPosts = [
    {
      id: '1',
      title: state.language === 'en' 
        ? 'Top 10 Hidden Gems in Cameroon\'s Rainforests'
        : 'Top 10 des Joyaux Cachés des Forêts du Cameroun',
      excerpt: state.language === 'en'
        ? 'Discover secret waterfalls, ancient trees, and rare wildlife in Cameroon\'s pristine rainforests...'
        : 'Découvrez des cascades secrètes, des arbres anciens et une faune rare dans les forêts tropicales pristines du Cameroun...',
      image: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
      author: 'Jean-Paul Mbarga',
      date: '2025-01-15',
      category: 'Wildlife',
      readTime: '8 min'
    },
    {
      id: '2',
      title: state.language === 'en'
        ? 'Cultural Festivals Across Cameroon\'s Regions'
        : 'Festivals Culturels à Travers les Régions du Cameroun',
      excerpt: state.language === 'en'
        ? 'From Ngondo water ceremonies to Fulani cattle festivals, explore the rich tapestry of Cameroonian celebrations...'
        : 'Des cérémonies d\'eau Ngondo aux festivals de bétail peuls, explorez la riche tapisserie des célébrations camerounaises...',
      image: 'https://images.pexels.com/photos/6249959/pexels-photo-6249959.jpeg',
      author: 'Amina Njoya',
      date: '2025-01-10',
      category: 'Culture',
      readTime: '6 min'
    },
    {
      id: '3',
      title: state.language === 'en'
        ? 'Sustainable Tourism: Supporting Local Communities'
        : 'Tourisme Durable: Soutenir les Communautés Locales',
      excerpt: state.language === 'en'
        ? 'Learn how responsible travel in Cameroon creates positive impacts for local communities and wildlife conservation...'
        : 'Apprenez comment le voyage responsable au Cameroun crée des impacts positifs pour les communautés locales et la conservation de la faune...',
      image: 'https://images.pexels.com/photos/5805962/pexels-photo-5805962.jpeg',
      author: 'Sarah Fonkem',
      date: '2025-01-05',
      category: 'Conservation',
      readTime: '10 min'
    },
    {
      id: '4',
      title: state.language === 'en'
        ? 'Mount Cameroon: Climbing West Africa\'s Highest Peak'
        : 'Mont Cameroun: Escalader le Plus Haut Sommet d\'Afrique de l\'Ouest',
      excerpt: state.language === 'en'
        ? 'A complete guide to conquering Mount Cameroon, including preparation tips, routes, and what to expect...'
        : 'Un guide complet pour conquérir le Mont Cameroun, incluant des conseils de préparation, des routes et ce à quoi s\'attendre...',
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
      author: 'Sarah Fonkem',
      date: '2024-12-28',
      category: 'Adventure',
      readTime: '12 min'
    },
    {
      id: '5',
      title: state.language === 'en'
        ? 'The Baka People: Guardians of the Forest'
        : 'Le Peuple Baka: Gardiens de la Forêt',
      excerpt: state.language === 'en'
        ? 'Discover the ancient wisdom and sustainable practices of Cameroon\'s indigenous Baka communities...'
        : 'Découvrez la sagesse ancestrale et les pratiques durables des communautés indigènes Baka du Cameroun...',
      image: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
      author: 'Jean-Paul Mbarga',
      date: '2024-12-20',
      category: 'Culture',
      readTime: '9 min'
    },
    {
      id: '6',
      title: state.language === 'en'
        ? 'Coastal Delights: Exploring Cameroon\'s Atlantic Shore'
        : 'Délices Côtiers: Explorer la Côte Atlantique du Cameroun',
      excerpt: state.language === 'en'
        ? 'From Limbe\'s volcanic beaches to Kribi\'s pristine shores, discover Cameroon\'s stunning coastline...'
        : 'Des plages volcaniques de Limbé aux rives pristines de Kribi, découvrez le magnifique littoral du Cameroun...',
      image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
      author: 'Amina Njoya',
      date: '2024-12-15',
      category: 'Nature',
      readTime: '7 min'
    },
  ];

  const categories = ['All', 'Culture', 'Wildlife', 'Adventure', 'Conservation', 'Nature'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('blog', state.language)}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {state.language === 'en' 
                ? 'Stories, insights, and guides about Cameroon\'s incredible diversity'
                : 'Histoires, aperçus et guides sur l\'incroyable diversité du Cameroun'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={filteredPosts[0]?.image}
                  alt={filteredPosts[0]?.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {state.language === 'en' ? 'Featured' : 'En Vedette'}
                  </span>
                  <span className="text-sm text-gray-500">{filteredPosts[0]?.readTime} read</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {filteredPosts[0]?.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {filteredPosts[0]?.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{filteredPosts[0]?.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(filteredPosts[0]?.date || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 font-medium">
                    <span>{state.language === 'en' ? 'Read More' : 'Lire Plus'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium">
            {state.language === 'en' ? 'Load More Articles' : 'Charger Plus d\'Articles'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;