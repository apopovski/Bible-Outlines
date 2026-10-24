import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BookPage } from './pages/BookPage'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'

export default function App() {
  return (
    <BrowserRouter basename="/Bible-Outlines">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="books/:bookId" element={<BookPage />} />
          <Route path="books/:bookId/quiz" element={<QuizPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
