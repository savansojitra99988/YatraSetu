export interface Evidence {
  label: string;
  value: string;
  source: string;
  collectedAt: string;
  confidence: 'high' | 'medium' | 'low' | 'unknown';
}

export interface SmartArrivalPoint {
  id: string;
  name: string;
  reason: string;
  walkTime: string;
  facilities: string[];
  distanceToDestinationKm: number;
  accessibilityScore: number;
  parkingAvailable: boolean;
}

export interface SafetyFactor {
  name: string;
  status: 'optimal' | 'moderate' | 'critical' | 'unknown';
  detail: string;
  lastVerified: string;
}

export interface SafetyIndicatorData {
  level: 'High' | 'Medium' | 'Caution' | 'Advisory';
  score: number;
  routeConditions: string;
  networkConnectivity: '4G/5G Solid' | 'Spotty 3G/2G' | 'Zero Connectivity';
  nearestHospitalKm: number;
  nearestPoliceKm: number;
  nearestMechanicKm: number;
  nearestFuelKm: number;
  confidence: 'high' | 'medium' | 'estimated';
  lastUpdated: string;
  factors: SafetyFactor[];
}

export interface VehicleRentalOption {
  id: string;
  type: 'Bike' | 'Scooter' | 'SUV (4x4)' | 'Sedan' | 'Electric Rickshaw';
  model: string;
  provider: string;
  isVerified: boolean;
  dailyRateInr: number;
  suitableTerrain: string[];
  capacity: number;
  transmission: 'Manual' | 'Automatic';
  pickupLocation: string;
  rating: number;
}

export interface Mechanic {
  id: string;
  name: string;
  shopName: string;
  isVerified: boolean;
  distanceKm: number;
  isAvailable: boolean;
  supportedVehicles: ('Bike' | 'Car' | 'SUV' | 'General')[];
  estimatedChargeInr: number;
  contactNumber: string;
  location: string;
  specialty: string;
}

export interface VerifiedStay {
  id: string;
  name: string;
  type: 'Heritage Homestay' | 'Eco Resort' | 'Local Guesthouse' | 'Boutique Hotel';
  hostName: string;
  isVerifiedHost: boolean;
  verificationBadge: 'Government Verified' | 'Community Certified' | 'Eco-Certified';
  pricePerNightInr: number;
  priceHistory: { month: string; price: number }[];
  sustainabilityRating: number;
  auditHash: string;
  reviewCount: number;
  averageRating: number;
  reviews: {
    id: string;
    author: string;
    stayVerified: boolean;
    date: string;
    comment: string;
    rating: number;
    hashProof: string;
  }[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  category: string;
  tags: string[];
  crowdLevel: 'quiet' | 'moderate' | 'heavy';
  isOpen: boolean;
  isAccessible: boolean;
  isRemoteArea: boolean;
  suitabilityNote: string;
  coordinates: { lat: number; lng: number };
  evidence: Evidence[];
  arrivalPoint: SmartArrivalPoint;
  safety: SafetyIndicatorData;
  rentals: VehicleRentalOption[];
  mechanics: Mechanic[];
  verifiedStays: VerifiedStay[];
  experienceArchetype: {
    peaceScore: number;
    heritageScore: number;
    natureScore: number;
    adventureScore: number;
    photoScore: number;
  };
  sustainability: {
    currentFootfallPressure: 'Low' | 'Moderate' | 'Severe (Overcapacity)';
    decongestionPriority: 'High' | 'Medium' | 'Low';
    localEconomyIndex: number;
    rewardPointsMultiplier: number;
  };
}

export interface TravellerProfile {
  experienceIntent: string;
  budget: 'value' | 'comfortable' | 'flexible';
  travelDates: string;
  partySize: number;
  crowdPreference: 'quiet' | 'balanced' | 'lively';
  pace: 'slow' | 'balanced' | 'fast';
  accessibilityNeeded: boolean;
  transportPreference: 'self-drive' | 'public' | 'chauffeur' | 'mixed';
}

export const INITIAL_TRAVELLER_PROFILE: TravellerProfile = {
  experienceIntent: 'peaceful heritage photography & authentic village craft',
  budget: 'comfortable',
  travelDates: '14–18 Nov 2026',
  partySize: 2,
  crowdPreference: 'quiet',
  pace: 'slow',
  accessibilityNeeded: false,
  transportPreference: 'self-drive',
};

export const SEED_DESTINATIONS: Destination[] = [
  {
    id: 'ahmedabad-old-city',
    name: 'Ahmedabad UNESCO Living Heritage',
    region: 'Ahmedabad Urban',
    category: 'Living Heritage & Architecture',
    tags: ['heritage', 'architecture', 'photography', 'food', 'culture', 'lively'],
    crowdLevel: 'heavy',
    isOpen: true,
    isAccessible: true,
    isRemoteArea: false,
    suitabilityNote: 'High visitor density in narrow pol alleys. Early dawn slots preserve intent, but midday crowds create high friction for quiet photography.',
    coordinates: { lat: 23.0225, lng: 72.5714 },
    evidence: [
      { label: 'Real-time Footfall', value: 'High visitor density (85% peak capacity)', source: 'Smart City Sensor Feed', collectedAt: 'Live (15m ago)', confidence: 'high' },
      { label: 'Heritage Site Status', value: 'Open & operational with normal ticket windows', source: 'Archaeological Survey Desk', collectedAt: 'Today 08:00', confidence: 'high' },
      { label: 'Microclimate', value: '34°C, Sunny with humid afternoon peak', source: 'Regional Weather Station', collectedAt: 'Today 09:30', confidence: 'high' },
      { label: 'Pol Navigation', value: 'Restricted vehicular movement; pedestrian only', source: 'Traffic Police Advisory', collectedAt: 'Live', confidence: 'high' },
    ],
    arrivalPoint: {
      id: 'swaminarayan-arrival',
      name: 'Kalupur Swaminarayan Mandir Mobility Hub',
      reason: 'Bypasses narrow congested lanes with organized EV e-rickshaw stands, luggage cloakrooms, and verified guide counters.',
      walkTime: '6 min walk to main pol cluster',
      facilities: ['Verified Guide Desk', 'EV Charging', 'Cloakroom', 'Clean Restrooms', 'Emergency Kiosk'],
      distanceToDestinationKm: 0.4,
      accessibilityScore: 88,
      parkingAvailable: true,
    },
    safety: {
      level: 'High',
      score: 92,
      routeConditions: 'Urban paved roads with heavy morning scooter traffic',
      networkConnectivity: '4G/5G Solid',
      nearestHospitalKm: 1.2,
      nearestPoliceKm: 0.5,
      nearestMechanicKm: 0.3,
      nearestFuelKm: 1.0,
      confidence: 'high',
      lastUpdated: '10 mins ago',
      factors: [
        { name: 'Pedestrian Alley Congestion', status: 'moderate', detail: 'Dense two-wheeler flow during market hours', lastVerified: 'Today 10:00' },
        { name: 'Emergency Medical Transit Access', status: 'optimal', detail: 'Ambulance bike access available inside core pols', lastVerified: 'Today 08:00' },
        { name: 'Tourist Police Station Proximity', status: 'optimal', detail: 'Heritage Beat Police located at entrance', lastVerified: 'Today 09:00' },
      ],
    },
    rentals: [
      {
        id: 'rent-ev-scooter-1',
        type: 'Scooter',
        model: 'Ather 450X EV (Compact Pol Nav)',
        provider: 'Gujarat Green Wheels',
        isVerified: true,
        dailyRateInr: 650,
        suitableTerrain: ['Urban', 'Narrow Alleys', 'Paved'],
        capacity: 2,
        transmission: 'Automatic',
        pickupLocation: 'Kalupur Mobility Hub',
        rating: 4.8,
      },
      {
        id: 'rent-car-sedan-1',
        type: 'Sedan',
        model: 'Tata Tigor EV',
        provider: 'Ahmedabad Eco Cabs',
        isVerified: true,
        dailyRateInr: 1800,
        suitableTerrain: ['Urban Highway', 'Paved'],
        capacity: 4,
        transmission: 'Automatic',
        pickupLocation: 'Railway Station West Gate',
        rating: 4.6,
      },
    ],
    mechanics: [
      {
        id: 'mech-1',
        name: 'Ramesh Two-Wheeler Clinic',
        shopName: 'Ramesh Auto Care (Verified Heritage Partner)',
        isVerified: true,
        distanceKm: 0.4,
        isAvailable: true,
        supportedVehicles: ['Bike', 'General'],
        estimatedChargeInr: 250,
        contactNumber: '+91 98250 11234',
        location: 'Near Relief Road Cross',
        specialty: 'EV diagnostics & tire punctures in narrow pols',
      },
      {
        id: 'mech-2',
        name: 'Ahmedabad City Auto Help',
        shopName: 'City Central Quick Garage',
        isVerified: true,
        distanceKm: 1.1,
        isAvailable: true,
        supportedVehicles: ['Car', 'SUV', 'Bike'],
        estimatedChargeInr: 500,
        contactNumber: '+91 98790 99881',
        location: 'Income Tax Circle',
        specialty: 'Towing & battery jump start',
      },
    ],
    verifiedStays: [
      {
        id: 'stay-ahmedabad-french-haveli',
        name: 'The French Haveli Heritage Homestay',
        type: 'Heritage Homestay',
        hostName: 'Krupa Patel (Registered Artisan Host)',
        isVerifiedHost: true,
        verificationBadge: 'Government Verified',
        pricePerNightInr: 4200,
        priceHistory: [
          { month: 'Jul', price: 3400 },
          { month: 'Aug', price: 3500 },
          { month: 'Sep', price: 3800 },
          { month: 'Oct', price: 4200 },
        ],
        sustainabilityRating: 94,
        auditHash: '0x8f2d93e1a7b4c239d56ef124890',
        reviewCount: 42,
        averageRating: 4.9,
        reviews: [
          {
            id: 'rev-1',
            author: 'Arjun K., Mumbai (Verified Stay #YS-9921)',
            stayVerified: true,
            date: '3 days ago',
            comment: 'Authentic 150-yr courtyard. Host arranged dawn pol walk before tourist groups arrived.',
            rating: 5,
            hashProof: 'SHA256:4b10c9...2a9',
          },
        ],
      },
    ],
    experienceArchetype: {
      peaceScore: 35,
      heritageScore: 98,
      natureScore: 10,
      adventureScore: 25,
      photoScore: 90,
    },
    sustainability: {
      currentFootfallPressure: 'Severe (Overcapacity)',
      decongestionPriority: 'High',
      localEconomyIndex: 88,
      rewardPointsMultiplier: 1.0,
    },
  },
  {
    id: 'polo-forest-sabarkantha',
    name: 'Polo Ancient Forest & Temples',
    region: 'Sabarkantha Foothills',
    category: 'Remote Forest Ruins & Nature',
    tags: ['nature', 'heritage', 'photography', 'quiet', 'adventure', 'remote'],
    crowdLevel: 'quiet',
    isOpen: true,
    isAccessible: false,
    isRemoteArea: true,
    suitabilityNote: 'Unspoiled 10th-century stone ruins enveloped by teak forest. Perfect alignment with quiet photography and heritage intent.',
    coordinates: { lat: 23.9678, lng: 73.2845 },
    evidence: [
      { label: 'Crowd Outlook', value: 'Very low (12% of weekend capacity on weekdays)', source: 'Forest Ranger Gate Log', collectedAt: 'Today 07:30', confidence: 'high' },
      { label: 'Forest Entry Status', value: 'Open with day-pass requirement at Abhapur gate', source: 'Sabarkantha Forest Division', collectedAt: 'Today 08:00', confidence: 'high' },
      { label: 'Cellular Signal', value: 'Spotty 2G / No connectivity 3km past Harnav River', source: 'Crowd Network Logs', collectedAt: 'Yesterday 18:00', confidence: 'medium' },
      { label: 'Weather & Streams', value: 'Clear canopy, Harnav river fordable by foot', source: 'Eco-Camp Observer', collectedAt: 'Today 06:45', confidence: 'high' },
    ],
    arrivalPoint: {
      id: 'abhapur-approach',
      name: 'Abhapur Eco-Checkpost & Last Service Node',
      reason: 'Crucial staging point: last dependable fuel pump, offline map terminal, safe parking, and registered tribal eco-guide station before the zero-connectivity forest belt.',
      walkTime: '12 min shaded nature trail to Sun Temple ruins',
      facilities: ['Offline Pack Terminal', 'First Aid Post', 'Drinking Water Refill', 'Certified Guide Station', 'Last Fuel Pump'],
      distanceToDestinationKm: 1.4,
      accessibilityScore: 45,
      parkingAvailable: true,
    },
    safety: {
      level: 'Caution',
      score: 74,
      routeConditions: 'Paved state highway till Idar, followed by 18km of winding forest tarmac with no streetlights',
      networkConnectivity: 'Spotty 3G/2G',
      nearestHospitalKm: 24,
      nearestPoliceKm: 16,
      nearestMechanicKm: 11,
      nearestFuelKm: 8,
      confidence: 'high',
      lastUpdated: '35 mins ago',
      factors: [
        { name: 'Remote Area Factor', status: 'critical', detail: 'Strict 18:00 forest exit curfew; no lighting or signal past Abhapur', lastVerified: 'Today 07:00' },
        { name: 'Emergency Support Proximity', status: 'moderate', detail: 'Forest outpost ambulance station on standby at Vijaynagar (14km)', lastVerified: 'Today 08:00' },
        { name: 'Mobile Data Availability', status: 'critical', detail: 'Zero mobile data in inner temple valley. Offline pack mandatory.', lastVerified: 'Today 09:00' },
      ],
    },
    rentals: [
      {
        id: 'rent-suv-4x4',
        type: 'SUV (4x4)',
        model: 'Mahindra Thar 4x4 (Forest Grade)',
        provider: 'North Gujarat Adventure Rentals',
        isVerified: true,
        dailyRateInr: 3200,
        suitableTerrain: ['Forest Trails', 'Riverbed Fords', 'Gravel'],
        capacity: 4,
        transmission: 'Manual',
        pickupLocation: 'Himmatnagar Junction / Abhapur Node',
        rating: 4.9,
      },
      {
        id: 'rent-bike-adventure',
        type: 'Bike',
        model: 'Royal Enfield Himalayan 450',
        provider: 'Aravalli Moto Expeditions',
        isVerified: true,
        dailyRateInr: 1400,
        suitableTerrain: ['Winding Tarmac', 'Forest Dirt Roads'],
        capacity: 2,
        transmission: 'Manual',
        pickupLocation: 'Idar Highway Hub',
        rating: 4.8,
      },
    ],
    mechanics: [
      {
        id: 'mech-forest-1',
        name: 'Jethabhai Rural Repair Service',
        shopName: 'Jethabhai Tractor & 4x4 Help Post',
        isVerified: true,
        distanceKm: 11.2,
        isAvailable: true,
        supportedVehicles: ['SUV', 'Car', 'Bike', 'General'],
        estimatedChargeInr: 600,
        contactNumber: '+91 94270 44512 (Satellite Radio Relay)',
        location: 'Vijaynagar Forest Cross Road',
        specialty: 'Tire repair, fuel siphon assistance, cooling system flush',
      },
    ],
    verifiedStays: [
      {
        id: 'stay-polo-retreat',
        name: 'Polo Forest Tribal Eco-Camp & Homestay',
        type: 'Eco Resort',
        hostName: 'Bhagwanbhai Gamit (Local Van Samiti Leader)',
        isVerifiedHost: true,
        verificationBadge: 'Eco-Certified',
        pricePerNightInr: 2800,
        priceHistory: [
          { month: 'Jul', price: 2200 },
          { month: 'Aug', price: 2400 },
          { month: 'Sep', price: 2600 },
          { month: 'Oct', price: 2800 },
        ],
        sustainabilityRating: 98,
        auditHash: '0x3c89b7102eef5a88c21900139',
        reviewCount: 29,
        averageRating: 4.9,
        reviews: [
          {
            id: 'rev-polo-1',
            author: 'Dr. Meera S., Bangalore (Verified Trekker)',
            stayVerified: true,
            date: '1 week ago',
            comment: 'Completely off the grid. Solar powered, home-cooked organic Kathiyawadi food, guided temple walk at sunrise.',
            rating: 5,
            hashProof: 'SHA256:7f01e2...89a',
          },
        ],
      },
    ],
    experienceArchetype: {
      peaceScore: 96,
      heritageScore: 92,
      natureScore: 98,
      adventureScore: 78,
      photoScore: 98,
    },
    sustainability: {
      currentFootfallPressure: 'Low',
      decongestionPriority: 'Low',
      localEconomyIndex: 96,
      rewardPointsMultiplier: 2.5,
    },
  },
  {
    id: 'patan-rani-ki-vav',
    name: 'Rani ki Vav Stepwell & Patola Weavers',
    region: 'Patan Heritage Belt',
    category: 'Subterranean Heritage & Textile Arts',
    tags: ['heritage', 'architecture', 'photography', 'craft', 'quiet'],
    crowdLevel: 'moderate',
    isOpen: true,
    isAccessible: false,
    isRemoteArea: false,
    suitabilityNote: 'UNESCO 7-tier stepwell sculpture gallery. Balanced crowds and world-renowned Salvi silk weaving ateliers nearby.',
    coordinates: { lat: 23.8587, lng: 72.1018 },
    evidence: [
      { label: 'Crowd Pressure', value: 'Moderate morning influx, tranquil afternoons', source: 'Patan Tourism Entry Gate', collectedAt: 'Today 09:00', confidence: 'high' },
      { label: 'Heritage Structure', value: 'Lower tiers accessible; top 4 levels open for photography', source: 'ASI Patan Circle', collectedAt: 'Today 08:00', confidence: 'high' },
      { label: 'Artisan Workshop Access', value: 'Salvi Patola Museum active with live masterloom demos', source: 'Weavers Guild Confirmation', collectedAt: 'Today 09:15', confidence: 'high' },
    ],
    arrivalPoint: {
      id: 'patan-visitor-center',
      name: 'Patan UNESCO Green Plaza Arrival Point',
      reason: 'Spacious solar parking area, battery golf cart shuttle for mobility support, filtered cold water stations, and official master weaver directory.',
      walkTime: '4 min paved landscaped pathway',
      facilities: ['Golf Cart Shuttle', 'ASI Audio Guides', 'Clean Restrooms', 'Patola Artisan Directory'],
      distanceToDestinationKm: 0.3,
      accessibilityScore: 72,
      parkingAvailable: true,
    },
    safety: {
      level: 'High',
      score: 89,
      routeConditions: 'Excellent 4-lane Mehsana-Patan highway',
      networkConnectivity: '4G/5G Solid',
      nearestHospitalKm: 3.5,
      nearestPoliceKm: 2.1,
      nearestMechanicKm: 1.2,
      nearestFuelKm: 1.5,
      confidence: 'high',
      lastUpdated: '15 mins ago',
      factors: [
        { name: 'Highway Pavement Quality', status: 'optimal', detail: 'Smooth state express corridor with toll surveillance', lastVerified: 'Today 08:30' },
        { name: 'Monsoon Stepwell Grip', status: 'optimal', detail: 'Non-slip rubber runners installed on high-traffic steps', lastVerified: 'Today 08:00' },
      ],
    },
    rentals: [
      {
        id: 'rent-sedan-patan',
        type: 'Sedan',
        model: 'Hyundai Aura CNG / Petrol',
        provider: 'Patan Heritage Transit',
        isVerified: true,
        dailyRateInr: 1600,
        suitableTerrain: ['Highway', 'Town Roads'],
        capacity: 4,
        transmission: 'Manual',
        pickupLocation: 'Patan Bus Terminus',
        rating: 4.7,
      },
    ],
    mechanics: [
      {
        id: 'mech-patan-1',
        name: 'Shree Krishna Auto Garage',
        shopName: 'Shree Krishna Multibrand Repair',
        isVerified: true,
        distanceKm: 1.4,
        isAvailable: true,
        supportedVehicles: ['Car', 'SUV', 'Bike'],
        estimatedChargeInr: 350,
        contactNumber: '+91 97241 88231',
        location: 'Opposite New Circuit House',
        specialty: 'Brake inspection, AC service, wheel balancing',
      },
    ],
    verifiedStays: [
      {
        id: 'stay-patan-haveli',
        name: 'Patan Vada Heritage Homestay',
        type: 'Local Guesthouse',
        hostName: 'Devangbhai Salvi (Master Weaver)',
        isVerifiedHost: true,
        verificationBadge: 'Government Verified',
        pricePerNightInr: 3100,
        priceHistory: [
          { month: 'Jul', price: 2600 },
          { month: 'Aug', price: 2700 },
          { month: 'Sep', price: 2900 },
          { month: 'Oct', price: 3100 },
        ],
        sustainabilityRating: 92,
        auditHash: '0x11ab49c9023847fed882',
        reviewCount: 38,
        averageRating: 4.8,
        reviews: [
          {
            id: 'rev-p-1',
            author: 'Priya N., Chennai',
            stayVerified: true,
            date: '2 weeks ago',
            comment: 'Staying with master weavers gives access to techniques passed down 800 years. Unbelievable hospitality.',
            rating: 5,
            hashProof: 'SHA256:39ac01...ff2',
          },
        ],
      },
    ],
    experienceArchetype: {
      peaceScore: 82,
      heritageScore: 96,
      natureScore: 40,
      adventureScore: 30,
      photoScore: 94,
    },
    sustainability: {
      currentFootfallPressure: 'Moderate',
      decongestionPriority: 'Medium',
      localEconomyIndex: 94,
      rewardPointsMultiplier: 1.5,
    },
  },
  {
    id: 'little-rann-kutch',
    name: 'Little Rann of Kutch & Wild Ass Sanctuary',
    region: 'Surendranagar / Kutch Border',
    category: 'Salt Plains Wildlife & Remote Ecosystem',
    tags: ['nature', 'wildlife', 'photography', 'quiet', 'adventure', 'remote'],
    crowdLevel: 'quiet',
    isOpen: true,
    isAccessible: false,
    isRemoteArea: true,
    suitabilityNote: 'Cracked salt desert horizon with endangered Indian Wild Ass herds and rare desert flamingo flocks. High isolation.',
    coordinates: { lat: 23.3100, lng: 71.4500 },
    evidence: [
      { label: 'Saltpan Soil Crust', value: 'Dry and baked solid; safe for approved 4x4 safaris', source: 'Wild Ass Sanctuary Patrol', collectedAt: 'Today 07:00', confidence: 'high' },
      { label: 'Wildlife Sightings', value: 'High activity at dawn (Flamingo groups & Wild Ass herds)', source: 'Bajana Ranger Post', collectedAt: 'Today 06:30', confidence: 'high' },
      { label: 'Network Coverage', value: 'Zero network 5km onto the saltpan bed', source: 'Telecom Survey Data', collectedAt: 'Yesterday', confidence: 'high' },
    ],
    arrivalPoint: {
      id: 'dasada-desert-staging',
      name: 'Dasada Safari Staging & Water Station',
      reason: 'Official sanctuary entry permitting station with mandatory tyre-pressure adjustment facilities, satellite SOS transponders, and registered naturalist jeeps.',
      walkTime: 'Safari boarding gate directly adjacent',
      facilities: ['Tyre Deflation/Inflation Post', 'Permit Counter', 'Water Tank Refill', 'Certified Naturalist Desk'],
      distanceToDestinationKm: 2.0,
      accessibilityScore: 50,
      parkingAvailable: true,
    },
    safety: {
      level: 'Caution',
      score: 71,
      routeConditions: 'Salt desert terrain requires strictly following tire track ruts; unauthorized detour risks bogging in soft clay layers',
      networkConnectivity: 'Zero Connectivity',
      nearestHospitalKm: 32,
      nearestPoliceKm: 21,
      nearestMechanicKm: 14,
      nearestFuelKm: 18,
      confidence: 'high',
      lastUpdated: '1 hour ago',
      factors: [
        { name: 'Desert Disorientation Risk', status: 'critical', detail: 'Featureless salt horizon; GPS navigation & local guide mandatory', lastVerified: 'Today 06:00' },
        { name: 'Extreme Afternoon Heat & Glare', status: 'moderate', detail: 'Reflective white salt increases UV exposure by 2.2x', lastVerified: 'Today 08:00' },
      ],
    },
    rentals: [
      {
        id: 'rent-safari-gypsy',
        type: 'SUV (4x4)',
        model: 'Maruti Gypsy 4x4 Open Top (Desert Rig)',
        provider: 'Rann Wildlife Eco Safaris',
        isVerified: true,
        dailyRateInr: 2900,
        suitableTerrain: ['Saltpan Bed', 'Sandy Tracks', 'Mud Flashes'],
        capacity: 6,
        transmission: 'Manual',
        pickupLocation: 'Dasada Base Camp',
        rating: 4.9,
      },
    ],
    mechanics: [
      {
        id: 'mech-rann-1',
        name: 'Kutchi Desert 4x4 Recovery',
        shopName: 'Dasada Recovery & Puncture Station',
        isVerified: true,
        distanceKm: 8.5,
        isAvailable: true,
        supportedVehicles: ['SUV', 'Car', 'Bike'],
        estimatedChargeInr: 750,
        contactNumber: '+91 94280 77123',
        location: 'Dasada Highway Junction',
        specialty: 'Desert sand winching & heavy duty punctures',
      },
    ],
    verifiedStays: [
      {
        id: 'stay-rann-riders',
        name: 'Rann Desert Eco-Cottages & Salt Farmers Homestay',
        type: 'Eco Resort',
        hostName: 'Malik Family & Agariya Collective',
        isVerifiedHost: true,
        verificationBadge: 'Community Certified',
        pricePerNightInr: 4600,
        priceHistory: [
          { month: 'Jul', price: 3500 },
          { month: 'Aug', price: 3600 },
          { month: 'Sep', price: 4000 },
          { month: 'Oct', price: 4600 },
        ],
        sustainabilityRating: 97,
        auditHash: '0x99fe40b2a8d7124982',
        reviewCount: 51,
        averageRating: 4.9,
        reviews: [
          {
            id: 'rev-rann-1',
            author: 'Ananya & Vikram, Pune',
            stayVerified: true,
            date: '4 days ago',
            comment: 'The silence under the Milky Way is unbelievable. Seeing the Agariya salt workers and wild ass herds was mesmerizing.',
            rating: 5,
            hashProof: 'SHA256:1a88bb...441',
          },
        ],
      },
    ],
    experienceArchetype: {
      peaceScore: 99,
      heritageScore: 70,
      natureScore: 100,
      adventureScore: 88,
      photoScore: 99,
    },
    sustainability: {
      currentFootfallPressure: 'Low',
      decongestionPriority: 'Low',
      localEconomyIndex: 98,
      rewardPointsMultiplier: 3.0,
    },
  },
];
