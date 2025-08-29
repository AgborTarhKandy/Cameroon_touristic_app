import { Tour } from '../types';

export const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Bamileke Cultural Immersion',
    description: 'Experience authentic Bamileke traditions in the Western Highlands',
    longDescription: 'Dive deep into the rich cultural heritage of the Bamileke people in Cameroon\'s Western region. Visit traditional palaces, witness sacred ceremonies, learn ancient crafts, and participate in colorful festivals that have been preserved for generations.',
    price: 450,
    duration: '5 days',
    difficulty: 'Easy',
    region: 'Western',
    type: 'cultural',
    diversityTags: ['Traditional Festivals', 'Royal Palaces', 'Handicrafts', 'Cultural Heritage'],
    images: [
      'https://images.pexels.com/photos/6249959/pexels-photo-6249959.jpeg',
      'https://images.pexels.com/photos/5805962/pexels-photo-5805962.jpeg',
      'https://images.pexels.com/photos/4100420/pexels-photo-4100420.jpeg'
    ],
    rating: 4.8,
    reviewsCount: 124,
    included: ['Traditional accommodation', 'All meals', 'Cultural guide', 'Festival participation'],
    excluded: ['International flights', 'Personal expenses', 'Alcoholic beverages'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bafoussam',
        description: 'Welcome to the heart of Bamileke country',
        activities: ['Airport pickup', 'Traditional welcome ceremony', 'Palace visit']
      },
      {
        day: 2,
        title: 'Festival Participation',
        description: 'Join in authentic Bamileke celebrations',
        activities: ['Morning dance rehearsal', 'Festival parade', 'Traditional feast']
      }
    ],
    maxGroupSize: 12,
    availableDates: ['2025-03-15', '2025-04-10', '2025-05-20']
  },
  {
    id: '2',
    title: 'Dja Wildlife Safari',
    description: 'Encounter rare species in UNESCO World Heritage rainforest',
    longDescription: 'Explore the pristine Dja Faunal Reserve, home to forest elephants, lowland gorillas, and over 300 bird species. This UNESCO World Heritage site represents one of Africa\'s most important biodiversity hotspots.',
    price: 780,
    duration: '7 days',
    difficulty: 'Moderate',
    region: 'East',
    type: 'wildlife',
    diversityTags: ['UNESCO Heritage', 'Rainforest Wildlife', 'Gorilla Tracking', 'Biodiversity'],
    images: [
      'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg',
      'https://images.pexels.com/photos/2280951/pexels-photo-2280951.jpeg',
      'https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg'
    ],
    rating: 4.9,
    reviewsCount: 89,
    included: ['Lodge accommodation', 'All meals', 'Expert guides', 'Park permits'],
    excluded: ['International flights', 'Travel insurance', 'Personal gear'],
    itinerary: [
      {
        day: 1,
        title: 'Journey to Dja Reserve',
        description: 'Travel through changing landscapes',
        activities: ['Departure from Yaoundé', 'Scenic drive', 'Lodge check-in']
      }
    ],
    maxGroupSize: 8,
    availableDates: ['2025-04-05', '2025-05-15', '2025-06-20']
  },
  {
    id: '3',
    title: 'Mount Cameroon Adventure',
    description: 'Conquer West Africa\'s highest peak with diverse ecosystems',
    longDescription: 'Challenge yourself on Mount Cameroon, an active volcano and West Africa\'s highest mountain. Experience incredible biodiversity from tropical rainforest to alpine vegetation zones.',
    price: 620,
    duration: '4 days',
    difficulty: 'Challenging',
    region: 'Southwest',
    type: 'adventure',
    diversityTags: ['Mountain Climbing', 'Volcanic Landscapes', 'Alpine Flora', 'Physical Challenge'],
    images: [
      'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
      'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg',
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg'
    ],
    rating: 4.7,
    reviewsCount: 156,
    included: ['Mountain huts', 'Meals during trek', 'Professional guides', 'Safety equipment'],
    excluded: ['Personal hiking gear', 'Travel insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Base Camp Setup',
        description: 'Prepare for the ascent',
        activities: ['Equipment check', 'Orientation briefing', 'Practice hike']
      }
    ],
    maxGroupSize: 10,
    availableDates: ['2025-03-20', '2025-04-25', '2025-05-30']
  },
  {
    id: '4',
    title: 'Limbe Beach Retreat',
    description: 'Relax on volcanic black sand beaches with coastal culture',
    longDescription: 'Unwind on Cameroon\'s stunning Atlantic coast in Limbe, where volcanic black sand beaches meet lush tropical vegetation. Experience coastal Bakweri culture and fresh seafood.',
    price: 320,
    duration: '3 days',
    difficulty: 'Easy',
    region: 'Southwest',
    type: 'eco-tourism',
    diversityTags: ['Coastal Culture', 'Black Sand Beaches', 'Seafood Cuisine', 'Marine Life'],
    images: [
      'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
      'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg'
    ],
    rating: 4.6,
    reviewsCount: 203,
    included: ['Beach resort accommodation', 'Daily breakfast', 'Coastal guide', 'Beach activities'],
    excluded: ['Lunch and dinner', 'Water sports equipment', 'Spa treatments'],
    itinerary: [
      {
        day: 1,
        title: 'Coastal Arrival',
        description: 'Settle into beach paradise',
        activities: ['Resort check-in', 'Beach orientation', 'Sunset viewing']
      }
    ],
    maxGroupSize: 15,
    availableDates: ['2025-03-10', '2025-04-15', '2025-05-25']
  },
  {
    id: '5',
    title: 'Northern Sahel Experience',
    description: 'Discover nomadic Fulani culture and savanna landscapes',
    longDescription: 'Journey to Cameroon\'s northern regions to experience the Sahelian lifestyle. Meet Fulani herders, visit traditional markets, and witness the unique culture at the edge of the Sahara.',
    price: 520,
    duration: '6 days',
    difficulty: 'Moderate',
    region: 'Northern',
    type: 'cultural',
    diversityTags: ['Nomadic Culture', 'Sahel Landscapes', 'Traditional Markets', 'Fulani Heritage'],
    images: [
      'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg',
      'https://images.pexels.com/photos/2232135/pexels-photo-2232135.jpeg',
      'https://images.pexels.com/photos/1562578/pexels-photo-1562578.jpeg'
    ],
    rating: 4.5,
    reviewsCount: 87,
    included: ['Traditional lodging', 'All meals', 'Cultural guide', 'Market tours'],
    excluded: ['International flights', 'Personal shopping', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Maroua Arrival',
        description: 'Enter the gateway to the North',
        activities: ['City orientation', 'Traditional welcome', 'Local cuisine tasting']
      }
    ],
    maxGroupSize: 10,
    availableDates: ['2025-04-01', '2025-05-10', '2025-06-15']
  },
  {
    id: '6',
    title: 'Baka Pygmy Forest Experience',
    description: 'Learn ancient forest wisdom from indigenous communities',
    longDescription: 'Spend time with the Baka people, one of Cameroon\'s indigenous communities, in their natural rainforest habitat. Learn traditional hunting techniques, medicinal plants, and forest conservation practices.',
    price: 680,
    duration: '5 days',
    difficulty: 'Moderate',
    region: 'East',
    type: 'cultural',
    diversityTags: ['Indigenous Culture', 'Forest Wisdom', 'Traditional Medicine', 'Conservation'],
    images: [
      'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
      'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
      'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg'
    ],
    rating: 4.9,
    reviewsCount: 45,
    included: ['Forest camps', 'Traditional meals', 'Cultural guide', 'Activities'],
    excluded: ['Modern amenities', 'Personal items', 'Medical insurance'],
    itinerary: [
      {
        day: 1,
        title: 'Forest Entry',
        description: 'Begin the journey into ancient wisdom',
        activities: ['Community welcome', 'Forest orientation', 'Traditional dinner']
      }
    ],
    maxGroupSize: 6,
    availableDates: ['2025-03-25', '2025-04-30', '2025-06-05']
  }
];