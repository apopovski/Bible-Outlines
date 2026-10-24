import { Link, useParams } from 'react-router-dom'
import { Quiz } from '../components/Quiz'
import { getBook } from '../data/books'
import { useProgress } from '../hooks/useProgress'

export function QuizPage() {
  const { bookId = '' } = useParams()
  const book = getBook(bookId)
  const { progress, recordQuiz } = useProgress(bookId)

  if (!book) {
    return (
      <main className="section">
        <h1>Quiz unavailable</h1>
        <p>
          <Link to="/">Back to library</Link>
        </p>
      </main>
    )
  }

  return (
    <main>
      <section className="section" style={{ paddingTop: '2rem' }}>
        <p className="eyebrow">
          {book.meta.name} · Review quiz
          {progress.quizBest !== null
            ? ` · Best ${progress.quizBest}/${book.quiz.length}`
            : ''}
        </p>
        <div className="section-head">
          <h2>Prove the outline</h2>
          <p>
            Answer, then read the explanation before moving on. Retakes are
            unlimited.
          </p>
        </div>
        <Quiz questions={book.quiz} onFinish={recordQuiz} />
        <p style={{ marginTop: '2rem' }}>
          <Link to={`/books/${book.meta.id}`}>← Return to {book.meta.name}</Link>
        </p>
      </section>
    </main>
  )
}
