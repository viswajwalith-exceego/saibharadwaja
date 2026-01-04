import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { books } from '../../data/books'

function BookDetail() {
  const { bookId } = useParams()
  // Handle both string and number IDs
  const book = books.find(b => b.id.toString() === bookId.toString())

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(50) // Default fallback
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Reset state on book change
    setCurrentPage(1)
    setImageError(false)
    if (book?.totalPages) {
      setTotalPages(book.totalPages)
    }
  }, [bookId, book])

  const handleNext = () => {
    setCurrentPage(prev => prev + 1)
    setImageError(false)
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
      setImageError(false)
    }
  }

  // Logic to determine image URL based on book folder and page number
  // Convention: /images/Books/{folderName}/page{001}.jpg
  const getPageUrl = (page) => {
    if (!book) return ''
    return `/images/Books/${book.folderName}/page${page.toString().padStart(3, '0')}.jpg`
  }

  if (!book) {
    return <div className="container text-center p-5"><h3>Book not found</h3><Link to="/books" className="btn btn-primary">Back to Books</Link></div>
  }

  return (
    <div className="container-fluid bg-light min-vh-100 p-0">
      {/* Top Controls */}
      <div className="bg-white shadow-sm p-3 sticky-top d-flex justify-content-between align-items-center">
        <Link to="/books" className="btn btn-outline-secondary btn-sm">
          &larr; Back
        </Link>

        <div className="text-center">
          <h5 className="m-0 d-none d-md-block">{book.name}</h5>
          <small className="text-muted">Page {currentPage}</small>
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={handlePrev} disabled={currentPage === 1}>
            &larr; Prev
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next &rarr;
          </button>
        </div>
      </div>

      {/* Book Content */}
      <div className="d-flex justify-content-center bg-dark py-4" style={{ minHeight: '80vh' }}>
        <div style={{ maxWidth: '800px', width: '100%', background: '#fff', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
          {!imageError ? (
            <img
              src={getPageUrl(currentPage)}
              alt={`Page ${currentPage}`}
              className="img-fluid w-100"
              onError={(e) => {
                // If image fails, it might mean we reached end of book or wrong path
                // For now show fallback
                setImageError(true)
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div className="text-center p-5">
              <h4>Page not found</h4>
              <p>We couldn't load page {currentPage}.</p>
              <button className="btn btn-secondary" onClick={() => setImageError(false)}>Retry</button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls (Mobile friendly) */}
      <div className="bg-white border-top p-3 d-flex justify-content-center gap-3">
        <button className="btn btn-outline-primary w-25" onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <input
          type="number"
          min="1"
          value={currentPage}
          onChange={(e) => setCurrentPage(Math.max(1, parseInt(e.target.value) || 1))}
          className="form-control text-center"
          style={{ width: '70px' }}
        />
        <button className="btn btn-outline-primary w-25" onClick={handleNext}>
          Next
        </button>
      </div>

    </div>
  )
}

export default BookDetail
