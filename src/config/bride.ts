/**
 * Yashika’s patrika — same website shape as Somya’s card (wedding.ts).
 * Shown on the bride domain / ?side=yashika. Look stays shared.
 *
 * Spellings कंटक · नावे · लुंकड़ are as they appear on the printed card;
 * confirm those three before a final typed print.
 */

const dharamshalaMaps =
  'https://www.google.com/maps/search/?api=1&query=Jain+Oswal+Dharamshala+Nayapura+Ujjain'
const hotelMaps = 'https://maps.app.goo.gl/FYgbohYaJWyP8ij26'

export const bridePatrika = {
  blessing: '॥ श्री गणेशाय नमः ॥',
  blessings: [
    '॥ श्री गणेशाय नमः ॥',
    '॥ श्री दादागुरुदेव नमः ॥',
    '॥ श्री महावीराय नमः ॥',
    '॥ श्री अवन्ति पार्श्वनाथाय नमः ॥',
  ],
  invitationBlessings: [
    '॥ श्री मणिभद्राय नमः ॥',
    '॥ श्री आदिनाथाय नमः ॥',
    '॥ श्री गौतम स्वामी नमः ॥',
  ],
  mangalShlok:
    'मंगलम् भगवान वीरो, मंगलम् गौतम प्रभुः। मंगलम् स्थूलि भद्राद्यो, जैन धर्मोस्तु मंगलम्॥',

  couple: {
    partner1: 'Somya',
    partner2: 'Yashika',
    partner1Full: 'Somya Tiwari',
    partner2Full: 'Yashika Bum',
    hashtag: '#YashikaAndSomya',
    bride: {
      printed: 'सौ. कां. याशिका',
      printedEn: 'Yashika Bum',
      parents: 'श्रीमती प्रतिभा–दीपक बम',
      parentsEn: 'Pratibha & Deepak Bum',
      grandparents: 'स्व. श्रीमती नीरू बेन–स्व. श्री मदनलाल जी बम',
      city: 'Ujjain',
    },
    groom: {
      printed: 'चि. सौम्य',
      printedEn: 'Somya Tiwari',
      parents: 'श्रीमती पुष्पा–पंकज जी तिवारी',
      parentsEn: 'Pushpa & Pankaj Tiwari',
      grandparents: 'श्रीमती संगीता–रामेश्वर जी तिवारी',
      city: 'Indore',
    },
  },

  inviteFrom: 'प्रतिभा–दीपक बम',
  inviteFromEn: 'Pratibha & Deepak Bum',
  hosts: ['सौ. प्रतिभा–दीपक बम', 'चि. चिराग बम'],

  hero: {
    tagline:
      'Together with their families, joyfully invite you to the wedding celebrations',
    closing: 'As we begin our forever',
  },

  ours: {
    lines: [
      'परिवार, जिनेन्द्र भगवान, कुलदेवी, देवता एवं पूर्वजों की कृपा से परिणय संस्कार का यह शुभ अवसर आया है।',
      'इस अवसर पर पधारकर वर-वधु को आशीर्वाद प्रदान कर हमें अनुगृहित करें।',
    ],
    signOff: '— Yashika & Somya',
  },

  eventsTitle: 'Wedding Events',
  eventsSubtitle: 'Three days of rituals and joy in Ujjain · 28–30 November 2026',

  dinnerNote: 'रात्री भोजन त्यागी सूर्यास्त पूर्व आमंत्रित है',

  venues: {
    dharamshala: {
      name: 'Jain Oswal Dharamshala',
      address: 'Nayapura, Ujjain',
      shortAddress: 'Nayapura, Ujjain',
      mapUrl: dharamshalaMaps,
      appleMapsUrl:
        'https://maps.apple.com/?q=Jain%20Oswal%20Dharamshala%20Nayapura%20Ujjain',
      googleMapsUrl: dharamshalaMaps,
    },
    hotel: {
      name: 'Hotel Imperial Grand',
      address:
        'Indore Road, near Hari Phatak overbridge, Ujjain',
      shortAddress: 'Hari Phatak, Ujjain',
      mapUrl: hotelMaps,
      appleMapsUrl:
        'https://maps.apple.com/?q=Hotel%20Imperial%20Grand%20Hari%20Phatak%20Ujjain',
      googleMapsUrl: hotelMaps,
    },
  },

  celebrationDays: [
    {
      day: 28 as const,
      dayLabel: 'Day 01',
      date: 'Saturday, 28 November 2026',
      dateShort: '28 Nov',
      venueKey: 'dharamshala' as const,
      city: 'Ujjain',
      events: [
        { nameHi: 'माता पूजन', name: 'Mata Pujan', time: '9:30 AM' },
        { nameHi: 'गणेश पूजन', name: 'Ganesh Pujan', time: '10:00 AM' },
      ],
    },
    {
      day: 29 as const,
      dayLabel: 'Day 02',
      date: 'Sunday, 29 November 2026',
      dateShort: '29 Nov',
      venueKey: 'hotel' as const,
      city: 'Ujjain',
      events: [
        { nameHi: 'सगाई', name: 'Sagai', time: '11:30 AM' },
        { nameHi: 'हल्दी', name: 'Haldi', time: '3:00 PM' },
        { nameHi: 'महिला संगीत', name: 'Mahila Sangeet', time: '7:30 PM' },
      ],
    },
    {
      day: 30 as const,
      dayLabel: 'Day 03',
      date: 'Monday, 30 November 2026',
      dateShort: '30 Nov',
      venueKey: 'hotel' as const,
      city: 'Ujjain',
      events: [
        { nameHi: 'बारात', name: 'Baraat', time: '10:00 AM' },
        { nameHi: 'शुभ लग्न', name: 'Shubh Lagn', time: '12:30 PM' },
        {
          nameHi: 'आशीर्वाद समारोह एवं माधुर्यभोज',
          name: 'Aashirwad Samaroh & Madhuryabhoj',
          time: '7:30 PM onwards',
          note: 'रात्री भोजन त्यागी सूर्यास्त पूर्व आमंत्रित है',
        },
      ],
    },
  ],

  calendarEvents: [
    {
      day: 28 as const,
      title: 'Yashika & Somya — Mata Pujan & Ganesh Pujan',
      start: '20261128T093000',
      end: '20261128T120000',
      location: 'Jain Oswal Dharamshala, Nayapura, Ujjain',
      description: 'Mata Pujan 9:30 AM · Ganesh Pujan 10:00 AM',
    },
    {
      day: 29 as const,
      title: 'Yashika & Somya — Sagai, Haldi & Mahila Sangeet',
      start: '20261129T113000',
      end: '20261129T230000',
      location: 'Hotel Imperial Grand, Hari Phatak, Ujjain',
      description: 'Sagai 11:30 AM · Haldi 3:00 PM · Mahila Sangeet 7:30 PM',
    },
    {
      day: 30 as const,
      title: 'Yashika & Somya — Wedding & Aashirwad Samaroh',
      start: '20261130T100000',
      end: '20261130T230000',
      location: 'Hotel Imperial Grand, Hari Phatak, Ujjain',
      description:
        'Baraat 10:00 AM · Shubh Lagn 12:30 PM · Blessings ceremony & dinner 7:30 PM. Guests who do not take the night meal are invited before sunset.',
    },
  ],

  timeline: [
    { time: '10:00 AM', title: 'Baraat', description: "Groom's procession arrives" },
    { time: '12:30 PM', title: 'Shubh Lagn', description: 'Wedding ceremony begins' },
    {
      time: '7:30 PM',
      title: 'Blessings & dinner',
      description: 'Aashirwad Samaroh & Madhuryabhoj — until you arrive',
    },
  ],
  timelineVenue: 'Hotel Imperial Grand, Indore Road, near Hari Phatak overbridge, Ujjain',

  travel: {
    title: 'Travel',
    note: 'Yashika’s celebrations are in Ujjain (28–30 November).',
    leaveIndoreOn29: '',
    modes: [
      {
        mode: 'Airport',
        name: 'Devi Ahilya Bai Holkar Airport (IDR), Indore',
        detail:
          'About 1 hour by cab to Ujjain. Jain Oswal Dharamshala (Nayapura) for 28 Nov; Hotel Imperial Grand (Hari Phatak) for 29–30 Nov.',
        link: 'https://www.google.com/maps/search/?api=1&query=Devi+Ahilya+Bai+Holkar+Airport+Indore',
      },
      {
        mode: 'Railway',
        name: 'Ujjain Junction (UJN)',
        detail:
          'Closest station for all three days. Dharamshala (Nayapura) and Hotel Imperial Grand are a short ride from the junction.',
        link: 'https://www.google.com/maps/search/?api=1&query=Ujjain+Junction+Railway+Station',
      },
      {
        mode: 'Bus',
        name: 'Ujjain Bus Stand',
        detail:
          'Regular buses from Indore (~1–1.5 hours) and across Madhya Pradesh.',
        link: 'https://www.google.com/maps/search/?api=1&query=Ujjain+Bus+Stand',
      },
    ],
  },

  faq: [
    {
      q: 'What time should I arrive?',
      a: 'Please arrive 20–30 minutes early. Mata Pujan (28 Nov) by 9:00 AM at Jain Oswal Dharamshala, Nayapura. Sagai (29 Nov) by 11:00 AM. Baraat / Shubh Lagn (30 Nov) by 9:30–10:00 AM. Aashirwad Samaroh from 7:00 PM is comfortable.',
    },
    {
      q: 'Where is 28 November?',
      a: 'Jain Oswal Dharamshala, Nayapura, Ujjain — Mata Pujan 9:30 AM, Ganesh Pujan 10:00 AM.',
    },
    {
      q: 'Where are 29 & 30 November?',
      a: 'The card prints Hotel Imperial Grand (Indore Road, near Hari Phatak overbridge, Ujjain) under the 30 November block. 29 November and the 30 November baraat/lagna do not list a separate venue.',
    },
    {
      q: 'If we do not take dinner at night?',
      a: 'Guests who do not take the night meal are invited before sunset. (रात्री भोजन त्यागी सूर्यास्त पूर्व आमंत्रित है)',
    },
    {
      q: 'What should I wear?',
      a: 'Traditional Indian attire — festive for Haldi & Mahila Sangeet, elegant ethnic or formal for Shubh Lagn and Aashirwad Samaroh.',
    },
  ],

  share: {
    text: "You're invited to Yashika & Somya's wedding celebrations (28–30 Nov 2026, Ujjain). All details here:",
  },

  faqTip: '',
  faqSubtitle: 'Venues, arrival times, and the night-meal note from the card',

  dayChoices: [
    { id: 'all' as const, title: 'All days', sub: '28, 29 & 30 November · Ujjain' },
    { id: '29-30' as const, title: '29 & 30 only', sub: 'Sagai to Wedding · Ujjain' },
    { id: '30' as const, title: '30 only', sub: 'Wedding day' },
  ],

  people: [
    {
      title: 'Blessings of elders',
      note: 'Remembered with love',
      names: [
        'स्व. नीरू बेन–स्व. मदनलाल जी बम',
        'स्व. सज्जन बेन–स्व. पवनकुमार जी छाजेड़',
        'स्व. माणक बेन–स्व. जड़ावचन्द जी सुराणा',
      ],
    },
    {
      title: 'With love & blessings',
      names: [
        'रखबचन्द जी',
        'प्रेमचन्द जी',
        'डॉ. विमलचन्द जी',
        'विजयचन्द जी',
        'हंसराज जी',
        'मंगल लता बम',
        'समस्त बम परिवार — नेवरी वाले',
      ],
    },
    {
      title: 'Eager to welcome',
      names: [
        'श्रीमती संगीता–प्रकाश जी चोपड़ा — इन्दौर',
        'श्रीमती हीरा–ललित जी डाबरिया — अजमेर',
      ],
    },
    {
      title: 'Hosts',
      note: 'With the invitation',
      names: ['सौ. प्रतिभा–दीपक बम', 'चि. चिराग बम'],
    },
    {
      title: 'Awaiting you',
      names: ['रितिका', 'हर्षित', 'हर्षल', 'दिव्यता', 'नताशा'],
    },
    {
      title: 'Maternal family',
      note: 'As printed on the card',
      names: [
        'श्रीमती हुकम बाई–स्व. बाबूलाल जी — कंटक',
        'स्व. हुकमचन्द जी',
        'श्री श्रेणिक जी — कुरुक्षेत्र',
        'श्री राजेन्द्र जी',
        'स्व. ललित जी',
        'अमित जी',
        'सुमित जी',
        'सिद्धार्थ जी — नावे',
        'गौतम जी',
        'श्रेयांश जी',
        'वैभव जी',
        'रौनक जी',
        'कनिष्क',
        'लुंकड़ परिवार, महिदपुर',
      ],
    },
    {
      title: "Somya's family",
      names: ['श्रीमान रामेश्वर जी', 'पंकज जी', 'नीरज जी तिवारी', 'इन्दौर'],
    },
  ],
} as const
