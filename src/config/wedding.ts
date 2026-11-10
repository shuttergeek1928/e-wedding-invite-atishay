// ============================================================
//  Atishay & Anushka — Wedding details
// ============================================================

export const weddingConfig = {
  siteUrl: "https://wedding.atishay.in",
  blessing: "॥ श्री गणेशाय नमः ॥",

  couple: {
    partner1: "Atishay",
    partner2: "Anushka",
    partner1Full: "Atishay Vishwakarma",
    partner2Full: "Anushka Singh",
    hashtag: "#Atishay&Anushka",
  },

  date: {
    full: "Tuesday, January 26, 2027",
    short: "26 Jan, 2027, Tuesday",
    iso: "2027-01-26T02:00:00",
    foreverLabel: "77 calendar days",
  },

  hero: {
    tagline:
      "Together with their families, joyfully invite you to the wedding celebrations",
    closing: "As we begin our forever",
  },

  secret: {
    title: "A note just for you",
    message:
      "If you found this — thank you for being part of our story. Your love got us here. See you under the mandap.",
    signOff: "Atishay & Anushka",
  },

  credit: {
    line: "Forked with love by Atishay, thanks Somya for the support ;)",
  },

  /**
   * Default WhatsApp sign-off (Atishay / Vishwakarma).
   * Overridden per domain in src/config/sides.ts
   */
  inviteFrom: "Arvind Vishwakarma & Family",

  /** Pure Hindi note */
  ours: {
    lines: [
      "यह कोई सामान्य कार्ड नहीं — हमने इसे आपके लिए ही रखा है।",
      "आपके आने से हमारा घर पूरा लगेगा।",
    ],
    signOff: "atishay v anushka",
  },

  story: {
    title: "Our Story",
    paragraphs: [
      "What began in 2014 as a simple friendship slowly grew into something deeper — built on trust, laughter, and countless shared moments.",
      "In 2022, Friendship turned into Love",
      "In 2025, our families came together as we got rokafied. Now in Jan 2027, we are getting married",
    ],
    milestones: [
      { year: "2015", event: "First met as friends" },
      { year: "2022", event: "Came in relationship" },
      { year: "2025", event: "Got Rokafied" },
      { year: "2027", event: "Our Wedding" },
    ],
  },

  venues: {
    home: {
      name: "Residence",
      address:
        "Atishay Graphics House, In front of Kanchan Baag, Englishpura, Sehore",
      shortAddress: "Englishpura, Sehore",
      mapUrl: "https://maps.app.goo.gl/pzAYPqxePQGpVYHd6",
      appleMapsUrl:
        "https://maps.apple.com/?q=Atishay%20Graphics%20House%20Englishpura%20Sehore",
      googleMapsUrl: "https://maps.app.goo.gl/pzAYPqxePQGpVYHd6",
    },
    hotel: {
      name: "Shambhala Resort, Bhopal",
      address:
        "Shambhala Resort, behind Campion School, Bhauri, Bhopal, Madhya Pradesh 462030",
      shortAddress: "Bhauri, Bhopal",
      mapUrl: "https://maps.app.goo.gl/iBcFC3mSDBpUEXMB9",
      appleMapsUrl:
        "https://maps.apple.com/?q=Shambhala%20Resort%20Bhauri%20Bhopal",
      googleMapsUrl: "https://maps.app.goo.gl/iBcFC3mSDBpUEXMB9",
    },
  },

  celebrationDays: [
    {
      day: 23 as const,
      dayLabel: "Day 01",
      date: "Saturday, 23 January 2027",
      dateShort: "23 Jan",
      venueKey: "home" as const,
      city: "Sehore",
      events: [{ nameHi: "विवरण शीघ्र", name: "Rituals — TBD", time: "TBD", host: "groom" as const }],
    },
    {
      day: 24 as const,
      dayLabel: "Day 02",
      date: "Sunday, 24 January 2027",
      dateShort: "24 Jan",
      venueKey: "home" as const,
      city: "Sehore",
      events: [{ nameHi: "विवरण शीघ्र", name: "Ceremonies — TBD", time: "TBD", host: "groom" as const }],
    },
    {
      day: 25 as const,
      dayLabel: "Day 03",
      date: "Monday, 25 January 2027",
      dateShort: "25 Jan",
      venueKey: "hotel" as const,
      city: "Bhopal",
      events: [{ nameHi: "हल्दी व उत्सव", name: "Haldi & Celebrations — TBD", time: "TBD", host: "groom" as const }],
    },
    {
      day: 26 as const,
      dayLabel: "Day 04",
      date: "Tuesday, 26 January 2027",
      dateShort: "26 Jan",
      venueKey: "hotel" as const,
      city: "Bhopal",
      events: [{ nameHi: "शुभ विवाह", name: "Wedding — TBD", time: "TBD", host: "groom" as const }],
    },
  ],

  calendarEvents: [
    {
      day: 23 as const,
      host: "groom" as const,
      title: "Anushka & Atishay — Day 01 (TBD)",
      start: "20270123T100000",
      end: "20270123T210000",
      location: "Atishay Graphics House, Englishpura, Sehore",
      description: "Event timings TBD",
    },
    {
      day: 24 as const,
      host: "groom" as const,
      title: "Anushka & Atishay — Sehore Celebrations (TBD)",
      start: "20270124T100000",
      end: "20270124T210000",
      location: "Atishay Graphics House, Englishpura, Sehore",
      description: "Event timings TBD",
    },
    {
      day: 25 as const,
      host: "groom" as const,
      title: "Anushka & Atishay — Haldi & Celebrations (TBD)",
      start: "20270125T100000",
      end: "20270125T230000",
      location: "Shambhala Resort, Bhauri, Bhopal",
      description: "Event timings TBD",
    },
    {
      day: 26 as const,
      host: "groom" as const,
      title: "Anushka & Atishay — Wedding (TBD)",
      start: "20270126T100000",
      end: "20270126T230000",
      location: "Shambhala Resort, Bhauri, Bhopal",
      description: "Event timings TBD",
    },
  ],

  timeline: [
    { time: "TBD", title: "Wedding Day Schedule", description: "Event timings will be updated shortly" },
  ],

  travel: {
    title: "Travel",
    note: "Celebrations are in Sehore (24 Jan 2027) and Bhopal (25–26 Jan 2027). Here’s how to reach.",
    departureNote:
      "On 25 Morning, we leave for Shambhala followed by the Joyful Haldi. Plan accordingly to be on time.",
    modes: [
      {
        mode: "Airport",
        name: "Raja Bhoj Airport (BHO)",
        detail:
          "Nearest airport for both cities — convenient cab access to Shambhala Resort, Bhauri (Bhopal) and Sehore.",
        link: "https://maps.app.goo.gl/eWYHCdR63BPjKtkt9",
      },
      {
        mode: "Railway",
        name: "Bhopal Junction (BPL) & Sehore (SEH)",
        detail:
          "For Sehore celebrations, arrive at Sehore (SEH). For 25–26 Jan events at Shambhala Resort, Bhopal Junction (BPL) is convenient.",
        link: "https://maps.app.goo.gl/DJTgRZw42XstVsGx8",
        secondaryLabel: "Sehore (SEH) →",
        secondaryLink: "https://maps.app.goo.gl/ZiiFvm6QW3wdHd6m9",
      },
      {
        mode: "Bus",
        name: "Bhopal ISBT & Sehore Bus Stand",
        detail:
          "Regular interstate and local buses connect Bhopal and Sehore (approx. 1–1.5 hours). Convenient if you’re travelling within Madhya Pradesh.",
        link: "https://maps.app.goo.gl/DDGL2j8aJz19JQAh8",
      },
    ],
  },

  faq: [
    {
      q: "What time should I arrive?",
      a: "Event timings are TBD and will be updated shortly.",
    },
    {
      q: "What should I wear?",
      a: "Details TBD — festive Indian attire is encouraged.",
    },
    {
      q: "Who do I call if I’m lost?",
      a: "Reach out to Atishay or the family host who invited you. Use the map buttons on this site — Google Maps and Apple Maps both work.",
    },
  ],

  share: {
    text: "You're invited to Anushka & Atishay's wedding celebrations (25-26 Jan 2027 Bhopal, MP). All details here:",
  },

  blessings: {
    title: "Blessings Wall",
    subtitle: "Leave a few words for the couple — your love is the gift",
    seed: [
      {
        name: "Family",
        message: "May your life together be filled with laughter, health, and endless chai.",
      },
      {
        name: "A friend",
        message: "From friendship to forever — so happy for you both.",
      },
    ],
  },

  footer: {
    message: "Join us in celebrating as we begin our forever.",
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
