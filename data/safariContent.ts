
export type SafariCategory = 'country' | 'park' | 'type' | 'all';

export interface SafariSEOContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  faqs: { question: string; answer: string }[];
}

export const safariContent: Record<string, SafariSEOContent> = {
  // Default / Fallback
  'default': {
    title: "Luxury African Safaris",
    subtitle: "Explore the Untold Wild",
    description: "Discover the world's most breathtaking wildlife experiences. From the migration of the Serengeti to the water channels of the Okavango, we curate expeditions that transform.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000",
    faqs: [
        { question: "What is the best time to go on safari?", answer: "Generally, the dry season (June to October) is best for wildlife viewing as animals congregate around water sources." },
        { question: "Is it safe?", answer: "Yes, when booking with verified operators who follow strict safety protocols and use experienced guides." }
    ]
  },
  
  // Countries
  'botswana': {
    title: "Botswana Safaris",
    subtitle: "The Jewel of the Kalahari",
    description: "Home to the Okavango Delta and the largest elephant population in Africa. Botswana offers a high-end, low-volume tourism model ensuring exclusive wildlife encounters.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Why choose Botswana?", answer: "Botswana offers some of the most exclusive and pristine wilderness areas in Africa, specifically the Okavango Delta." },
      { question: "Do I need a visa?", answer: "Citizens of the US, UK, and EU generally do not need a visa for stays up to 90 days." }
    ]
  },
  'kenya': {
    title: "Kenya Safaris",
    subtitle: "The Original Safari Destination",
    description: "Witness the Great Migration in the Masai Mara, gaze at Kilimanjaro from Amboseli, and explore the diverse landscapes of the Great Rift Valley.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { 
        question: "When is the best time to visit Kenya?", 
        answer: "June to October is an excellent time for Kenya tours. During these months, the weather is generally dry (although it can get really hot in October and at the tail end of September) and most trails are open. This also coincides with the wildebeest and zebra migration in the Masai Mara National Reserve. This is the Dry season, and as it progresses, water sources for animals tend to dry up and become fewer, drawing animals in numbers to those that remain. One downside is that high-season prices apply during the Dry season months. Crowds are also larger – in some parks, the queue of safari vehicles can take away something from your experience, and some areas of the Masai Mara can be completely overwhelmed with vehicles during the migration. In the Dry season, June is one of my favorite months to visit. Visiting from November to February also has its devotees. At this time, migrating birds arrive, the rains rarely disrupt travel, and the country is transformed into a lovely shade of green. Most travelers avoid March to May because heavy rains are always possible and can transform safari trails into muddy bogs. That said, prices are lower and I visited once in April and was lucky to find very few other visitors (except for local visitors around Easter) and clear skies." 
      },
      { 
        question: "Why visit Kenya? What are the major attractions?", 
        answer: "Outstanding wildlife is the main reason to visit Kenya. While many visitors come for the migration, Kenya is excellent year-round, with a large number of world-class national parks – apart from the Masai Mara, there’s Amboseli, Lake Nakuru, Meru, Tsavo East and Tsavo West National Parks and Samburu National Reserve – where superb wildlife viewing is almost guaranteed. It all adds up to Kenyan safari possibilities of great variety. Kenya is Big Five territory, with healthy populations of elephant, buffalo, lion, leopard and rhino, but the birdlife is also outstanding, as is the cultural element – this is the land of the Maasai, Samburu, Turkana and others. The sheer number of habitats, too, make for wonderful scenery – endless horizons in the Masai Mara, tropical forests in Kakamega Forest National Reserve, the starkly beautiful parks of the north, and peerless Kilimanjaro views from Amboseli." 
      },
      { 
        question: "What does a Kenyan safari cost?", 
        answer: "It all depends on what sort of safari you want and can afford. Kenya has more variety than most other African safari destinations, with excellent options from the lower end of the pricing scale (from US$200 per person per day) to luxury Kenya safaris (up to US$1,000). While accommodation is partly what will determine the price for many travelers, it can also depend on how you wish to travel between the various parks. Air transfers, usually via Nairobi, can be expensive, but dramatically reduce the amount of time you’ll spend on the road, thereby maximizing the amount of time you’ll get to spend in the parks themselves. Remember also that most Kenya safari packages will include transport, accommodation, all meals and activities (including game drives)." 
      },
      { 
        question: "How is the wildlife viewing?", 
        answer: "It can vary from park to park. Most of the more popular parks that you can visit on a Kenya tour – Amboseli, Masai Mara, Samburu and Lake Nakuru – have fabulous wildlife-viewing opportunities. Dense wildlife populations in all of these parks make them good all-round safari destinations that enable you to see as many animals (and different species) as you can in a short period of time. Meru NP offers a wilder experience with fewer visitors but much the same wildlife. Other parks are more specialist – such as the birds and primates of Kakamega, and the sitatunga in Saiwa Swamp National Park – allowing you to tick off a hard-to-find species, usually without the crowds. And a more exclusive Kenyan safari experience is possible in the conservancies of Laikipia Plateau – you pay more, but, with the exception of Ol Pejeta Conservancy, crowds are non-existent and wildlife viewing is excellent. At most of these conservancies, you can get off-road as well, meaning that you’ll get a lot closer to the animals than you will in a national park." 
      },
      { 
        question: "How safe is Kenya for tourists?", 
        answer: "For the most part, a Kenya safari is safe, but there are some important things to know. Nairobi and, to a lesser extent, some other Kenyan cities have a reputation for violent crime. I’ve spent a significant amount of time in Nairobi and elsewhere and have never once had a problem, but it does happen often enough to mean that you should always be careful and follow local advice when it comes to these cities. Another potential danger comes from traveling on the country’s roads – the accident rate is extremely high. You can minimize the danger by spending as little time as you can in Nairobi and other cities (in any case, Kenya’s charm rarely resides in its major urban centers), by never traveling at night and by flying between the parks. The danger from wild animals is minimal; most Kenya safari trips and operators have excellent safety records, and you should be fine if you follow the safety briefings and instructions from guides." 
      },
      { 
        question: "How do I select a reliable tour operator for a Kenyan safari?", 
        answer: "The best way to choose a Kenya safari is to read all about the safari experiences of other travelers at SafariBookings.com – chances are that their reviews will answer many of your questions (before you’ve asked them), as well as speak to the professionalism of the various operators with whom they’ve traveled. Otherwise, it’s extremely important that you contact any tour companies with whom you are considering traveling before you make a booking, and ask any questions you may have. This could be anything from the mode of transport, frequency of meals or daily safari schedules to the languages spoken by your guide or how many other travelers will be in your vehicle. Be as specific as you can. Not all operators offer customized Kenya tours, it’s true, but there’s no substitute for being informed. The operator’s willingness to answer questions can be a good guide to their dealings with people on safari." 
      },
      { 
        question: "What type of accommodation can I expect?", 
        answer: "As a general rule, the higher your Kenya safari prices, the better you can expect your accommodation to be. At the lower end, campsites are usually basic, sometimes crowded and not always in the best locations within the national parks or reserves, but they are well priced and often have ample facilities such as showers and toilets. Lodges are the mainstays of the Kenya safari scene and the quality varies considerably. Many lodges within the reserves and national parks have excellent locations but are aging and in need of renovation, while others are luxurious and recently overhauled. In tented camps, including mobile camps, you’ll sleep in large, walk-in tents – they’re like lodge rooms in terms of size but with canvas for walls and floor. Canvas tents mean that you can hear the sounds of the African night. Hopefully you won’t hear the sounds of your neighboring guests if the tents are nicely spaced. Most lodge rooms and tents of this kind have comfortable (not camp) beds, sometimes a desk and usually a private bathroom; some even have an outdoor shower with no roof but walls that protect your modesty. Particularly in tented camps, you’ll most likely need to recharge your devices not in your room but at a power station in the main public area." 
      },
      { 
        question: "What can I expect from a safari in Kenya?", 
        answer: "Most days out on safari begin with a quiet African voice waking you well before sunrise. After dressing quickly, and having a coffee or tea, you head out for a few hours in a safari vehicle (with other guests, a driver, guide and sometimes a tracker) looking for wildlife – this time, and the last hours before sunset, are ideal for viewing wildlife. You’ll return to the lodge or camp mid- to late morning for a proper sit-down breakfast. A few hours of relaxation, followed by lunch, then a few hours more doing very little occupies the hottest part of the day, when even animals retreat into the shade. Afternoon tea, often known as High Tea in a nod to colonial-era safari traditions, happens around 3 PM or 3:30 PM, then it’s back out looking for wildlife until after dark. Just before sunset, you’ll stop for another safari institution, the ‘Sundowner’, when you’ll watch the sunset while nursing the drink of your choice. You arrive back in camp in time to freshen up, then it’s dinner and off to bed, before it all starts again very early the next morning." 
      }
    ]
  },
  'tanzania': {
    title: "Tanzania Safaris",
    subtitle: "Land of the Serengeti",
    description: "From the endless plains of the Serengeti to the Ngorongoro Crater and the beaches of Zanzibar, Tanzania offers the ultimate bush-to-beach experience.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Can I climb Kilimanjaro?", answer: "Yes, many travelers combine a safari with a 5-7 day trek up Mount Kilimanjaro." },
      { question: "What is the Ngorongoro Crater?", answer: "It is the world's largest inactive volcanic caldera and a haven for the Big Five." }
    ]
  },
   'south-africa': {
    title: "South Africa Safaris",
    subtitle: "A World in One Country",
    description: "Perfect for first-timers and families. Enjoy malaria-free reserves, the famous Kruger National Park, and cosmopolitan Cape Town.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000",
    faqs: [
       { question: "Is it malaria-free?", answer: "Several reserves like Madikwe and Pilanesberg are malaria-free, making them ideal for families." }
    ]
  },
  // Add entries for Ethiopia, Namibia, Rwanda, Uganda, Zambia, Zimbabwe similarly...

  // Parks
  'kruger': {
    title: "Kruger National Park",
    subtitle: "The Titan of Game Reserves",
    description: "One of Africa's largest game reserves. Its high density of wild animals includes the Big 5: lions, leopards, rhinos, elephants and buffalos.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Self-drive or guided?", answer: "Kruger is unique in allowing self-drive safaris, though guided drives in private concessions offer better off-road access." }
    ]
  },
  'masai-mara': {
    title: "Masai Mara National Reserve",
    subtitle: "Theater of the Wild",
    description: "Kenya's flagship conservation area. Famous for exceptional population of lions, leopards and cheetahs, and the annual migration of zebra, Thomson's gazelle, and wildebeest.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Where should I stay?", answer: "The Mara Triangle and private conservancies offer lower crowd densities than the main reserve." }
    ]
  },
  'lake-nakuru': {
    title: "Lake Nakuru National Park",
    subtitle: "A Breathtaking Rift Valley Soda Lake",
    description: "Kenya's most popular national park, famous for its rhinos and flamingos. A fantastic place to see tree-climbing lions and leopards.",
    image: "https://images.unsplash.com/photo-1534759863358-796a7a0f49c6?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Are there flamingos?", answer: "Yes, though numbers fluctuate with water levels. It's still a world-class birding destination." }
    ]
  },
  'amboseli': {
    title: "Amboseli National Park",
    subtitle: "In the Shadow of Kilimanjaro",
    description: "Iconic views of Mount Kilimanjaro and massive herds of free-ranging elephants. Real safari magic in the early morning or late afternoon.",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "When is the best time to see Kilimanjaro?", answer: "Early mornings and late afternoons, especially during the wet season when the sky is dust-free." }
    ]
  },
  'nairobi-np': {
    title: "Nairobi National Park",
    subtitle: "Wildlife in the City",
    description: "Unspoiled savannah in the shadow of the concrete jungle. Among the best places in Kenya to see rhinos.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Can I do a half-day trip?", answer: "Yes, its proximity to the city makes it perfect for a quick morning or afternoon safari." }
    ]
  },
  'serengeti': {
    title: "Serengeti National Park",
    subtitle: "Endless Plains",
    description: "Tanzania's oldest and most popular national park, a World Heritage Site and recently proclaimed a 7th Wonder of the World.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Is the Serengeti expensive?", answer: "It commands a premium due to its remoteness and park fees, but budget camping options exist." }
    ]
  },
  'okavango': {
    title: "Okavango Delta",
    subtitle: "Africa's Last Eden",
    description: "A vast inland river delta in northern Botswana. It's known for its sprawling grassy plains, which flood seasonally, becoming a lush animal habitat.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "How do I get there?", answer: "Most lodges are accessible only by light aircraft from Maun." }
    ]
  },
  'bwindi': {
      title: "Bwindi Impenetrable Forest",
      subtitle: "The Ultimate Primate Experience",
      description: "Home to almost half of the world's remaining mountain gorillas. Trekking here is challenging but deeply rewarding.",
      image: "https://images.unsplash.com/photo-1627916298687-8d7655811c78?auto=format&fit=crop&q=80&w=2000",
      faqs: [{question: "How fit do I need to be?", answer: "Moderate to high fitness is recommended due to steep, muddy terrain."}]
  },

  // Types
  'luxury': {
    title: "Luxury Safaris",
    subtitle: "Uncompromising Comfort",
    description: "Experience the wild without sacrificing comfort. Private plunge pools, gourmet dining, and exclusive game drives define the luxury safari.",
    image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "What is included?", answer: "Most luxury lodges are all-inclusive, covering meals, drinks, and activities." }
    ]
  },
  'gorilla-trekking': {
    title: "Gorilla Trekking",
    subtitle: "Face to Face with Giants",
    description: "A once-in-a-lifetime encounter with endangered mountain gorillas in their natural habitat in Uganda or Rwanda.",
    image: "https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Are permits guaranteed?", answer: "No, permits are limited and should be booked 6-12 months in advance." }
    ]
  },
  'honeymoon': {
    title: "Honeymoon Safaris",
    subtitle: "Romance under the Stars",
    description: "Secluded suites, private dinners in the bush, and star beds. The perfect start to your new life together.",
    image: "https://images.unsplash.com/photo-1540306346395-50e50f384a3c?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Can we get a private vehicle?", answer: "Yes, many lodges offer private vehicles for an additional fee or included in honeymoon packages." }
    ]
  },
  'family': {
    title: "Family Safaris",
    subtitle: "Memories for a Lifetime",
    description: "Safe, engaging, and educational adventures designed for all ages. From junior ranger programs to private villas and malaria-free zones.",
    image: "https://images.unsplash.com/photo-1537243983271-e9bf1f271295?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Is it safe for children?", answer: "Yes, we select malaria-free zones and fenced camps specifically for families with younger children." },
      { question: "What activities are there for kids?", answer: "Many lodges offer 'Junior Ranger' programs, bush walks, and cultural activities tailored to children." }
    ]
  },
  'photography': {
    title: "Photo Safaris",
    subtitle: "Capture the Perfect Shot",
    description: "Guided by professional photographers in vehicles equipped with bean bags, charging stations, and 360-degree views. Timing is everything.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=2000",
    faqs: [
      { question: "Do I need my own gear?", answer: "While recommended, some specialized photo safari operators offer lens and camera rentals." },
      { question: "What makes a photo safari different?", answer: "Guides position the vehicle for the best light and angles, often staying longer at sightings than standard tours." }
    ]
  }
};
