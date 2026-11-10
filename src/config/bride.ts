/**
 * Anushka’s patrika — same website shape as Atishay’s card (wedding.ts).
 * Shown on the bride domain / ?side=anushka. Look stays shared.
 */

const hotelMaps = 'https://maps.app.goo.gl/iBcFC3mSDBpUEXMB9'
const sehoreMaps = 'https://maps.app.goo.gl/pzAYPqxePQGpVYHd6'

export const bridePatrika = {
  blessing: '॥ श्री गणेशाय नमः ॥',
  blessings: ['TBD'],
  invitationBlessings: ['TBD'],
  mangalShlok:
    'मंगलम् भगवान वीरो, मंगलम् गौतम प्रभुः। मंगलम् स्थूलि भद्राद्यो, जैन धर्मोस्तु मंगलम्॥',

  couple: {
    partner1: 'Atishay',
    partner2: 'Anushka',
    partner1Full: 'Atishay Vishwakarma',
    partner2Full: 'Anushka Singh',
    hashtag: '#Atishay&Anushka',
    bride: {
      printed: 'Anushka Singh',
      printedEn: 'Anushka Singh',
      parents: 'Lt. Arvind Pratap Singh & Archana Singh',
      parentsEn: 'Lt. Arvind Pratap Singh & Archana Singh',
      grandparents: 'TBD',
      city: 'Sehore',
    },
    groom: {
      printed: 'Atishay Vishwakarma',
      printedEn: 'Atishay Vishwakarma',
      parents: 'Rekha & Arvind Vishwakarma',
      parentsEn: 'Rekha & Arvind Vishwakarma',
      grandparents: 'Leela Devi Vishwakarma',
      city: 'Sehore',
    },
  },

  inviteFrom: 'Lt. Arvind Pratap Singh & Archana Singh',
  inviteFromEn: 'Lt. Arvind Pratap Singh & Archana Singh',
  hosts: ['TBD Siblings'],

  hero: {
    tagline:
      'Together with their families, joyfully invite you to the wedding celebrations',
    closing: 'As we begin our forever',
  },

  ours: {
    lines: ['TBD'],
    signOff: 'Anushka & Atishay',
  },

  eventsTitle: 'Wedding Events',
  eventsSubtitle: 'Four days of rituals and joy across Sehore & Bhopal',

  dinnerNote: '',

  venues: {
    dharamshala: {
      name: 'Venue — TBD',
      address: 'TBD',
      shortAddress: 'TBD',
      mapUrl: sehoreMaps,
      appleMapsUrl: 'https://maps.apple.com/?q=Sehore%20Madhya%20Pradesh',
      googleMapsUrl: sehoreMaps,
    },
    hotel: {
      name: 'Shambhala Resort, Bhopal',
      address:
        'Shambhala Resort, behind Campion School, Bhauri, Bhopal, Madhya Pradesh 462030',
      shortAddress: 'Bhauri, Bhopal',
      mapUrl: hotelMaps,
      appleMapsUrl:
        'https://maps.apple.com/?q=Shambhala%20Resort%20Bhauri%20Bhopal',
      googleMapsUrl: hotelMaps,
    },
  },

  celebrationDays: [
    {
      day: 24 as const,
      dayLabel: 'Day 01',
      date: 'Sunday, 24 January 2027',
      dateShort: '24 Jan',
      venueKey: 'dharamshala' as const,
      city: 'Sehore',
      events: [{ nameHi: 'विवरण शीघ्र', name: 'Rituals — TBD', time: 'TBD' }],
    },
    {
      day: 25 as const,
      dayLabel: 'Day 02',
      date: 'Monday, 25 January 2027',
      dateShort: '25 Jan',
      venueKey: 'hotel' as const,
      city: 'Bhopal',
      events: [{ nameHi: 'हल्दी व उत्सव', name: 'Haldi & Celebrations — TBD', time: 'TBD' }],
    },
    {
      day: 26 as const,
      dayLabel: 'Day 03',
      date: 'Tuesday, 26 January 2027',
      dateShort: '26 Jan',
      venueKey: 'hotel' as const,
      city: 'Bhopal',
      events: [{ nameHi: 'शुभ विवाह', name: 'Wedding — TBD', time: 'TBD' }],
    },
  ],

  calendarEvents: [
    {
      day: 24 as const,
      title: 'Anushka & Atishay — Day 01 (TBD)',
      start: '20270124T100000',
      end: '20270124T210000',
      location: 'Sehore, Madhya Pradesh',
      description: 'Event timings TBD',
    },
    {
      day: 25 as const,
      title: 'Anushka & Atishay — Haldi & Celebrations (TBD)',
      start: '20270125T100000',
      end: '20270125T230000',
      location: 'Shambhala Resort, Bhauri, Bhopal',
      description: 'Event timings TBD',
    },
    {
      day: 26 as const,
      title: 'Anushka & Atishay — Wedding (TBD)',
      start: '20270126T100000',
      end: '20270126T230000',
      location: 'Shambhala Resort, Bhauri, Bhopal',
      description: 'Event timings TBD',
    },
  ],

  timeline: [
    {
      time: 'TBD',
      title: 'Wedding Day Schedule',
      description: 'Event timings will be updated shortly',
    },
  ],
  timelineVenue:
    'Shambhala Resort, behind Campion School, Bhauri, Bhopal, Madhya Pradesh 462030',

  travel: {
    title: 'Travel',
    note: 'Celebrations are in Sehore (24 Jan 2027) and Bhopal (25–26 Jan 2027). Here’s how to reach.',
    departureNote: '',
    modes: [
      {
        mode: 'Airport',
        name: 'Raja Bhoj Airport (BHO)',
        detail:
          'Nearest airport for both cities — convenient cab access to Shambhala Resort, Bhauri (Bhopal) and Sehore.',
        link: 'https://maps.app.goo.gl/eWYHCdR63BPjKtkt9',
      },
      {
        mode: 'Railway',
        name: 'Bhopal Junction (BPL) & Sehore (SEH)',
        detail:
          'For Sehore celebrations, arrive at Sehore (SEH). For 25–26 Jan events at Shambhala Resort, Bhopal Junction (BPL) is convenient.',
        link: 'https://maps.app.goo.gl/DJTgRZw42XstVsGx8',
        secondaryLabel: 'Sehore (SEH) →',
        secondaryLink: 'https://maps.app.goo.gl/ZiiFvm6QW3wdHd6m9',
      },
      {
        mode: 'Bus',
        name: 'Bhopal ISBT & Sehore Bus Stand',
        detail:
          'Regular interstate and local buses connect Bhopal and Sehore (approx. 1–1.5 hours). Convenient if you’re travelling within Madhya Pradesh.',
        link: 'https://maps.app.goo.gl/DDGL2j8aJz19JQAh8',
      },
    ],
  },

  faq: [
    {
      q: 'What time should I arrive?',
      a: 'Event timings are TBD and will be updated shortly.',
    },
    {
      q: 'What should I wear?',
      a: 'Details TBD — festive Indian attire is encouraged.',
    },
  ],

  share: {
    text: "You're invited to Anushka & Atishay's wedding celebrations (25-26 Jan 2027 Bhopal, MP). All details here:",
  },

  faqTip: '',
  faqSubtitle: 'Venues, arrival times, and celebration details (TBD)',

  dayChoices: [
    { id: 'all' as const, title: 'All days', sub: '24, 25 & 26 January · Sehore & Bhopal' },
    { id: '25-26' as const, title: '25 & 26 only', sub: 'Bhopal · Haldi to Wedding' },
    { id: '26' as const, title: '26 only', sub: 'Wedding day' },
  ],

  people: [
    {
      title: 'Blessings of elders',
      note: 'Remembered with love',
      names: ['TBD'],
    },
    {
      title: 'With love & blessings',
      names: ['TBD'],
    },
    {
      title: 'Eager to welcome',
      names: ['TBD'],
    },
    {
      title: 'Hosts',
      note: 'With the invitation',
      names: ['TBD'],
    },
    {
      title: 'Awaiting you',
      names: ['TBD'],
    },
    {
      title: 'Maternal family',
      note: 'As printed on the card',
      names: ['TBD'],
    },
    {
      title: "Atishay's family",
      names: [
        'Arvind Vishwakarma',
        'Rekha Vishwakarma',
        'Sandeep Vishwakarma',
        'Rashmi Vishwakarma',
      ],
    },
  ],
} as const
