// ============================================================
//  Atishay & Anushka — Wedding details
// ============================================================

export const weddingConfig = {
  siteUrl: "https://wedding.atishay.in",
  blessing: "॥ श्री गणेशाय नमः ॥",
  mangalShlok: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",

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
      "Bound by friendship, blessed by family, and united in love — together with their families, warmly invite you to celebrate the wedding of",
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

  ours: {
    lines: [],
    signOff: "",
  },

  story: {
    title: "Our Story",
    paragraphs: [
      "What began in 2014 as a simple friendship slowly grew into something deeper — built on trust, laughter, and countless shared moments.",
      "In 2025, our families came together as we got rokafied. Now in January 2027, we are getting married.",
    ],
    milestones: [
      { year: "2015", event: "First met as friends" },
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
      day: 24 as const,
      dayLabel: "Day 01",
      date: "Sunday, 24 January 2027",
      dateShort: "24 Jan",
      venueKey: "home" as const,
      city: "Sehore",
      events: [
        {
          nameHi: "श्री गणेश एवं माता पूजन",
          name: "Ganesh & Mata Pujan",
          time: "10:00 AM",
          note: "Auspicious invocation and family rituals",
          host: "groom" as const,
        },
        {
          nameHi: "मण्डप आच्छादन",
          name: "Mandap Ceremony",
          time: "12:00 PM",
          note: "Erecting the sacred wedding canopy",
          host: "groom" as const,
        },
        {
          nameHi: "घर की हल्दी",
          name: "Ghar Ki Haldi",
          time: "4:00 PM",
          note: "Haldi rituals at our Sehore residence",
          host: "groom" as const,
        },
      ],
    },
    {
      day: 25 as const,
      dayLabel: "Day 02",
      date: "Monday, 25 January 2027",
      dateShort: "25 Jan",
      venueKey: "hotel" as const,
      city: "Bhopal",
      events: [
        {
          nameHi: "हल्दी उत्सव",
          name: "Haldi Ceremony",
          time: "12:00 PM – 1:00 PM",
          note: "Joyful haldi celebrations with colors of celebration",
          host: "groom" as const,
        },
        {
          nameHi: "फलदान रस्म",
          name: "Faldaan Ceremony",
          time: "5:00 PM – 6:00 PM",
          note: "Traditional blessing ceremony from bride's family",
          host: "groom" as const,
        },
        {
          nameHi: "अंगूठी रस्म एवं संगीत संध्या",
          name: "Ring Ceremony & Sangeet",
          time: "7:00 PM onwards",
          note: "Ring exchange followed by musical night and dinner",
          host: "groom" as const,
        },
      ],
    },
    {
      day: 26 as const,
      dayLabel: "Day 03",
      date: "Tuesday, 26 January 2027",
      dateShort: "26 Jan",
      venueKey: "hotel" as const,
      city: "Bhopal",
      events: [
        {
          nameHi: "निकासी एवं बारात",
          name: "Baraat Procession",
          time: "11:00 AM",
          note: "Groom's procession departs and arrives with celebration",
          host: "groom" as const,
        },
        {
          nameHi: "तोरण आगमन",
          name: "Toran Ceremony",
          time: "1:00 PM",
          note: "Auspicious welcome at the entrance",
          host: "groom" as const,
        },
        {
          nameHi: "वरमाला",
          name: "Varmala Ceremony",
          time: "2:00 PM",
          note: "Sacred exchange of floral garlands",
          host: "groom" as const,
        },
        {
          nameHi: "पाणिग्रहण संस्कार एवं सप्तपदी",
          name: "Phere & Wedding Rituals",
          time: "2:30 PM onwards",
          note: "Sacred pheras and vivah rituals following Varmala",
          host: "groom" as const,
        },
        {
          nameHi: "स्नेहभोज एवं रिसेप्शन",
          name: "Reception & Dinner",
          time: "8:00 PM onwards",
          note: "Dinner, blessings & evening celebration",
          host: "groom" as const,
        },
      ],
    },
  ],

  calendarEvents: [
    {
      day: 24 as const,
      host: "groom" as const,
      title: "Atishay & Anushka — Sehore Celebrations",
      start: "20270124T100000",
      end: "20270124T200000",
      location: "Atishay Graphics House, Englishpura, Sehore",
      description: "Ganesh & Mata Pujan (10:00 AM) · Mandap (12:00 PM) · Ghar Ki Haldi (4:00 PM)",
    },
    {
      day: 25 as const,
      host: "groom" as const,
      title: "Atishay & Anushka — Haldi, Faldaan & Sangeet",
      start: "20270125T120000",
      end: "20270125T230000",
      location: "Shambhala Resort, Bhauri, Bhopal",
      description: "Haldi (12:00 PM) · Faldaan (5:00 PM) · Ring Ceremony & Sangeet (7:00 PM onwards)",
    },
    {
      day: 26 as const,
      host: "groom" as const,
      title: "Atishay & Anushka — Wedding & Reception",
      start: "20270126T110000",
      end: "20270126T235900",
      location: "Shambhala Resort, Bhauri, Bhopal",
      description: "Baraat (11:00 AM) · Toran (1:00 PM) · Varmala (2:00 PM) · Phere (2:30 PM) · Reception (8:00 PM onwards)",
    },
  ],

  timeline: [
    {
      time: "11:00 AM",
      title: "Baraat Procession",
      description: "Groom's grand procession arrives with dhol and celebration",
    },
    {
      time: "1:00 PM",
      title: "Toran Ceremony",
      description: "Welcoming the groom at the resort entrance",
    },
    {
      time: "2:00 PM",
      title: "Varmala Ceremony",
      description: "Exchange of sacred floral garlands",
    },
    {
      time: "2:30 PM",
      title: "Phere & Wedding Rituals",
      description: "Sacred pheras and vivah rituals following Varmala",
    },
    {
      time: "8:00 PM",
      title: "Reception & Dinner",
      description: "Grand reception, dinner, and blessings with family & friends",
    },
  ],

  travel: {
    title: "Travel",
    note: "Celebrations are in Sehore (24 Jan 2027) and Bhopal (25–26 Jan 2027). Here’s how to reach.",
    departureNote:
      "On 25 January morning, we leave Sehore for Shambhala Resort, Bhopal followed by the joyful Haldi ceremony at 12:00 PM.",
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
      q: "What time should I arrive for the ceremonies?",
      a: "For Sehore (24 Jan): Ganesh & Mata Pujan starts at 10:00 AM, Mandap at 12:00 PM, and Ghar Ki Haldi at 4:00 PM at our residence. For Bhopal (25 Jan): Haldi starts at 12:00 PM, Faldaan at 5:00 PM, and Ring Ceremony & Sangeet from 7:00 PM onwards. For Wedding Day (26 Jan): Baraat is at 11:00 AM, Varmala at 2:00 PM, and Reception from 8:00 PM onwards.",
    },
    {
      q: "What should I wear?",
      a: "Festive Indian attire is encouraged! Bright yellow & vibrant shades for Haldi, dazzling ethnic or Indo-western for Sangeet, and traditional or formal wear for the Baraat, Wedding, and Reception.",
    },
    {
      q: "When does the family travel from Sehore to Bhopal?",
      a: "On the morning of 25 January, we leave Sehore for Shambhala Resort, Bhauri, Bhopal (~45 mins drive). The resort has ample guest parking and stay arrangements.",
    },
    {
      q: "Who do I call if I need directions or help?",
      a: "Reach out to Atishay or the family host who invited you. Both Google Maps and Apple Maps navigation links are available on this page for quick directions.",
    },
  ],

  share: {
    text: "You're invited to Atishay & Anushka's wedding celebrations (24–26 Jan 2027 · Sehore & Bhopal). All details here:",
  },

  people: [
    {
      title: "Parents / निवेदक",
      note: "With the invitation",
      names: ["Rekha & Arvind Vishwakarma"],
    },
    {
      title: "Elders & Uncles / स्वागताकांक्षी",
      note: "With love & blessings",
      names: [
        "KK Deepak & Archana Deepak (Tauji & Taiji)",
        "JP Anand & Kiran Anand (Tauji & Taiji)",
        "Sandeep & Rashmi Vishwakarma (Chacha & Chachi)",
        "Dilip & Rekha Sharma (Fufaji & Bhuaji)",
        "RB & Kamlesh Gaur (Fufaji & Bhuaji)",
      ],
    },
    {
      title: "Maternal Family / ननिहाल पक्ष",
      note: "Nanaji, Mama-Mami & Mosaji-Mosi",
      names: [
        "AL Vishwakarma (Nanaji)",
        "Sheshpal & Jyoti Vishwakarma (Mama & Mami)",
        "Pankaj & Pushpa Tiwari (Mosaji & Mosi)",
      ],
    },
    {
      title: "Brothers & Sisters-in-law / स्नेही स्वजन",
      names: [
        "Haily & Risha Anand",
        "Somya & Yashika Tiwari",
      ],
    },
    {
      title: "Younger Siblings & Niece / बाल मनुहार",
      note: "Eagerly awaiting your presence",
      names: [
        "Jainick (Younger Brother)",
        "Kavya & Kanvi (Younger Sisters)",
        "Shreya Tiwari (Cousin Sister)",
        "Nusha (Niece)",
        "Ridhika",
        "Mohit & Rohit Vishwakarma",
        "Sarva",
        "Atharv",
      ],
    },
  ],

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
