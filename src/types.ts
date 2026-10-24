export type Choice = { id: string; text: string }

export type QuizQuestion = {
  id: number
  prompt: string
  choices: Choice[]
  answer: string
  explanation: string
}

export type Point = {
  n: number
  text: string
  highYield: boolean
  subpoints: { letter: string; text: string }[]
}

export type Subsection = {
  letter: string
  title: string
  highYield: boolean
  points: Point[]
  commentary: string | null
}

export type Section = {
  id: string
  roman: string
  title: string
  subsections: Subsection[]
  points: Point[]
}

export type TypePair = {
  type: string
  antitype: string
  scripture: string
}

export type BookMeta = {
  id: string
  name: string
  hebrew?: string | null
  subtitle: string
  testament: 'Old Testament' | 'New Testament'
  order: number
  chapters: string
  tagline: string
  divisions?: { title: string; range: string; focus: string }[]
  available: boolean
}

export type BookData = {
  meta: Omit<BookMeta, 'available'> & { available?: boolean }
  sections: Section[]
  types: TypePair[]
  quiz: QuizQuestion[]
}
