// ============================================================
//  Somya & Yashika — Wedding details (from invitation)
// ============================================================

export const weddingConfig = {
  siteUrl: "https://wedding.st59.in",
  blessing: "॥ श्री गणेशाय नमः ॥",

  couple: {
    partner1: "Somya",
    partner2: "Yashika",
    partner1Full: "Somya Tiwari",
    partner2Full: "Yashika Bum",
    hashtag: "#YashikaAndSomya",
  },

  date: {
    full: "Monday, November 30, 2026",
    short: "30 November 2026",
    iso: "2026-11-30T12:30:00",
    foreverLabel: "days to forever",
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
    signOff: "— Somya & Yashika",
  },

  credit: {
    line: "Crafted with love by Somya · vibe-coded for Yashika & family",
  },

  /**
   * Default WhatsApp sign-off (Somya / Tiwari).
   * Overridden per domain in src/config/sides.ts
   */
  inviteFrom: "Pankaj Tiwari & Family",


  /** Pure Hindi note — Malwa / Indian touch only */
  ours: {
    lines: [
      "यह कोई सामान्य कार्ड नहीं — हमने इसे आपके लिए ही रखा है।",
      "आपके आने से हमारा घर पूरा लगेगा।",
    ],
    signOff: "— याशिका व सोम्य",
  },

  story: {
    title: "Our Story",
    paragraphs: [
      "What began in 2015 as a simple friendship slowly grew into something deeper — built on trust, laughter, and countless shared moments.",
      "In 2018, friendship turned into love, and we chose to walk this journey together. Years of understanding and growing side by side brought us closer with every passing day.",
      "In 2025, our families came together as we got rokafied. Now in 2026, we begin forever — and your presence would mean the world to us.",
    ],
    milestones: [
      { year: "2015", event: "First met as friends" },
      { year: "2018", event: "Came into a relationship" },
      { year: "2025", event: "Got rokafied" },
      { year: "2026", event: "Our wedding" },
    ],
  },

  venues: {
    home: {
      name: "Residence",
      address:
        "34, Ghisaji Patel Nagar, behind Devi Dham Temple, Bicholi Mardana Road, Indore",
      shortAddress: "Bicholi Mardana, Indore",
      mapUrl: "https://maps.app.goo.gl/Z7r83DqQ7PmAzMMx8",
      appleMapsUrl:
        "https://maps.apple.com/?q=34%20Ghisaji%20Patel%20Nagar%20Bicholi%20Mardana%20Indore",
      googleMapsUrl: "https://maps.app.goo.gl/Z7r83DqQ7PmAzMMx8",
    },
    hotel: {
      name: "Hotel Imperial Grand",
      address: "Hari Phatak Indore Road, Imperial Square, Ujjain",
      shortAddress: "Imperial Square, Ujjain",
      mapUrl: "https://maps.app.goo.gl/FYgbohYaJWyP8ij26",
      appleMapsUrl:
        "https://maps.apple.com/?q=Hotel%20Imperial%20Grand%20Imperial%20Square%20Ujjain",
      googleMapsUrl: "https://maps.app.goo.gl/FYgbohYaJWyP8ij26",
    },
  },

  celebrationDays: [
    {
      day: 27 as const,
      dayLabel: "Day 01",
      date: "Friday, 27 November 2026",
      dateShort: "27 Nov",
      venueKey: "home" as const,
      city: "Indore",
      events: [
        { nameHi: "माता पूजन", name: "Mata Pujan", time: "10:00 AM", host: "groom" as const },
        { nameHi: "गणेश पूजन", name: "Ganesh Pujan", time: "7:00 PM", host: "groom" as const },
      ],
    },
    {
      day: 28 as const,
      dayLabel: "Day 02",
      date: "Saturday, 28 November 2026",
      dateShort: "28 Nov",
      venueKey: "home" as const,
      city: "Indore",
      events: [{ nameHi: "मंडप", name: "Mandap", time: "12:00 PM", host: "groom" as const }],
    },
    {
      day: 29 as const,
      dayLabel: "Day 03",
      date: "Sunday, 29 November 2026",
      dateShort: "29 Nov",
      venueKey: "hotel" as const,
      city: "Ujjain",
      events: [
        { nameHi: "सगाई", name: "Sagai", time: "10:30 AM", host: "groom" as const },
        { nameHi: "हल्दी", name: "Haldi", time: "2:30 PM", host: "groom" as const },
        { nameHi: "संगीत", name: "Sangeet", time: "7:30 PM", host: "groom" as const },
      ],
    },
    {
      day: 30 as const,
      dayLabel: "Day 04",
      date: "Monday, 30 November 2026",
      dateShort: "30 Nov",
      venueKey: "hotel" as const,
      city: "Ujjain",
      events: [
        { nameHi: "बारात", name: "Baraat", time: "10:00 AM", host: "groom" as const },
        { nameHi: "शुभ लग्न", name: "Shubh Lagn", time: "12:30 PM", host: "groom" as const },
        { nameHi: "रिसेप्शन", name: "Reception", time: "7:30 PM onwards", host: "groom" as const },
      ],
    },
  ],

  calendarEvents: [
    {
      day: 27 as const,
      host: "groom" as const,
      title: "Yashika & Somya — Mata Pujan & Ganesh Pujan",
      start: "20261127T100000",
      end: "20261127T210000",
      location: "34, Ghisaji Patel Nagar, Bicholi Mardana, Indore",
      description: "Mata Pujan 10:00 AM · Ganesh Pujan 7:00 PM",
    },
    {
      day: 28 as const,
      host: "groom" as const,
      title: "Yashika & Somya — Mandap",
      start: "20261128T120000",
      end: "20261128T150000",
      location: "34, Ghisaji Patel Nagar, Bicholi Mardana, Indore",
      description: "Mandap ceremony at 12:00 PM",
    },
    {
      day: 29 as const,
      host: "groom" as const,
      title: "Yashika & Somya — Sagai, Haldi & Sangeet",
      start: "20261129T103000",
      end: "20261129T230000",
      location: "Hotel Imperial Grand, Imperial Square, Ujjain",
      description: "Sagai 10:30 AM · Haldi 2:30 PM · Sangeet 7:30 PM",
    },
    {
      day: 30 as const,
      host: "groom" as const,
      title: "Yashika & Somya — Wedding & Reception",
      start: "20261130T100000",
      end: "20261130T230000",
      location: "Hotel Imperial Grand, Imperial Square, Ujjain",
      description: "Baraat 10:00 AM · Shubh Lagn 12:30 PM · Reception 7:30 PM",
    },
  ],

  timeline: [
    { time: "10:00 AM", title: "Baraat", description: "Groom's procession arrives" },
    { time: "12:30 PM", title: "Shubh Lagn", description: "Wedding ceremony begins" },
    { time: "3:00 PM", title: "Lunch & Photos", description: "Celebrate with family" },
    { time: "7:30 PM", title: "Reception", description: "Dinner, blessings & celebration" },
  ],

  travel: {
    title: "Travel",
    note: "Celebrations are in Indore (27–28 Nov) and Ujjain (29–30 Nov). Here’s how to reach.",
    leaveIndoreOn29:
      "On 29 November we leave Indore by 8:00 AM for Ujjain (Sagai begins 10:30 AM at Hotel Imperial Grand). Plan to be ready and on the road early.",
    modes: [
      {
        mode: "Airport",
        name: "Devi Ahilya Bai Holkar Airport (IDR), Indore",
        detail:
          "Nearest airport for both cities. About 45 minutes to the Indore venue, and about 1 hour to Hotel Imperial Grand, Ujjain by cab.",
        link: "https://www.google.com/maps/search/?api=1&query=Devi+Ahilya+Bai+Holkar+Airport+Indore",
      },
      {
        mode: "Railway",
        name: "Indore Junction (INDB) & Ujjain Junction (UJN)",
        detail:
          "For 27–28 Nov events, arrive at Indore Junction. For 29–30 Nov events, Ujjain Junction is closest to Hotel Imperial Grand (~15–20 min).",
        link: "https://www.google.com/maps/search/?api=1&query=Ujjain+Junction+Railway+Station",
      },
      {
        mode: "Bus",
        name: "Indore ISBT & Ujjain Bus Stand",
        detail:
          "Regular interstate and local buses connect Indore and Ujjain (approx. 1–1.5 hours). Convenient if you’re travelling within Madhya Pradesh.",
        link: "https://www.google.com/maps/search/?api=1&query=Ujjain+Bus+Stand",
      },
    ],
  },

  faq: [
    {
      q: "What time should I arrive?",
      a: "Please arrive 20–30 minutes before each ceremony. For Mata Pujan (27 Nov) be there by 9:30 AM. For Sagai (29 Nov) by 10:00 AM. For Baraat / Shubh Lagn (30 Nov) by 9:30–10:00 AM. For Reception, 7:00 PM is comfortable.",
    },
    {
      q: "When do we leave Indore on 29 November?",
      a: "The family leaves Indore by 8:00 AM on 29 November for Ujjain. Sagai starts at 10:30 AM at Hotel Imperial Grand — please travel early so everyone settles in calmly.",
    },
    {
      q: "Indore → Ujjain travel tip?",
      a: "The drive is about 1–1.5 hours depending on traffic. Cab / private car is easiest for guests with elders. Trains and buses also run frequently between Indore and Ujjain.",
    },
    {
      q: "What should I wear?",
      a: "Traditional Indian attire is encouraged for all ceremonies — festive colors for Haldi & Sangeet, elegant ethnic or formal wear for Wedding & Reception.",
    },
    {
      q: "Is there parking?",
      a: "Street parking is available near the Indore residence. At Hotel Imperial Grand, Ujjain, hotel parking / nearby parking will be available for guests.",
    },
    {
      q: "Are kids welcome?",
      a: "Absolutely — little ones are part of the celebration. For longer evening functions, a quiet corner / early exit is totally fine.",
    },
    {
      q: "Who do I call if I’m lost?",
      a: "Reach out to Somya or the family host who invited you. Use the map buttons on this site — Google Maps and Apple Maps both work.",
    },
  ],

  share: {
    text: "You're invited to Yashika & Somya's wedding celebrations (27–30 Nov 2026, Indore & Ujjain). All details here:",
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
