export type ActivityCategory = 'All' | 'Hiking' | 'Water' | 'Aerial' | 'Packages';

export interface Activity {
  id: string;
  title: string;
  kind: 'PACKAGE' | 'ACTIVITY';
  /** Chip label shown on the card + detail header, e.g. Mountain / Water / Forest */
  tagLabel: string;
  /** Filter category */
  category: Exclude<ActivityCategory, 'All'>;
  fee: number;
  duration: string;
  location: string;
  locationShort: string;
  overview: string;
  extraOverview?: string;
  included: string[];
  beforeAdventure: string;
  /** Optional 3-cell strip on detail (Experience / Terrain / Setting) */
  infoStrip?: { label: string; value: string }[];
  rating: number;
  reviews: number;
  popular?: boolean;
  image: string;
  gallery: string[];
  related: string[];
}

const img = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=60`;

export const HERO_IMAGES = {
  home: img('1501554728187-ce583db33af7', 900),
  mountain: img('1580060839134-75a5edca2e99', 900),
  contact: img('1588508065123-287b28e013da', 900),
  about: img('1596026800918-abec3a13c9a3', 900),
  story: img('1469854523086-cc02fe5d8800', 900),
};

const BEFORE_DEFAULT =
  'Contact our team to discuss participation requirements and booking arrangements before your adventure.';

export const ACTIVITIES: Activity[] = [
  {
    id: 'ultimate',
    title: 'Ultimate Adventure Day',
    kind: 'PACKAGE',
    tagLabel: 'Adventure',
    category: 'Packages',
    fee: 1500,
    duration: 'Full day',
    location: 'Cape Town, Western Cape',
    locationShort: 'Cape Town',
    overview: 'A full-day outdoor adventure featuring multiple exciting activities.',
    included: [
      'Guided hiking trail',
      'Ziplining',
      'Kayaking',
      'Lunch',
      'Safety briefing and equipment',
    ],
    beforeAdventure: BEFORE_DEFAULT,
    rating: 5.0,
    reviews: 42,
    popular: true,
    image: img('1501554728187-ce583db33af7', 900),
    gallery: [
      img('1501554728187-ce583db33af7', 400),
      img('1469854523086-cc02fe5d8800', 400),
      img('1506905925346-21bda4d32df4', 400),
      img('1526401485004-46910ecc8e51', 400),
    ],
    related: ['mountain', 'zipline', 'kayak'],
  },
  {
    id: 'family',
    title: 'Family Explorer Package',
    kind: 'PACKAGE',
    tagLabel: 'Family',
    category: 'Packages',
    fee: 1500,
    duration: 'Full day',
    location: 'Western Cape, South Africa',
    locationShort: 'Western Cape',
    overview: 'A fun-filled outdoor experience designed for families.',
    included: [
      'Nature walk',
      'Obstacle course',
      'Picnic area',
      'Family games',
      'Guided wildlife spotting',
    ],
    beforeAdventure: BEFORE_DEFAULT,
    rating: 5.0,
    reviews: 83,
    image: img('1475860105989-da9900bb27c5', 900),
    gallery: [
      img('1475860105989-da9900bb27c5', 400),
      img('1470770841072-f978cf4d019e', 400),
      img('1441974231531-c6227db76b6e', 400),
      img('1502082553048-f009c37129b9', 400),
    ],
    related: ['ultimate', 'kayak', 'mountain'],
  },
  {
    id: 'mountain',
    title: 'Mountain Adventure Package',
    kind: 'PACKAGE',
    tagLabel: 'Mountain',
    category: 'Hiking',
    fee: 1500,
    duration: 'Full day',
    location: 'Mountain trails, Western Cape',
    locationShort: 'Mountain trails',
    overview: 'A guided mountain adventure for outdoor enthusiasts.',
    included: [
      'Mountain hiking',
      'Scenic viewpoints',
      'Rock scrambling',
      'Safety equipment',
      'Professional guide',
    ],
    beforeAdventure: BEFORE_DEFAULT,
    rating: 5.0,
    reviews: 128,
    image: img('1580060839134-75a5edca2e99', 900),
    gallery: [
      img('1580060839134-75a5edca2e99', 400),
      img('1454496522488-7a8b483e4bf6', 400),
      img('1464822759023-fed622ff2c3b', 400),
      img('1486870591958-9b9d0d1dda99', 400),
    ],
    related: ['ultimate', 'zipline', 'family'],
  },
  {
    id: 'corporate',
    title: 'Corporate Team Challenge',
    kind: 'PACKAGE',
    tagLabel: 'Team',
    category: 'Packages',
    fee: 1500,
    duration: 'Full day',
    location: 'Western Cape, South Africa',
    locationShort: 'Western Cape',
    overview: 'Team-building activities designed for businesses and organisations.',
    included: [
      'Team obstacle course',
      'Orienteering challenge',
      'Raft-building activity',
      'Leadership exercises',
      'Team awards',
    ],
    beforeAdventure: BEFORE_DEFAULT,
    rating: 5.0,
    reviews: 51,
    image: img('1529156069898-49953e39b10c', 900),
    gallery: [
      img('1529156069898-49953e39b10c', 400),
      img('1511632765666-e0b44630e7b8', 400),
      img('1528605248644-14dd04022da1', 400),
      img('1531545514256-b140e763646e', 400),
    ],
    related: ['family', 'ultimate', 'kayak'],
  },
  {
    id: 'zipline',
    title: 'Ziplining Adventure',
    kind: 'ACTIVITY',
    tagLabel: 'Forest',
    category: 'Aerial',
    fee: 750,
    duration: 'Full day',
    location: 'Forest canopy, Western Cape',
    locationShort: 'Forest canopy',
    overview: 'Experience breathtaking views while ziplining through the forest.',
    extraOverview: 'Your adventure includes a safety briefing and professional instructors.',
    included: ['Safety briefing', 'Professional instructors'],
    beforeAdventure:
      'A safety briefing and professional instructors are included. Contact our team to discuss participation requirements before booking.',
    infoStrip: [
      { label: 'Experience', value: 'Guided zipline' },
      { label: 'Terrain', value: 'Forest canopy' },
      { label: 'Setting', value: 'Forest trails' },
    ],
    rating: 4.9,
    reviews: 87,
    popular: true,
    image: img('1526401485004-46910ecc8e51', 900),
    gallery: [
      img('1526401485004-46910ecc8e51', 400),
      img('1504280390367-361c6d9f38f4', 400),
      img('1470071459604-3b5ec3a7fe05', 400),
      img('1441974231531-c6227db76b6e', 400),
    ],
    related: ['kayak', 'climbing', 'mountain'],
  },
  {
    id: 'kayak',
    title: 'Kayaking Experience',
    kind: 'ACTIVITY',
    tagLabel: 'Water',
    category: 'Water',
    fee: 750,
    duration: 'Full day',
    location: 'Scenic rivers and lakes, Western Cape',
    locationShort: 'Rivers and lakes',
    overview: 'Paddle through scenic rivers and lakes.',
    included: ['Kayak and paddle', 'Safety equipment', 'Guided route'],
    beforeAdventure: BEFORE_DEFAULT,
    infoStrip: [
      { label: 'Experience', value: 'Guided paddle' },
      { label: 'Terrain', value: 'Open water' },
      { label: 'Setting', value: 'Rivers and lakes' },
    ],
    rating: 5.0,
    reviews: 94,
    image: img('1502933691298-84fc14542831', 900),
    gallery: [
      img('1502933691298-84fc14542831', 400),
      img('1504280390367-361c6d9f38f4', 400),
      img('1470770841072-f978cf4d019e', 400),
      img('1439066615861-d1af74d74000', 400),
    ],
    related: ['zipline', 'climbing', 'ultimate'],
  },
  {
    id: 'climbing',
    title: 'Rock Climbing Session',
    kind: 'ACTIVITY',
    tagLabel: 'Rock',
    category: 'Hiking',
    fee: 750,
    duration: 'Full day',
    location: 'Natural rock faces, Western Cape',
    locationShort: 'Rock faces',
    overview: 'Learn climbing techniques on natural rock faces.',
    included: ['Climbing equipment', 'Safety instruction', 'Professional guide'],
    beforeAdventure: BEFORE_DEFAULT,
    infoStrip: [
      { label: 'Experience', value: 'Guided climb' },
      { label: 'Terrain', value: 'Natural rock' },
      { label: 'Setting', value: 'Mountain cliffs' },
    ],
    rating: 4.8,
    reviews: 128,
    image: img('1521169580199-7cd93044d3e1', 900),
    gallery: [
      img('1521169580199-7cd93044d3e1', 400),
      img('1519689680058-324335c77eba', 400),
      img('1502224562085-639556652f33', 400),
      img('1454496522488-7a8b483e4bf6', 400),
    ],
    related: ['zipline', 'kayak', 'mountain'],
  },
];

export const CATEGORIES: ActivityCategory[] = ['All', 'Hiking', 'Water', 'Aerial', 'Packages'];

export const CONTACT = {
  phone: '+27 (0) 21 555 4321',
  email: 'info@adventureescape.co.za',
  hours: 'Mon-Fri: 08:00 - 17:00 SAST',
  address: '12 Loop Street, Cape Town, 8001',
  hoursLong: 'Mon - Fri: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM',
};
