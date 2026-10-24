import { useCallback, useEffect, useState } from 'react'

type BookProgress = {
  completedSections: string[]
  quizBest: number | null
  quizAttempts: number
  highYieldOnly: boolean
}

const STORAGE_KEY = 'bible-outlines-progress-v1'

function readAll(): Record<string, BookProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, BookProgress>) : {}
  } catch {
    return {}
  }
}

function writeAll(data: Record<string, BookProgress>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const defaultProgress = (): BookProgress => ({
  completedSections: [],
  quizBest: null,
  quizAttempts: 0,
  highYieldOnly: false,
})

export function useProgress(bookId: string) {
  const [progress, setProgress] = useState<BookProgress>(defaultProgress)

  useEffect(() => {
    const all = readAll()
    setProgress(all[bookId] ?? defaultProgress())
  }, [bookId])

  const persist = useCallback(
    (next: BookProgress) => {
      setProgress(next)
      const all = readAll()
      all[bookId] = next
      writeAll(all)
    },
    [bookId],
  )

  const toggleSection = useCallback(
    (sectionId: string) => {
      const set = new Set(progress.completedSections)
      if (set.has(sectionId)) set.delete(sectionId)
      else set.add(sectionId)
      persist({ ...progress, completedSections: [...set] })
    },
    [persist, progress],
  )

  const recordQuiz = useCallback(
    (score: number) => {
      persist({
        ...progress,
        quizAttempts: progress.quizAttempts + 1,
        quizBest:
          progress.quizBest === null
            ? score
            : Math.max(progress.quizBest, score),
      })
    },
    [persist, progress],
  )

  const setHighYieldOnly = useCallback(
    (value: boolean) => {
      persist({ ...progress, highYieldOnly: value })
    },
    [persist, progress],
  )

  return {
    progress,
    toggleSection,
    recordQuiz,
    setHighYieldOnly,
  }
}
