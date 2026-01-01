import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutAcharya from './pages/About/Acharya'
import AboutDivyajanani from './pages/About/Divyajanani'
import Books from './pages/Books/Books'
import BooksPurchase from './pages/Books/Purchase'
import BooksRead from './pages/Books/Read'
import BookDetail from './pages/Books/BookDetail'
import Magazine from './pages/Magazine/Magazine'
import Photos from './pages/Media/Photos'
import SpeechesVideos from './pages/Media/SpeechesVideos'
import Calendar from './pages/Calendar'
import Contact from './pages/Contact'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/acharya" element={<AboutAcharya />} />
        <Route path="/about/divyajanani" element={<AboutDivyajanani />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/purchase" element={<BooksPurchase />} />
        <Route path="/books/read" element={<BooksRead />} />
        <Route path="/books/read/:bookId" element={<BookDetail />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/media/photos" element={<Photos />} />
        <Route path="/media/speeches-videos" element={<SpeechesVideos />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}

export default App

