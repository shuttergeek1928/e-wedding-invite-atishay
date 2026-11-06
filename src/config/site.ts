import { bridePatrika } from './bride'
import { hostFamilies, type HostFamily } from './sides'
import { weddingConfig } from './wedding'

export type SiteVenue = {
  name: string
  address: string
  shortAddress: string
  mapUrl: string
  appleMapsUrl: string
  googleMapsUrl: string
}

export type SiteEvent = {
  nameHi: string
  name: string
  time: string
  note?: string
  host?: HostFamily | 'both'
}

export type SiteDay = {
  day: number
  dayLabel: string
  date: string
  dateShort: string
  venueKey: string
  city: string
  events: SiteEvent[]
}

const groomDayChoices = [
  { id: 'all' as const, title: 'All days', sub: '27, 28, 29 & 30 November' },
  { id: '29-30' as const, title: '29 & 30 only', sub: 'Ujjain · Sagai to Wedding' },
  { id: '30' as const, title: '30 only', sub: 'Wedding day' },
]

export function getSiteContent(family: HostFamily) {
  if (family === 'bride') {
    return {
      family: 'bride' as const,
      blessing: bridePatrika.blessing,
      couple: weddingConfig.couple,
      printedCouple: bridePatrika.couple,
      date: weddingConfig.date,
      hero: bridePatrika.hero,
      ours: bridePatrika.ours,
      inviteFrom: bridePatrika.inviteFromEn,
      venues: {
        home: weddingConfig.venues.home,
        hotel: bridePatrika.venues.hotel,
        dharamshala: bridePatrika.venues.dharamshala,
      } as Record<string, SiteVenue>,
      celebrationDays: bridePatrika.celebrationDays as unknown as SiteDay[],
      calendarEvents: bridePatrika.calendarEvents,
      timeline: bridePatrika.timeline,
      timelineVenue: bridePatrika.timelineVenue,
      travel: bridePatrika.travel,
      faq: bridePatrika.faq,
      faqTip: bridePatrika.faqTip,
      faqSubtitle: bridePatrika.faqSubtitle,
      share: bridePatrika.share,
      eventsTitle: bridePatrika.eventsTitle,
      eventsSubtitle: bridePatrika.eventsSubtitle,
      dayChoices: bridePatrika.dayChoices,
      people: bridePatrika.people,
      mangalShlok: bridePatrika.mangalShlok,
      dinnerNote: bridePatrika.dinnerNote,
      footer: weddingConfig.footer,
      credit: weddingConfig.credit,
    }
  }

  return {
    family: 'groom' as const,
    blessing: weddingConfig.blessing,
    couple: weddingConfig.couple,
    printedCouple: null,
    date: weddingConfig.date,
    hero: weddingConfig.hero,
    ours: weddingConfig.ours,
    inviteFrom: hostFamilies.groom.inviteFrom,
    venues: {
      home: weddingConfig.venues.home,
      hotel: weddingConfig.venues.hotel,
    } as Record<string, SiteVenue>,
    celebrationDays: weddingConfig.celebrationDays as unknown as SiteDay[],
    calendarEvents: weddingConfig.calendarEvents,
    timeline: weddingConfig.timeline,
    timelineVenue: `${weddingConfig.venues.hotel.name}, ${weddingConfig.venues.hotel.shortAddress}`,
    travel: weddingConfig.travel,
    faq: weddingConfig.faq,
    faqTip: weddingConfig.travel.leaveIndoreOn29,
    faqSubtitle: 'Arrival times, travel tips, and the Indore → Ujjain plan',
    share: weddingConfig.share,
    eventsTitle: 'Wedding Events',
    eventsSubtitle: 'Four days of rituals and joy across Indore and Ujjain',
    dayChoices: groomDayChoices,
    people: [] as typeof bridePatrika.people | [],
    mangalShlok: '',
    dinnerNote: '',
    footer: weddingConfig.footer,
    credit: weddingConfig.credit,
  }
}

export type SiteContent = ReturnType<typeof getSiteContent>
