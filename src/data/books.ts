import type { BookData, BookMeta } from '../types'
import genesis from './genesis.json'

export const booksCatalog: BookMeta[] = [
  {
    id: 'genesis',
    name: 'Genesis',
    hebrew: 'Bereshit',
    subtitle: 'Beginnings',
    testament: 'Old Testament',
    order: 1,
    chapters: '1–50',
    tagline:
      'Creation, the fall, the flood, and the patriarchal line of promise.',
    available: true,
  },
  {
    id: 'exodus',
    name: 'Exodus',
    hebrew: 'Shemot',
    subtitle: 'Departure',
    testament: 'Old Testament',
    order: 2,
    chapters: '1–40',
    tagline: 'Coming soon — redemption from Egypt and the covenant at Sinai.',
    available: false,
  },
  {
    id: 'leviticus',
    name: 'Leviticus',
    hebrew: 'Vayikra',
    subtitle: 'And He Called',
    testament: 'Old Testament',
    order: 3,
    chapters: '1–27',
    tagline: 'Coming soon — holiness, sacrifice, and the sanctuary.',
    available: false,
  },
  {
    id: 'numbers',
    name: 'Numbers',
    hebrew: 'Bamidbar',
    subtitle: 'In the Wilderness',
    testament: 'Old Testament',
    order: 4,
    chapters: '1–36',
    tagline: 'Coming soon — wilderness wanderings and faithfulness.',
    available: false,
  },
  {
    id: 'deuteronomy',
    name: 'Deuteronomy',
    hebrew: 'Devarim',
    subtitle: 'Words',
    testament: 'Old Testament',
    order: 5,
    chapters: '1–34',
    tagline: 'Coming soon — covenant renewal before the Jordan.',
    available: false,
  },
]

const bookData: Record<string, BookData> = {
  genesis: genesis as BookData,
}

export function getBook(id: string): BookData | null {
  return bookData[id] ?? null
}

export function getCatalogEntry(id: string): BookMeta | undefined {
  return booksCatalog.find((b) => b.id === id)
}
