import { useState } from 'react'
import type { QuizQuestion } from '../types'

type Props = {
  questions: QuizQuestion[]
  onFinish: (score: number) => void
}

export function Quiz({ questions, onFinish }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [finished, setFinished] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const question = questions[index]
  const revealed = selected !== null

  const scoreSoFar = Object.entries(answers).filter(([id, a]) => {
    const q = questions.find((x) => String(x.id) === id)
    return q && q.answer === a
  }).length

  const pick = (choiceId: string) => {
    if (revealed || !question) return
    setSelected(choiceId)
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }))
  }

  const computeScore = (map: Record<number, string>) =>
    questions.reduce((acc, q) => acc + (map[q.id] === q.answer ? 1 : 0), 0)

  const next = () => {
    if (!question || selected === null) return
    const map = { ...answers, [question.id]: selected }
    if (index >= questions.length - 1) {
      const score = computeScore(map)
      setFinalScore(score)
      setFinished(true)
      onFinish(score)
      return
    }
    setIndex((i) => i + 1)
    const upcoming = questions[index + 1]
    setSelected(upcoming ? (map[upcoming.id] ?? null) : null)
  }

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setAnswers({})
    setFinished(false)
    setFinalScore(0)
  }

  if (finished) {
    const pct = Math.round((finalScore / questions.length) * 100)
    return (
      <div className="results">
        <p className="eyebrow">Quiz complete</p>
        <div className="results__score">
          {finalScore}/{questions.length}
        </div>
        <p>
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
          {questions.map((q) => {
            const yours = answers[q.id]
            const ok = yours === q.answer
            return (
              <div
                key={q.id}
                className="explain"
                style={{ marginBottom: '0.85rem' }}
              >
                <h4>
                  Q{q.id} · {ok ? 'Correct' : 'Review'}
                </h4>
                <p>
                  <strong>{q.prompt}</strong>
                  <br />
                  Your answer: {yours}. Correct: {q.answer}.
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
          Question {index + 1} of {questions.length}
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
              key={choice.id}
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
            setSelected(answers[questions[prevIndex]?.id] ?? null)
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!revealed}
          onClick={next}
        >
          {index >= questions.length - 1 ? 'See results' : 'Next question'}
        </button>
      </div>
    </div>
  )
}
