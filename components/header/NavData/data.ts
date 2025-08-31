import { NavigationItem } from "./type";

export const navigationData: NavigationItem[] = [
  {
    id: "trek",
    label: "Trek",
    icon: "PersonSimpleHike",
    slug: "/trek",
    dropdownItems: [
      {
        id: "annapurna-north-base-camp",
        label: "Annapurna North Base Camp Trek",
        slug: "/trek/annapurna-north-base-camp",
        description:
          "The Annapurna Base Camp and Mardi Himal Trek combine two iconic routes, offering breathtaking mountain vistas and natural beauty. Starting with Annapurna Base Camp, the journey continues to Mardi Himal, beginning with a drive to Syauli Bazar and trekking via Ghandruk.",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
      {
        id: "mardi-himal-trek",
        label: "Mardi Himal Trek",
        slug: "/trek/mardi-himal",
        description:
          "A relatively new and less crowded trekking route that offers stunning views of Annapurna, Dhaulagiri, and Machhapuchhre. Perfect for those seeking solitude in the mountains.",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
      {
        id: "annapurna-base-camp-poon-hill",
        label: "Annapurna Base Camp Trek via Poon Hill",
        slug: "/trek/annapurna-base-camp-poon-hill",
        description:
          "Classic trek combining the famous Poon Hill sunrise viewpoint with the spectacular Annapurna Base Camp. Experience diverse landscapes and rich cultural encounters.",
        image:
          "https://images.unsplash.com/photo-1486022101316-cecf8ac2b209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
      {
        id: "annapurna-luxury-lodge-trek",
        label: "Annapurna Luxury Lodge Trek",
        slug: "/trek/annapurna-luxury-lodge",
        description:
          "Experience the Annapurna region in comfort with premium lodge accommodations, gourmet meals, and exceptional service while enjoying the same stunning mountain views.",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
      {
        id: "everest-base-camp-trek",
        label: "Everest Base Camp Trek",
        slug: "/trek/everest-base-camp",
        description:
          "The ultimate trekking adventure to the base of the world's highest mountain. Experience Sherpa culture, Buddhist monasteries, and breathtaking Himalayan scenery.",
        image:
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
      {
        id: "manaslu-circuit-trek",
        label: "Manaslu Circuit Trek",
        slug: "/trek/manaslu-circuit",
        description:
          "Remote and challenging trek around the eighth highest mountain in the world. Experience authentic mountain culture and pristine wilderness.",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
      {
        id: "north-abc-ghorepani",
        label: "North ABC Trek via Ghorepani",
        slug: "/trek/north-abc-ghorepani",
        description:
          "Alternative route to Annapurna Base Camp starting from the famous Ghorepani village, offering diverse ethnic communities and spectacular mountain panoramas.",
        image:
          "https://images.unsplash.com/photo-1464822759844-d150f1043097?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      },
    ],
  },
  {
    id: "tour",
    label: "Tour",
    icon: "Mountains",
    slug: "/tour",
    dropdownItems: [
      {
        id: "cultural-heritage-tour",
        label: "Cultural Heritage Tour",
        slug: "/tour/cultural-heritage",
        description: "Explore Nepal's rich cultural heritage",
      },
      {
        id: "kathmandu-valley-tour",
        label: "Kathmandu Valley Tour",
        slug: "/tour/kathmandu-valley",
        description: "Discover ancient temples and palaces",
      },
      {
        id: "pokhara-city-tour",
        label: "Pokhara City Tour",
        slug: "/tour/pokhara-city",
        description: "Beautiful lakeside city tour",
      },
      {
        id: "lumbini-pilgrimage",
        label: "Lumbini Pilgrimage",
        slug: "/tour/lumbini-pilgrimage",
        description: "Birthplace of Lord Buddha",
      },
      {
        id: "bhaktapur-tour",
        label: "Bhaktapur Tour",
        slug: "/tour/bhaktapur",
        description: "Medieval city of rich culture",
      },
      {
        id: "bandipur-tour",
        label: "Bandipur Tour",
        slug: "/tour/bandipur",
        description: "Preserved Newari town experience",
      },
    ],
  },
  {
    id: "activities",
    label: "Activities",
    icon: "PersonSimpleTaiChi",
    slug: "/activities",
    dropdownItems: [
      {
        id: "rock-climbing",
        label: "Rock Climbing",
        slug: "/activities/rock-climbing",
        description:
          "The Annapurna Base Camp and Mardi Himal Trek combine two iconic routes, offering breathtaking mountain vistas and natural beauty. Starting with Annapurna Base Camp, the journey continues to Mardi Himal, beginning with a drive to Syauli Bazar and trekking via Ghandruk.",
      },
      {
        id: "paragliding",
        label: "Paragliding",
        slug: "/activities/paragliding",
        description: "Soar above the Himalayas",
      },
      {
        id: "river-rafting",
        label: "River Rafting",
        slug: "/activities/river-rafting",
        description: "White water rafting adventures",
      },
      {
        id: "bungee-jumping",
        label: "Bungee Jumping",
        slug: "/activities/bungee-jumping",
        description: "Ultimate adrenaline rush",
      },
      {
        id: "zip-lining",
        label: "Zip Lining",
        slug: "/activities/zip-lining",
        description: "Fly through the forest canopy",
      },
      {
        id: "mountain-biking",
        label: "Mountain Biking",
        slug: "/activities/mountain-biking",
        description: "Explore trails on two wheels",
      },
      {
        id: "canyoning",
        label: "Canyoning",
        slug: "/activities/canyoning",
        description: "Navigate through canyon systems",
      },
    ],
  },
  {
    id: "departures",
    label: "Departures",
    icon: "AirplaneTakeoff",
    slug: "/departures",
  },
  {
    id: "car-rental",
    label: "Car Rental",
    icon: "Jeep",
    slug: "/car-rental",
  },
];
