import type { BookData, BookMeta } from '../types'
import daniel from './daniel.json'
import exodus from './exodus.json'
import genesis from './genesis.json'
import isaiah from './isaiah.json'
import john from './john.json'
import leviticus from './leviticus.json'
import revelation from './revelation.json'

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
    tagline: 'Redemption from Egypt, covenant at Sinai, and the sanctuary.',
    available: true,
  },
  {
    id: 'leviticus',
    name: 'Leviticus',
    hebrew: 'Vayikra',
    subtitle: 'And He Called',
    testament: 'Old Testament',
    order: 3,
    chapters: '1–27',
    tagline: 'Holiness, sacrifice, and the sanctuary at the heart of the Pentateuch.',
    available: true,
  },
  {
    id: 'isaiah',
    name: 'Isaiah',
    hebrew: 'Yeshayahu',
    subtitle: 'Yahweh is Salvation',
    testament: 'Old Testament',
    order: 23,
    chapters: '1–66',
    tagline: 'The evangelical prophet — Messiah, Servant, and new creation.',
    available: true,
  },
  {
    id: 'daniel',
    name: 'Daniel',
    hebrew: 'Daniyyel',
    subtitle: 'God is My Judge',
    testament: 'Old Testament',
    order: 27,
    chapters: '1–12',
    tagline: 'Faithfulness in exile and the sweep of prophetic history.',
    available: true,
  },
  {
    id: 'john',
    name: 'John',
    subtitle: 'The Word Made Flesh',
    testament: 'New Testament',
    order: 43,
    chapters: '1–21',
    tagline: 'Signs, discourses, and life through His name.',
    available: true,
  },
  {
    id: 'revelation',
    name: 'Revelation',
    subtitle: 'The Revelation of Jesus Christ',
    testament: 'New Testament',
    order: 66,
    chapters: '1–22',
    tagline: 'Christ unveiled — churches, conflict, and the new earth.',
    available: true,
  },
]

const bookData: Record<string, BookData> = {
  genesis: genesis as BookData,
  exodus: exodus as BookData,
  leviticus: leviticus as BookData,
  isaiah: isaiah as BookData,
  daniel: daniel as BookData,
  john: john as BookData,
  revelation: revelation as BookData,
}

export function getBook(id: string): BookData | null {
  return bookData[id] ?? null
}

export function getCatalogEntry(id: string): BookMeta | undefined {
  return booksCatalog.find((b) => b.id === id)
}

export const availableBooks = booksCatalog.filter((b) => b.available)
