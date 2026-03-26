import React from 'react';

export interface ParkInfo {
  id: string;
  name: string;
  location: string;
  subtitle: string;
  heroImage: string;
  stats: {
    area: string;
    established: string;
    bigFive: string;
    unesco: string;
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
  wildlife: {
    name: string;
    desc: string;
    img: string;
  }[];
  activities: {
    title: string;
    iconName: string;
    desc: string;
  }[];
  lodges: {
    name: string;
    rating: string;
    price: string;
    img: string;
  }[];
  logistics: {
    gettingThere: {
      air: string;
      road: string;
    };
    bestTime: {
      peak: { label: string; desc: string };
      offPeak: { label: string; desc: string };
    };
    fees: {
      adult: string;
      child: string;
      note: string;
    };
  };
}

export const parkData: Record<string, ParkInfo> = {
  'masai-mara': {
    id: 'masai-mara',
    name: 'Masai Mara National Reserve',
    location: 'Narok County, Kenya',
    subtitle: "Where the Wild Roams Free in Kenya's Iconic Savannah. Experience the world's most spectacular wildlife migration.",
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920',
    stats: {
      area: '1,510 km²',
      established: '1961',
      bigFive: 'Present',
      unesco: 'Tentative',
    },
    overview: {
      description: "The Masai Mara National Reserve is Kenya's flagship conservation area. Bordering Tanzania's Serengeti, it forms the northern continuation of the Greater Mara ecosystem. Renowned for its exceptional populations of lions, leopards, and cheetahs, it is the premier destination for classic African safaris.",
      history: "Originally established in 1961 as a wildlife sanctuary covering 520 square kilometers, it was extended to the east in 1961 and converted to a National Reserve. It is managed by the Narok County Government and local Maasai communities.",
      geography: "The landscape is characterized by rolling open grassland dotted with acacia trees, intersected by seasonal riverlets and the mighty Mara River. The western border is defined by the dramatic Oloololo Escarpment.",
      funFacts: "The word 'Mara' means 'spotted' in the local Maa language, referring to the landscape dotted with trees, scrub, and cloud shadows. It boasts one of the highest concentrations of land mammals on the planet.",
      mainFeature: {
        title: 'The Great Migration',
        description: "Between July and October, over a million wildebeest, zebras, and gazelles arrive from the Serengeti. The dramatic crossings of the crocodile-infested Mara River are among nature's most thrilling spectacles.",
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600',
      }
    },
    wildlife: [
      { name: 'Lion', desc: 'Famous for exceptional pride dynamics and the BBC\'s Big Cat Diary', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Leopard', desc: 'Frequently spotted along the forested banks of the Mara and Talek rivers', img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=400' },
      { name: 'Elephant', desc: 'Large, stable herds roam the plains and riverine woodlands', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400' },
      { name: 'Black Rhino', desc: 'Rare and elusive, primarily found in the Mara Triangle', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Buffalo', desc: 'Massive herds graze the open savannah year-round', img: 'https://images.unsplash.com/photo-1551491707-ed5566fb36ee?auto=format&fit=crop&q=80&w=400' },
      { name: 'Cheetah', desc: 'The open plains provide perfect hunting grounds for the world\'s fastest land mammal', img: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?auto=format&fit=crop&q=80&w=400' },
    ],
    activities: [
      { title: 'Game Drives', iconName: 'Compass', desc: 'Classic 4x4 safaris. Night drives are permitted in the surrounding private conservancies.' },
      { title: 'Hot Air Ballooning', iconName: 'Wind', desc: 'A quintessential Mara experience: floating over the plains at dawn, ending with a champagne breakfast.' },
      { title: 'Cultural Tours', iconName: 'Users', desc: 'Visit traditional Maasai Manyattas to learn about their nomadic lifestyle and coexistence with wildlife.' },
      { title: 'Nature Walks', iconName: 'Leaf', desc: 'Guided bush walks with armed Maasai warriors, available in the bordering conservancies.' },
    ],
    lodges: [
      { name: 'Angama Mara', rating: '5.0', price: '$1,650', img: 'https://images.unsplash.com/photo-1518182170546-076616fdca44?auto=format&fit=crop&q=80&w=600' },
      { name: 'Mahali Mzuri', rating: '5.0', price: '$1,850', img: 'https://images.unsplash.com/photo-1499696803328-39327318712f?auto=format&fit=crop&q=80&w=600' },
      { name: 'Governors\' Camp', rating: '4.8', price: '$950', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    ],
    logistics: {
      gettingThere: {
        air: '45-60 minute flights from Nairobi (Wilson Airport) to various airstrips like Keekorok, Ol Kiombo, or Musiara.',
        road: 'A 5-6 hour drive from Nairobi. The road from Narok town can be rough; a 4x4 is highly recommended.',
      },
      bestTime: {
        peak: { label: 'July — October', desc: 'Peak season for the Great Migration and dramatic river crossings.' },
        offPeak: { label: 'November — May', desc: 'The "Green Season" offers lush landscapes, excellent birding, newborn animals, and fewer crowds.' },
      },
      fees: {
        adult: '$100 - $200 / day',
        child: '$50 / day',
        note: 'Fees increased in 2024. Non-resident adults pay $200/day during peak season (Jul-Dec) and $100/day (Jan-Jun). Private conservancies have separate fees.',
      }
    }
  },
  'kruger': {
    id: 'kruger',
    name: 'Kruger National Park',
    location: 'Mpumalanga & Limpopo, South Africa',
    subtitle: "One of Africa's largest game reserves. A wildlife sanctuary of unparalleled diversity and accessibility.",
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920',
    stats: {
      area: '19,485 km²',
      established: '1898',
      bigFive: 'Present',
      unesco: 'Biosphere Reserve',
    },
    overview: {
      description: "Roughly the size of Israel or Wales, Kruger National Park is South Africa's flagship national park and one of the largest game reserves in Africa. It offers an incredibly diverse landscape, world-class infrastructure, and some of the most accessible Big Five wildlife viewing on the continent.",
      history: "First protected by Paul Kruger, then President of the Transvaal Republic, as the Sabie Game Reserve in 1898 to control hunting. It was expanded and officially proclaimed South Africa's first national park in 1926.",
      geography: "Stretching 360 kilometers from north to south, the park is bordered by Mozambique to the east and Zimbabwe to the north. It features diverse eco-zones, crossed by major rivers including the Sabie, Olifants, and Crocodile.",
      funFacts: "Kruger is home to an astonishing 147 mammal species, over 500 bird species, 114 reptile species, and 34 amphibian species. It welcomes over 1.8 million visitors annually.",
      mainFeature: {
        title: 'The Big Five & Beyond',
        description: "Kruger is world-renowned for its high density of wild animals, including robust populations of lions, leopards, rhinos, elephants, and buffalos. Its excellent road network makes it a global premier destination for self-drive safaris.",
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=600',
      }
    },
    wildlife: [
      { name: 'Lion', desc: 'A healthy population of roughly 1,600 to 2,000 individuals', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Leopard', desc: 'Highly elusive, but frequently spotted in the riverine forests of the Sabie area', img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=400' },
      { name: 'Elephant', desc: 'A thriving population of over 20,000 individuals across the park', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400' },
      { name: 'Rhino', desc: 'A critical stronghold for both white and black rhinos, despite poaching pressures', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Buffalo', desc: 'Massive herds totaling over 40,000 individuals roam the savannah', img: 'https://images.unsplash.com/photo-1551491707-ed5566fb36ee?auto=format&fit=crop&q=80&w=400' },
      { name: 'Wild Dog', desc: 'One of the few viable populations in Africa, with around 400-500 individuals', img: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?auto=format&fit=crop&q=80&w=400' },
    ],
    activities: [
      { title: 'Self-Drive Safaris', iconName: 'Compass', desc: 'Explore the vast, well-maintained network of paved and gravel roads at your own pace.' },
      { title: 'Wilderness Trails', iconName: 'Leaf', desc: 'Multi-day guided walking safaris with armed rangers, offering a deeply immersive bush experience.' },
      { title: 'Night Drives', iconName: 'Moon', desc: 'Join official SANParks guided night drives to spot nocturnal predators and elusive species.' },
      { title: 'Bird Watching', iconName: 'Bird', desc: 'With over 500 species, the northern regions like Pafuri are a paradise for avid birders.' },
    ],
    lodges: [
      { name: 'Singita Lebombo Lodge', rating: '5.0', price: '$2,800', img: 'https://images.unsplash.com/photo-1518182170546-076616fdca44?auto=format&fit=crop&q=80&w=600' },
      { name: 'Lion Sands Ivory Lodge', rating: '4.9', price: '$2,400', img: 'https://images.unsplash.com/photo-1499696803328-39327318712f?auto=format&fit=crop&q=80&w=600' },
      { name: 'Skukuza Rest Camp', rating: '4.2', price: '$120', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    ],
    logistics: {
      gettingThere: {
        air: 'Direct flights to Skukuza (SZK), Hoedspruit (HDS), or Kruger Mpumalanga International Airport (MQP).',
        road: 'A 4-5 hour drive from Johannesburg on excellent national highways (N4 or N12).',
      },
      bestTime: {
        peak: { label: 'May — September', desc: 'Dry winter months. Vegetation is sparse and animals congregate around waterholes, making wildlife easier to spot.' },
        offPeak: { label: 'October — April', desc: 'Wet summer months. The bush is lush and green, excellent for birding and seeing newborn animals.' },
      },
      fees: {
        adult: 'R535 / day (approx $30)',
        child: 'R267 / day (approx $15)',
        note: 'SANParks daily conservation fees apply. South African citizens and SADC nationals pay significantly reduced rates. Wild Cards are accepted.',
      }
    }
  },
  'serengeti': {
    id: 'serengeti',
    name: 'Serengeti National Park',
    location: 'Northern Tanzania',
    subtitle: "Endless Plains. The stage for the greatest wildlife spectacle on earth.",
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920',
    stats: {
      area: '14,763 km²',
      established: '1951',
      bigFive: 'Present',
      unesco: 'World Heritage Site',
    },
    overview: {
      description: "The Serengeti National Park is Tanzania's oldest and most popular national park, anchoring the vast Serengeti ecosystem. It is globally renowned for hosting the Great Migration, where over 1.5 million wildebeest, 500,000 Thomson's gazelles, and 250,000 zebras traverse its plains in a continuous, year-round cycle.",
      history: "The Maasai people grazed their livestock on these 'endless plains' for over 200 years before the first European explorer, Stewart Edward White, arrived in 1913. It was established as a National Park in 1951 to protect the wildlife from hunting.",
      geography: "Spanning 14,763 square kilometers, the park's landscape varies from the iconic short-grass plains in the south to the acacia-dotted savanna in the center, and the hilly, wooded landscapes of the northern corridor.",
      funFacts: "The name 'Serengeti' is derived from the Maasai word 'siringet', which translates to 'the place where the land runs on forever'. It is also home to the highest concentration of large predators in the world.",
      mainFeature: {
        title: 'The Great Migration',
        description: "Often described as the greatest wildlife show on earth, this circular migration sees millions of herbivores trekking across the Serengeti and into the Masai Mara, driven by seasonal rains and the search for fresh grazing.",
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600',
      }
    },
    wildlife: [
      { name: 'Lion', desc: 'Africa\'s largest population, with over 3,000 individuals', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Leopard', desc: 'Frequently spotted resting in acacia trees along the Seronera River', img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=400' },
      { name: 'Elephant', desc: 'Populations are thriving, particularly in the northern woodlands', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400' },
      { name: 'Wildebeest', desc: 'The driving force of the ecosystem, numbering over 1.5 million', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Zebra', desc: 'Around 250,000 migrate alongside the wildebeest', img: 'https://images.unsplash.com/photo-1551491707-ed5566fb36ee?auto=format&fit=crop&q=80&w=400' },
      { name: 'Cheetah', desc: 'Exceptional sightings on the open, short-grass plains of the southeast', img: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?auto=format&fit=crop&q=80&w=400' },
    ],
    activities: [
      { title: 'Game Drives', iconName: 'Compass', desc: 'Extensive daily drives to track the migration and observe resident predator populations.' },
      { title: 'Hot Air Ballooning', iconName: 'Wind', desc: 'Iconic sunrise flights over the vast plains, culminating in a champagne bush breakfast.' },
      { title: 'Walking Safaris', iconName: 'Leaf', desc: 'Available in designated wilderness zones, offering an intimate, ground-level perspective.' },
      { title: 'Cultural Visits', iconName: 'Users', desc: 'Respectful visits to neighboring Maasai bomas to learn about their traditional way of life.' },
    ],
    lodges: [
      { name: 'Singita Sasakwa Lodge', rating: '5.0', price: '$2,850', img: 'https://images.unsplash.com/photo-1499696803328-39327318712f?auto=format&fit=crop&q=80&w=600' },
      { name: 'Four Seasons Safari Lodge', rating: '4.9', price: '$1,850', img: 'https://images.unsplash.com/photo-1518182170546-076616fdca44?auto=format&fit=crop&q=80&w=600' },
      { name: 'Sayari Camp', rating: '4.8', price: '$1,200', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    ],
    logistics: {
      gettingThere: {
        air: 'Scheduled light aircraft flights from Arusha or Kilimanjaro to airstrips like Seronera or Kogatende.',
        road: 'A scenic 6-8 hour drive from Arusha, typically passing through the Ngorongoro Conservation Area.',
      },
      bestTime: {
        peak: { label: 'July — October', desc: 'Dry season. Ideal for general wildlife viewing and witnessing the dramatic Mara River crossings in the north.' },
        offPeak: { label: 'January — March', desc: 'Calving season in the southern Ndutu plains. Thousands of calves are born daily, attracting intense predator activity.' },
      },
      fees: {
        adult: '$80 / day (Peak Season)',
        child: '$20 / day (Ages 5-15)',
        note: 'Park fees are subject to 18% VAT. Additional concession fees apply when staying at lodges inside the park or private reserves.',
      }
    }
  },
  'okavango': {
    id: 'okavango',
    name: 'Okavango Delta',
    location: 'North-West District, Botswana',
    subtitle: "Africa's Last Eden. A vast inland river delta known for its sprawling grassy plains and seasonal flooding.",
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920',
    stats: {
      area: 'Up to 15,000 km²',
      established: '1963 (Moremi)',
      bigFive: 'Present',
      unesco: '1000th World Heritage Site',
    },
    overview: {
      description: "The Okavango Delta is a unique pulsing wetland. Formed where the Okavango River empties onto the sands of the Kalahari Desert, it creates a massive endorheic basin where the water eventually evaporates or transpires, never reaching the ocean.",
      history: "The core of the delta is protected by the Moremi Game Reserve, established in 1963 by the local Batawana people. It was the first reserve in Africa to be established by local residents rather than colonial powers.",
      geography: "A dynamic, ever-changing maze of lagoons, winding channels, and palm-fringed islands. The delta's size fluctuates dramatically, swelling from 6,000 to 15,000 square kilometers during the peak flood season.",
      funFacts: "The floodwaters that arrive in the dry season (June-August) actually fell as rain in the Angolan highlands months earlier, taking a slow, 1,200km journey to reach the delta.",
      mainFeature: {
        title: 'The Annual Flood',
        description: "As the surrounding Kalahari Desert dries out, the delta floods, creating a lush oasis. This paradox attracts immense concentrations of wildlife from across the region, making it a premier safari destination.",
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600',
      }
    },
    wildlife: [
      { name: 'Elephant', desc: 'Massive herds congregate on the islands during the dry season', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400' },
      { name: 'Leopard', desc: 'Exceptional sightings in the riverine forests of Moremi and private concessions', img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lion', desc: 'Delta lions are uniquely adapted, often swimming between islands to hunt', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Red Lechwe', desc: 'An aquatic antelope perfectly adapted to bounding through the shallow swamps', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Wild Dog', desc: 'The delta is one of the most critical strongholds for this endangered predator', img: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?auto=format&fit=crop&q=80&w=400' },
      { name: 'Hippo', desc: 'The true architects of the delta, keeping the water channels open as they move', img: 'https://images.unsplash.com/photo-1551491707-ed5566fb36ee?auto=format&fit=crop&q=80&w=400' },
    ],
    activities: [
      { title: 'Mokoro Excursions', iconName: 'Compass', desc: 'Glide silently through the lily-filled channels in a traditional dugout canoe, poled by a local guide.' },
      { title: 'Game Drives', iconName: 'Activity', desc: 'Explore the dry land areas and floodplains in specialized 4x4 vehicles.' },
      { title: 'Walking Safaris', iconName: 'Leaf', desc: 'Track wildlife on foot across the islands with highly trained, armed guides.' },
      { title: 'Helicopter Flights', iconName: 'Wind', desc: 'Take a doors-off scenic flight for spectacular aerial views of the intricate water systems and wildlife.' },
    ],
    lodges: [
      { name: 'Mombo Camp', rating: '5.0', price: '$3,800', img: 'https://images.unsplash.com/photo-1518182170546-076616fdca44?auto=format&fit=crop&q=80&w=600' },
      { name: 'Xigera Safari Lodge', rating: '5.0', price: '$3,200', img: 'https://images.unsplash.com/photo-1499696803328-39327318712f?auto=format&fit=crop&q=80&w=600' },
      { name: 'Camp Okavango', rating: '4.8', price: '$1,450', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    ],
    logistics: {
      gettingThere: {
        air: 'The primary access is via light aircraft transfers from Maun (MUB) or Kasane (BBK) directly to lodge airstrips.',
        road: 'Road access is extremely limited and mostly restricted to the fringes of the Moremi Game Reserve.',
      },
      bestTime: {
        peak: { label: 'June — October', desc: 'High water season. The flood is at its peak, offering the best mokoro trips, while wildlife concentrates on the shrinking dry land.' },
        offPeak: { label: 'November — April', desc: 'The Green Season. Excellent for birding and photography, with lower prices, though some water-based activities may be limited.' },
      },
      fees: {
        adult: 'P270 / day (approx $20) for Moremi',
        child: 'P135 / day (approx $10) for Moremi',
        note: 'Most luxury lodges are located in private concessions where all park and conservation fees are already included in the nightly rate.',
      }
    }
  },
  'lake-nakuru': {
    id: 'lake-nakuru',
    name: 'Lake Nakuru National Park',
    location: 'Rift Valley, Kenya',
    subtitle: "A breathtaking Rift Valley soda lake famous for its flamingos and rhinos.",
    heroImage: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=1920',
    stats: {
      area: '188 km²',
      established: '1961',
      bigFive: '4 of 5 (No Elephants)',
      unesco: 'World Heritage Site',
    },
    overview: {
      description: "Scenic Lake Nakuru National Park is Kenya's most popular national park. It's a fantastic place to see rhino, and sightings of lion and leopard are possible. Easy to reach — the entrance is very close to the city of Nakuru.",
      history: "First gazetted as a bird sanctuary in 1960 and upgraded to National Park status in 1968. It was designated as a rhino sanctuary in 1983.",
      geography: "Centered on a large, shallow soda lake in the Rift Valley, surrounded by wooded and bushy grassland. The park features beautiful escarpments and euphorbia forests.",
      funFacts: "The park is famous for its tree-climbing lions and the Out of Africa Lookout, which offers stunning views from the famous film.",
      mainFeature: {
        title: 'Rhino Sanctuary & Birdlife',
        description: "A highly successful sanctuary for both black and white rhinos. The lake itself can host hundreds of thousands of flamingos and pelicans, creating a spectacular pink fringe along the shores.",
        image: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=600',
      }
    },
    wildlife: [
      { name: 'White Rhino', desc: 'Commonly seen grazing on the western lakeshore', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Flamingo', desc: 'Thousands can tinge the lake shallows pink', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=400' },
      { name: 'Rothschild\'s Giraffe', desc: 'Introduced in the 1980s and now locally common', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lion', desc: 'Occasionally seen, sometimes even climbing trees', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Leopard', desc: 'Present and sometimes spotted in the acacia forests', img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=400' },
      { name: 'Pelican', desc: 'Countless pelicans roost near Rhino Point', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=400' },
    ],
    activities: [
      { title: 'Game Drives', iconName: 'Compass', desc: 'Excellent guided and self-guided drives around the lake and into the surrounding woodlands.' },
      { title: 'Bird Watching', iconName: 'Bird', desc: 'A world-class birding destination with over 450 species recorded.' },
      { title: 'Boat Excursions', iconName: 'Wind', desc: 'Available on the lake from specific lodges like The Cliff.' },
      { title: 'Viewpoints', iconName: 'Camera', desc: 'Visit Makalia Falls and the famous Out of Africa Lookout.' },
    ],
    lodges: [
      { name: 'The Cliff', rating: '4.8', price: '$650', img: 'https://images.unsplash.com/photo-1518182170546-076616fdca44?auto=format&fit=crop&q=80&w=600' },
      { name: 'Sarova Lion Hill Game Lodge', rating: '4.5', price: '$450', img: 'https://images.unsplash.com/photo-1499696803328-39327318712f?auto=format&fit=crop&q=80&w=600' },
      { name: 'Lake Nakuru Lodge', rating: '4.2', price: '$350', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    ],
    logistics: {
      gettingThere: {
        air: 'No scheduled flights directly to Nakuru. Charter flights can be arranged.',
        road: 'An easy 155km (3+ hours) drive northwest of Nairobi on tarred roads.',
      },
      bestTime: {
        peak: { label: 'June — February', desc: 'Dry season. Best for wildlife viewing with little rain. Very busy from July onwards.' },
        offPeak: { label: 'March — May', desc: 'Wet season. Less crowded, green scenery, and best for birding with migrants present.' },
      },
      fees: {
        adult: '$80 / day',
        child: '$40 / day',
        note: 'Fees vary by season. Malaria is present; antimalarials are recommended.',
      }
    }
  },
  'amboseli': {
    id: 'amboseli',
    name: 'Amboseli National Park',
    location: 'Kajiado County, Kenya',
    subtitle: "Iconic views of Mount Kilimanjaro and massive herds of free-ranging elephants.",
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920',
    stats: {
      area: '390 km²',
      established: '1974',
      bigFive: '4 of 5 (No Rhinos)',
      unesco: 'Biosphere Reserve',
    },
    overview: {
      description: "Amboseli National Park is one of Kenya's safari icons — a world of big-tusked elephants and big cats, all set against the backdrop of Mt Kilimanjaro, Africa's highest peak.",
      history: "Set aside as the Southern Reserve for Maasai in 1906, it became a game reserve in 1948 and a National Park in 1974 to protect the core swamps.",
      geography: "A vast basin with deep-green swamps in the heart of the park, stands of acacia forest, and expansive dusty savannah grasslands.",
      funFacts: "The park is famous for being the best place in the world to get close to free-ranging elephants, which have been studied here for decades.",
      mainFeature: {
        title: 'Elephants & Kilimanjaro',
        description: "Big herds of elephants reliably move to and from the marshy swamps daily. The early morning or late afternoon offers real safari magic when clouds part to reveal Kilimanjaro's summit.",
        image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=600',
      }
    },
    wildlife: [
      { name: 'Elephant', desc: 'Abundant big-tusked herds that are very relaxed around vehicles', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lion', desc: 'The easiest big cat to spot in the park', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Cheetah', desc: 'Occasionally spotted hunting on the open plains', img: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?auto=format&fit=crop&q=80&w=400' },
      { name: 'Buffalo', desc: 'Abundant in and around the marshy swamps', img: 'https://images.unsplash.com/photo-1551491707-ed5566fb36ee?auto=format&fit=crop&q=80&w=400' },
      { name: 'Hyena', desc: 'Commonly seen, with a signposted den near the airstrip', img: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?auto=format&fit=crop&q=80&w=400' },
      { name: 'Flamingo', desc: 'Often present in large flocks when the swamps fill to become lakes', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=400' },
    ],
    activities: [
      { title: 'Game Drives', iconName: 'Compass', desc: 'Excellent wildlife viewing, especially around the swamps where animals congregate.' },
      { title: 'Observation Hill', iconName: 'Camera', desc: 'The only place in the park where walking is allowed, offering panoramic views.' },
      { title: 'Hot Air Ballooning', iconName: 'Wind', desc: 'An incredible dawn experience floating towards Kilimanjaro.' },
      { title: 'Bird Watching', iconName: 'Bird', desc: 'Over 500 species, with swamps being great for waterbirds.' },
    ],
    lodges: [
      { name: 'Tortilis Camp', rating: '4.9', price: '$850', img: 'https://images.unsplash.com/photo-1518182170546-076616fdca44?auto=format&fit=crop&q=80&w=600' },
      { name: 'Elewana Amboseli', rating: '4.8', price: '$750', img: 'https://images.unsplash.com/photo-1499696803328-39327318712f?auto=format&fit=crop&q=80&w=600' },
      { name: 'Amboseli Serena Safari Lodge', rating: '4.5', price: '$400', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    ],
    logistics: {
      gettingThere: {
        air: 'Scheduled flights from Nairobi (Wilson Airport) and Mombasa/Diani.',
        road: 'About 215km (4 hours) southeast of Nairobi via Emali.',
      },
      bestTime: {
        peak: { label: 'June — October', desc: 'Dry season. Best general wildlife viewing as animals gather at marshes.' },
        offPeak: { label: 'November — May', desc: 'Wet season. Park is at its scenic best, dust-free skies for Kilimanjaro views, and excellent birding.' },
      },
      fees: {
        adult: '$80 / day',
        child: '$40 / day',
        note: 'Malaria is present, especially during rainy seasons. Dust can reduce visibility during dry months.',
      }
    }
  },
  'nairobi-np': {
    id: 'nairobi-np',
    name: 'Nairobi National Park',
    location: 'Nairobi, Kenya',
    subtitle: "Unspoiled savannah in the shadow of the concrete jungle.",
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920',
    stats: {
      area: '117 km²',
      established: '1946',
      bigFive: '4 of 5 (No Elephants)',
      unesco: 'No',
    },
    overview: {
      description: "There's nowhere quite like Nairobi National Park, with incredible animals roaming free against a backdrop of city skyscrapers. It's an easy day or half-day trip from the capital.",
      history: "Kenya's first national park, established in 1946. It played a crucial role in the country's conservation history.",
      geography: "A sampler of Kenya's safari landscapes: dry woodland, open savannah panorama, waterholes, riverine woodlands, and rolling grasslands.",
      funFacts: "It is the only national park in the world that borders a capital city. You can photograph lions with skyscrapers in the background.",
      mainFeature: {
        title: 'Rhinos & City Skyline',
        description: "Among the best places in Kenya to see rhinos, with a high density of black rhinos and white rhinos often seen grazing on the open plains.",
        image: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=600',
      }
    },
    wildlife: [
      { name: 'Black Rhino', desc: 'A high density makes this a great place to spot them', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=400' },
      { name: 'White Rhino', desc: 'Often seen grazing openly on the plains', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=400' },
      { name: 'Lion', desc: 'Commonly seen, sometimes with the city skyline behind them', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Giraffe', desc: 'Masai giraffe are common throughout the park', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=400' },
      { name: 'Buffalo', desc: 'Commonly encountered on a half-day trip', img: 'https://images.unsplash.com/photo-1551491707-ed5566fb36ee?auto=format&fit=crop&q=80&w=400' },
      { name: 'Ostrich', desc: 'Commonly seen striding across the grasslands', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=400' },
    ],
    activities: [
      { title: 'Game Drives', iconName: 'Compass', desc: 'Guided or self-guided drives. Perfect for a half-day trip.' },
      { title: 'Bird Watching', iconName: 'Bird', desc: 'First-rate birding with over 520 species recorded.' },
      { title: 'Night Drives', iconName: 'Moon', desc: 'Offered by specific operators like Tribe Hotel.' },
      { title: 'Animal Orphanages', iconName: 'Heart', desc: 'Visit the David Sheldrick Wildlife Trust (elephants) on the park perimeter.' },
    ],
    lodges: [
      { name: 'The Emakoko', rating: '4.9', price: '$800', img: 'https://images.unsplash.com/photo-1518182170546-076616fdca44?auto=format&fit=crop&q=80&w=600' },
      { name: 'Nairobi Tented Camp', rating: '4.6', price: '$450', img: 'https://images.unsplash.com/photo-1499696803328-39327318712f?auto=format&fit=crop&q=80&w=600' },
      { name: 'Ololo Safari Lodge', rating: '4.8', price: '$600', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    ],
    logistics: {
      gettingThere: {
        air: 'Fly into Jomo Kenyatta International Airport (NBO), which borders the park.',
        road: 'Just 7km south of Nairobi city center. Very easy access.',
      },
      bestTime: {
        peak: { label: 'June — October', desc: 'Dry season. Best for general wildlife viewing as animals gather near water.' },
        offPeak: { label: 'November — May', desc: 'Wet season. Dust-free skies, green park, and excellent birding with migrants.' },
      },
      fees: {
        adult: '$43 / day',
        child: '$22 / day',
        note: 'Proximity to the city means it lacks deep wilderness appeal, but offers incredible convenience.',
      }
    }
  },
  'bwindi': {
    id: 'bwindi',
    name: 'Bwindi Impenetrable Forest',
    location: 'Kanungu District, Uganda',
    subtitle: "Home to half the world's mountain gorillas. A pristine, ancient rainforest.",
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920',
    stats: {
      area: '321 km²',
      established: '1991',
      bigFive: 'No',
      unesco: 'World Heritage Site',
    },
    overview: {
      description: "Bwindi Impenetrable National Park is located in southwestern Uganda. The park is part of the Bwindi Impenetrable Forest and is situated along the Democratic Republic of the Congo border next to the Virunga National Park and on the edge of the Albertine Rift.",
      history: "Established in 1991, it was designated a UNESCO World Heritage Site in 1994 because of its ecological importance and biodiversity.",
      geography: "Composed of 321 square kilometres of both montane and lowland forest, it is accessible only on foot.",
      funFacts: "The forest is one of the most biologically diverse areas on Earth, where half the world's population of the highly endangered mountain gorillas live.",
      mainFeature: {
        title: 'Mountain Gorillas',
        description: "Bwindi is best known for its outstanding gorilla tracking. It is home to roughly half of the world's mountain gorillas, with several habituated groups that can be visited.",
        image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=600',
      }
    },
    wildlife: [
      { name: 'Mountain Gorilla', desc: 'Over 400 individuals in the park', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Chimpanzee', desc: 'Present but rarely seen', img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=400' },
      { name: 'Forest Elephant', desc: 'Smaller than savannah elephants', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400' },
      { name: 'LHoests Monkey', desc: 'Endemic to the Albertine Rift', img: 'https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=400' },
      { name: 'African Golden Cat', desc: 'Elusive forest predator', img: 'https://images.unsplash.com/photo-1551491707-ed5566fb36ee?auto=format&fit=crop&q=80&w=400' },
      { name: 'Turaco', desc: 'Beautiful forest birds', img: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?auto=format&fit=crop&q=80&w=400' },
    ],
    activities: [
      { title: 'Gorilla Trekking', iconName: 'Compass', desc: 'The main attraction. Trek through dense forest to spend an hour with a gorilla family.' },
      { title: 'Bird Watching', iconName: 'Bird', desc: 'Over 350 bird species, including 23 Albertine Rift endemics.' },
      { title: 'Nature Walks', iconName: 'Leaf', desc: 'Explore the forest trails to waterfalls and scenic viewpoints.' },
      { title: 'Cultural Tours', iconName: 'Users', desc: 'Visit the local Batwa community to learn about their forest heritage.' },
    ],
    lodges: [
      { name: 'Sanctuary Gorilla Forest Camp', rating: '4.9', price: '$1,200', img: 'https://images.unsplash.com/photo-1518182170546-076616fdca44?auto=format&fit=crop&q=80&w=600' },
      { name: 'Buhoma Lodge', rating: '4.8', price: '$800', img: 'https://images.unsplash.com/photo-1499696803328-39327318712f?auto=format&fit=crop&q=80&w=600' },
      { name: 'Clouds Mountain Gorilla Lodge', rating: '5.0', price: '$1,500', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    ],
    logistics: {
      gettingThere: {
        air: 'Flights from Entebbe to Kihihi or Kisoro airstrips.',
        road: '8-10 hour drive from Kampala or Entebbe. 4x4 required.'
      },
      bestTime: {
        peak: { label: 'June — August', desc: 'Dry season. Trails are less slippery and trekking is easier.' },
        offPeak: { label: 'March — May', desc: 'Heavy rains. Trails can be muddy, but permits are sometimes discounted.' },
      },
      fees: {
        adult: '$800 / permit',
        child: 'N/A (Minimum age 15)',
        note: 'Gorilla trekking permits must be booked well in advance. Park entry fee is $40/day if not trekking.',
      }
    }
  }
};
