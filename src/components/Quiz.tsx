import { useMemo, useState } from 'react'
import type { Choice, QuizQuestion } from '../types'

type Props = {
  questions: QuizQuestion[]
  onFinish: (score: number) => void
}

type AnswerValue = string | 'skipped'

function shuffleArray<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

/** Shuffle choice order and re-letter so the correct answer is randomly A/B/C/D… */
function shuffleQuestion(question: QuizQuestion): QuizQuestion {
  const correctText = question.choices.find((c) => c.id === question.answer)?.text
  if (!correctText) return question

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const shuffled: Choice[] = shuffleArray(question.choices).map((choice, index) => ({
    id: letters[index] ?? String(index + 1),
    text: choice.text,
  }))

  const answer = shuffled.find((c) => c.text === correctText)?.id ?? shuffled[0].id
  return { ...question, choices: shuffled, answer }
}

export function Quiz({ questions, onFinish }: Props) {
  const [shuffleKey, setShuffleKey] = useState(0)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({})
  const [finished, setFinished] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const deck = useMemo(
    () => questions.map(shuffleQuestion),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reshuffle only when retaking
    [questions, shuffleKey],
  )

  const question = deck[index]
  const revealed = selected !== null

  const scoreSoFar = deck.reduce((acc, q) => {
    const a = answers[q.id]
    return acc + (a && a !== 'skipped' && a === q.answer ? 1 : 0)
  }, 0)

  const pick = (choiceId: string) => {
    if (revealed || !question) return
    setSelected(choiceId)
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }))
  }

  const computeScore = (map: Record<number, AnswerValue>) =>
    deck.reduce((acc, q) => {
      const a = map[q.id]
      return acc + (a && a !== 'skipped' && a === q.answer ? 1 : 0)
    }, 0)

  const goTo = (nextIndex: number, map: Record<number, AnswerValue>) => {
    if (nextIndex >= deck.length) {
      const score = computeScore(map)
      setFinalScore(score)
      setFinished(true)
      onFinish(score)
      return
    }
    setIndex(nextIndex)
    const upcoming = deck[nextIndex]
    const prior = upcoming ? map[upcoming.id] : undefined
    setSelected(prior && prior !== 'skipped' ? prior : null)
  }

  const next = () => {
    if (!question || selected === null) return
    const map = { ...answers, [question.id]: selected }
    goTo(index + 1, map)
  }

  const skip = () => {
    if (!question || revealed) return
    const map = { ...answers, [question.id]: 'skipped' as const }
    setAnswers(map)
    goTo(index + 1, map)
  }

  const restart = () => {
    setShuffleKey((k) => k + 1)
    setIndex(0)
    setSelected(null)
    setAnswers({})
    setFinished(false)
    setFinalScore(0)
  }

  if (finished) {
    const pct = Math.round((finalScore / deck.length) * 100)
    const skippedCount = deck.filter((q) => answers[q.id] === 'skipped').length
    return (
      <div className="results">
        <p className="eyebrow">Quiz complete</p>
        <div className="results__score">
          {finalScore}/{deck.length}
        </div>
        <p>
          {skippedCount > 0
            ? `${skippedCount} skipped · `
            : ''}
          {pct >= 85
            ? 'Strong command of the high-yield material — review any misses below and keep the types sharp.'
            : pct >= 60
              ? 'Solid foundation. Revisit the keyed sections, then try again for mastery.'
              : 'Keep going. Focus the Key badges in the outline, then retake when ready.'}
        </p>
        <div className="cta-row" style={{ justifyContent: 'center' }}>
          <button type="button" className="btn btn-primary" onClick={restart}>
            Retake quiz
          </button>
          <a className="btn btn-ghost" href="#misses">
            Review answers
          </a>
        </div>
        <div id="misses" style={{ marginTop: '2.5rem', textAlign: 'left' }}>
          {deck.map((q) => {
            const yours = answers[q.id]
            const skipped = yours === 'skipped'
            const ok = !skipped && yours === q.answer
            const yourText = skipped
              ? 'Skipped'
              : yours
                ? `${yours}. ${q.choices.find((c) => c.id === yours)?.text ?? ''}`
                : '—'
            const correctText = `${q.answer}. ${q.choices.find((c) => c.id === q.answer)?.text ?? ''}`
            return (
              <div
                key={q.id}
                className="explain"
                style={{ marginBottom: '0.85rem' }}
              >
                <h4>
                  Q{q.id} · {ok ? 'Correct' : skipped ? 'Skipped' : 'Review'}
                </h4>
                <p>
                  <strong>{q.prompt}</strong>
                  <br />
                  Your answer: {yourText}
                  <br />
                  Correct: {correctText}
                  <br />
                  {q.explanation}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (!question) return null

  return (
    <div className="quiz-shell">
      <div className="quiz-progress">
        <span>
          Question {index + 1} of {deck.length}
        </span>
        <span>Score so far {scoreSoFar}</span>
      </div>
      <h2 className="quiz-prompt">{question.prompt}</h2>
      <div className="choices" role="listbox" aria-label="Answer choices">
        {question.choices.map((choice) => {
          let cls = 'choice'
          if (revealed) {
            if (choice.id === question.answer) cls += ' is-correct'
            else if (choice.id === selected) cls += ' is-wrong'
          }
          return (
            <button
              key={`${question.id}-${choice.id}-${choice.text.slice(0, 12)}`}
              type="button"
              className={cls}
              disabled={revealed}
              onClick={() => pick(choice.id)}
            >
              <span className="choice__letter">{choice.id}</span>
              <span>{choice.text}</span>
            </button>
          )
        })}
      </div>
      {revealed ? (
        <div className="explain">
          <h4>
            {selected === question.answer ? 'Correct' : 'Not quite'} · Answer{' '}
            {question.answer}
          </h4>
          <p>{question.explanation}</p>
        </div>
      ) : null}
      <div className="quiz-nav">
        <button
          type="button"
          className="btn btn-ghost"
          disabled={index === 0}
          onClick={() => {
            const prevIndex = Math.max(0, index - 1)
            setIndex(prevIndex)
            const prior = answers[deck[prevIndex]?.id]
            setSelected(prior && prior !== 'skipped' ? prior : null)
          }}
        >
          Back
        </button>
        <div className="quiz-nav__end">
          {!revealed ? (
            <button type="button" className="btn btn-ghost" onClick={skip}>
              {index >= deck.length - 1 ? 'Skip & finish' : 'Skip'}
            </button>
          ) : null}
          <button
            type="button"
            className="btn btn-primary"
            disabled={!revealed}
            onClick={next}
          >
            {index >= deck.length - 1 ? 'See results' : 'Next question'}
          </button>
        </div>
      </div>
    </div>
  )
}
