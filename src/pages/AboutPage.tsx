import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Award, Heart, Globe, MapPin, Camera } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { state } = useApp();

  const teamMembers = [
    {
      name: 'Amina Njoya',
      role: state.language === 'en' ? 'Founder & Cultural Guide' : 'Fondatrice & Guide Culturel',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      bio: state.language === 'en' 
        ? 'Born in Foumban, passionate about sharing Cameroon\'s rich cultural heritage'
        : 'Née à Foumban, passionnée par le partage du riche patrimoine culturel du Cameroun'
    },
    {
      name: 'Jean-Paul Mbarga',
      role: state.language === 'en' ? 'Wildlife Expert' : 'Expert en Faune',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      bio: state.language === 'en' 
        ? 'Wildlife biologist specializing in Cameroon\'s forest ecosystems'
        : 'Biologiste de la faune spécialisé dans les écosystèmes forestiers du Cameroun'
    },
    {
      name: 'Sarah Fonkem',
      role: state.language === 'en' ? 'Adventure Coordinator' : 'Coordinatrice d\'Aventure',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: state.language === 'en' 
        ? 'Mountain guide and adventure enthusiast from the Bamenda Highlands'
        : 'Guide de montagne et passionnée d\'aventure des Hauts Plateaux de Bamenda'
    },
  ];

  const values = [
    {
      icon: Heart,
      title: state.language === 'en' ? 'Cultural Respect' : 'Respect Culturel',
      description: state.language === 'en' 
        ? 'We honor and preserve the authentic traditions of Cameroon\'s diverse communities'
        : 'Nous honorons et préservons les traditions authentiques des diverses communautés du Cameroun'
    },
    {
      icon: Globe,
      title: state.language === 'en' ? 'Sustainable Tourism' : 'Tourisme Durable',
      description: state.language === 'en' 
        ? 'Our tours support local economies while protecting natural environments'
        : 'Nos circuits soutiennent les économies locales tout en protégeant les environnements naturels'
    },
    {
      icon: Users,
      title: state.language === 'en' ? 'Community Impact' : 'Impact Communautaire',
      description: state.language === 'en' 
        ? 'We work directly with local communities to ensure tourism benefits everyone'
        : 'Nous travaillons directement avec les communautés locales pour que le tourisme profite à tous'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {state.language === 'en' ? 'About Cameroon Tours' : 'À Propos de Cameroon Tours'}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            {state.language === 'en' 
              ? 'Celebrating Cameroon\'s incredible diversity through authentic, sustainable tourism experiences'
              : 'Célébrer l\'incroyable diversité du Cameroun à travers des expériences touristiques authentiques et durables'
            }
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {state.language === 'en' ? 'Our Mission' : 'Notre Mission'}
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {state.language === 'en' 
                  ? 'We believe Cameroon truly is "Africa in Miniature" - a country where you can experience the entire continent\'s diversity in one extraordinary destination. From the Sahel\'s nomadic cultures to the rainforest\'s ancient wisdom, from volcanic mountains to pristine beaches, we showcase it all.'
                  : 'Nous croyons que le Cameroun est vraiment "l\'Afrique en miniature" - un pays où vous pouvez découvrir toute la diversité du continent en une seule destination extraordinaire. Des cultures nomades du Sahel à la sagesse ancestrale de la forêt tropicale, des montagnes volcaniques aux plages pristines, nous montrons tout.'
                }
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {state.language === 'en' 
                  ? 'Our goal is to create transformative travel experiences that respect local cultures, support communities, and preserve the natural beauty that makes Cameroon unique.'
                  : 'Notre objectif est de créer des expériences de voyage transformatrices qui respectent les cultures locales, soutiennent les communautés et préservent la beauté naturelle qui rend le Cameroun unique.'
                }
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.pexels.com/photos/6249959/pexels-photo-6249959.jpeg"
                alt="Cameroon diversity"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {state.language === 'en' ? 'Our Values' : 'Nos Valeurs'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {state.language === 'en' 
                ? 'These principles guide everything we do as we share Cameroon\'s wonders with the world'
                : 'Ces principes guident tout ce que nous faisons en partageant les merveilles du Cameroun avec le monde'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {state.language === 'en' ? 'Meet Our Team' : 'Rencontrez Notre Équipe'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {state.language === 'en' 
                ? 'Our diverse team represents the beautiful tapestry of Cameroon\'s people and regions'
                : 'Notre équipe diverse représente la belle mosaïque des peuples et régions du Cameroun'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-primary-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diversity Map Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {state.language === 'en' ? 'Cameroon\'s Diversity' : 'La Diversité du Cameroun'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {state.language === 'en' 
                ? 'Discover why we call Cameroon "Africa in Miniature"'
                : 'Découvrez pourquoi nous appelons le Cameroun "l\'Afrique en miniature"'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">250+</h3>
              <p className="text-gray-600">
                {state.language === 'en' ? 'Ethnic Groups' : 'Groupes Ethniques'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2</h3>
              <p className="text-gray-600">
                {state.language === 'en' ? 'Official Languages' : 'Langues Officielles'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-secondary-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">10</h3>
              <p className="text-gray-600">
                {state.language === 'en' ? 'Regions' : 'Régions'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">4</h3>
              <p className="text-gray-600">
                {state.language === 'en' ? 'Climate Zones' : 'Zones Climatiques'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {state.language === 'en' ? 'Ready to Explore?' : 'Prêt à Explorer?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {state.language === 'en' 
              ? 'Join us in discovering the incredible diversity that makes Cameroon truly unique'
              : 'Rejoignez-nous pour découvrir l\'incroyable diversité qui rend le Cameroun vraiment unique'
            }
          </p>
          <button 
            onClick={() => window.location.href = '/tours'}
            className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            {state.language === 'en' ? 'Browse Tours' : 'Parcourir les Circuits'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;