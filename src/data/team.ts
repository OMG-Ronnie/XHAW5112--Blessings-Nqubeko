export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  location: string;
  initials: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Johan Smuts',
    role: 'Founder & Lead Ranger',
    bio: 'FGASA Level 3 qualified. 15 years guiding across the Western Cape.',
    location: 'Cape Town, WC',
    initials: 'JS',
  },
  {
    name: 'Zola Ndlovu',
    role: 'Safety Coordinator',
    bio: 'Wilderness first responder. 8 years in adventure operations.',
    location: 'Stellenbosch, WC',
    initials: 'ZN',
  },
  {
    name: 'Lize van der Merwe',
    role: 'Customer Operations',
    bio: 'Eco-tourism management background. Group bookings specialist.',
    location: 'Cape Town, WC',
    initials: 'LM',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'The shark cage diving experience was absolutely incredible! From start to finish, stunning marine life, and a very friendly crew.',
    name: 'Sarah M.',
    city: 'Cape Town',
  },
  {
    quote:
      'Hiked Table Mountain with their guides - incredible pace, brilliant commentary on the fynbos flora, and stunning views from the top!',
    name: 'James K.',
    city: 'Johannesburg',
  },
];
