export interface CountryData {
  id: string;
  name: string;
  subtitle: string;
  heroImage: string;
  location: string;
  stats: {
    parks: string;
    bestTime: string;
    vibe: string;
    capital: string;
  };
  overview: {
    description: string;
    history: string;
    geography: string;
    funFacts: string;
    mainFeature: {
      title: string;
      description: string;
      image: string;
    };
  };
  topParks: {
    name: string;
    desc: string;
    img: string;
  }[];
  culture: {
    title: string;
    desc: string;
    img: string;
  }[];
  travelGuide: {
    gettingThere: {
      air: string;
      visa: string;
    };
    bestTime: {
      peak: { label: string; desc: string };
      offPeak: { label: string; desc: string };
    };
    currency: string;
    language: string;
  };
  safaris: {
    name: string;
    price: string;
    img: string;
    rating: string;
    days: number;
  }[];
}

export const countryData: Record<string, CountryData> = {
  'kenya': {
    id: 'kenya',
    name: 'Kenya',
    subtitle: 'The Original Safari Destination',
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000',
    location: 'East Africa',
    stats: {
      parks: '20+ National Parks',
      bestTime: 'Jul - Oct',
      vibe: 'Classic Safari & Culture',
      capital: 'Nairobi',
    },
    overview: {
      description: 'Kenya is the historical home of the East African safari, a land of sweeping savannahs, immense herds of wildlife, and peoples with proud traditions on the soil where the human race was born.',
      history: 'Kenya became independent in 1963. It has a rich history of trade along its coast and diverse tribal cultures inland, most notably the Maasai and Samburu people.',
      geography: 'Bisected by the Great Rift Valley, Kenya features a diverse geography including the snow-capped Mount Kenya, the fertile highlands, and the arid northern deserts.',
      funFacts: 'Kenya is home to the first woman from Africa to win the Nobel Peace Prize, Wangari Maathai. It also has 50 national parks and reserves.',
      mainFeature: {
        title: 'The Great Migration',
        description: 'Every year, over two million wildebeest, zebras, and gazelles migrate from the Serengeti in Tanzania to the Masai Mara in Kenya, crossing the crocodile-infested Mara River.',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
      }
    },
    topParks: [
      { name: 'Masai Mara', desc: 'Famous for the Great Migration and big cats.', img: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800' },
      { name: 'Amboseli', desc: 'Iconic views of Mount Kilimanjaro and large elephant herds.', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800' },
      { name: 'Lake Nakuru', desc: 'A Rift Valley soda lake famous for flamingos and rhinos.', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=800' },
    ],
    culture: [
      { title: 'The Maasai People', desc: 'Known for their distinctive red shukas and jumping dance.', img: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=800' },
      { title: 'Swahili Coast', desc: 'A blend of African, Arab, and Indian influences along the Indian Ocean.', img: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800' },
    ],
    travelGuide: {
      gettingThere: {
        air: 'Jomo Kenyatta International Airport (NBO) in Nairobi is the main hub.',
        visa: 'Most visitors require an eTA (Electronic Travel Authorisation) before travel.',
      },
      bestTime: {
        peak: { label: 'Dry Season (Jul - Oct)', desc: 'Best for wildlife viewing and the Great Migration.' },
        offPeak: { label: 'Green Season (Nov - May)', desc: 'Lush landscapes, newborn animals, and fewer crowds. Heavy rains in April/May.' },
      },
      currency: 'Kenyan Shilling (KES). US Dollars are widely accepted in tourist areas.',
      language: 'Swahili and English are the official languages.',
    },
    safaris: [
      { name: 'Classic Kenya Safari', price: '$2,500', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', rating: '4.9', days: 7 },
      { name: 'Mara & Amboseli Explorer', price: '$3,200', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', rating: '5.0', days: 10 },
    ]
  },
  'tanzania': {
    id: 'tanzania',
    name: 'Tanzania',
    subtitle: 'Land of the Serengeti',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000',
    location: 'East Africa',
    stats: {
      parks: '22 National Parks',
      bestTime: 'Jun - Oct',
      vibe: 'Endless Plains & Wildlife',
      capital: 'Dodoma',
    },
    overview: {
      description: 'Tanzania is a country of incredible natural beauty, home to the Serengeti, Mount Kilimanjaro, and the Ngorongoro Crater, offering some of the best wildlife viewing on the planet.',
      history: 'Formed in 1964 by the union of Tanganyika and Zanzibar. It has a peaceful history since independence and a strong sense of national identity.',
      geography: 'Features the highest mountain in Africa (Kilimanjaro), the deepest lake (Tanganyika), and the largest lake (Victoria).',
      funFacts: 'Nearly 30% of Tanzania is designated as national parks and game reserves.',
      mainFeature: {
        title: 'Ngorongoro Crater',
        description: 'The worlds largest inactive, intact and unfilled volcanic caldera. It acts as a natural enclosure for a vast variety of wildlife, including the Big Five.',
        image: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=800',
      }
    },
    topParks: [
      { name: 'Serengeti', desc: 'Famous for the endless plains and the Great Migration.', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800' },
      { name: 'Ngorongoro', desc: 'A volcanic crater teeming with wildlife.', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Tarangire', desc: 'Known for its large elephant herds and baobab trees.', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800' },
    ],
    culture: [
      { title: 'More than 120 Tribes', desc: 'Tanzania is incredibly diverse, with the Sukuma, Chagga, and Maasai being among the most well-known.', img: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=800' },
      { title: 'Zanzibar Spice Island', desc: 'A unique blend of African, Arab, and Indian cultures with stunning beaches.', img: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800' },
    ],
    travelGuide: {
      gettingThere: {
        air: 'Kilimanjaro International Airport (JRO) is best for the northern circuit. Julius Nyerere (DAR) for the south.',
        visa: 'Most nationalities require a visa, which can be obtained online (e-Visa) or on arrival.',
      },
      bestTime: {
        peak: { label: 'Dry Season (Jun - Oct)', desc: 'Best for wildlife viewing and the river crossings in the northern Serengeti.' },
        offPeak: { label: 'Green Season (Nov - May)', desc: 'Excellent birdwatching and the wildebeest calving season in the southern Serengeti (Jan-Feb).' },
      },
      currency: 'Tanzanian Shilling (TZS). US Dollars are widely accepted.',
      language: 'Swahili is the national language; English is widely spoken in tourist areas.',
    },
    safaris: [
      { name: 'Northern Circuit Highlights', price: '$3,100', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', rating: '4.9', days: 8 },
      { name: 'Serengeti Migration Safari', price: '$4,500', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', rating: '5.0', days: 10 },
    ]
  }
};
