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

export type TravelMode = {
  mode: string
  name: string
  detail: string
  link: string
  secondaryLabel?: string
  secondaryLink?: string
}

const groomDayChoices = [
  { id: 'all' as const, title: 'All days', sub: '23, 24, 25 & 26 January' },
  { id: '25-26' as const, title: '25 & 26 only', sub: 'Bhopal · Haldi to Wedding' },
  { id: '26' as const, title: '26 only', sub: 'Wedding day' },
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
      travel: {
        ...bridePatrika.travel,
        modes: bridePatrika.travel.modes as unknown as TravelMode[],
      },
      faq: bridePatrika.faq,
      faqTip: bridePatrika.faqTip as string,
      faqSubtitle: bridePatrika.faqSubtitle,
      share: bridePatrika.share,
      eventsTitle: bridePatrika.eventsTitle,
      eventsSubtitle: bridePatrika.eventsSubtitle,
      dayChoices: bridePatrika.dayChoices,
      people: bridePatrika.people,
      mangalShlok: bridePatrika.mangalShlok,
      dinnerNote: bridePatrika.dinnerNote as string,
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
    timelineVenue: `${weddingConfig.venues.hotel.address}`,
    travel: {
      ...weddingConfig.travel,
      modes: weddingConfig.travel.modes as unknown as TravelMode[],
    },
    faq: weddingConfig.faq,
    faqTip: weddingConfig.travel.departureNote,
    faqSubtitle: 'Arrival times, travel tips, and celebration details',
    share: weddingConfig.share,
    eventsTitle: 'Wedding Events',
    eventsSubtitle: 'Four days of rituals and joy across Sehore & Bhopal',
    dayChoices: groomDayChoices,
    people: [] as typeof bridePatrika.people | [],
    mangalShlok: '' as string,
    dinnerNote: '' as string,
    footer: weddingConfig.footer,
    credit: weddingConfig.credit,
  }
}

export type SiteContent = ReturnType<typeof getSiteContent>
