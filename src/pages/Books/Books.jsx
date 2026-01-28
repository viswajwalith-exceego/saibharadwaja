import React from 'react'
import { Link } from 'react-router-dom'
import { books } from '../../data/books'

function Books() {
  // Safety check
  if (!books || !Array.isArray(books) || books.length === 0) {
    return (
      <div className="container text-center p-5">
        <h3>No books available</h3>
        <p className="text-muted">Unable to load books data.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    )
  }

  try {
    return (
      <>
        <div className="container text-center my-3">
          <span className="PageHeadingBS1">Books / గ్రంధ పారాయణము</span>
        </div>

        <div className="container bg-transparant p-2 p-md-5">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/books/purchase" className="btn btn-outline-primary">
              Purchase Physical Books
            </Link>
          </div>

          <div className="text-center mb-4">
            <span className="TitleColourNShadow1">
              <strong>తెలుగు గ్రంధములు</strong>
            </span>
          </div>

          <div className="row justify-content-center">
            {books.map((book) => (
              <div className="col-12 col-md-6 col-lg-4 mb-5 text-center" key={book.id}>
                <div className="h-100 d-flex flex-column align-items-center">
                  <Link to={`/books/read/${book.id}`} className="textDarkBlueLink d-block mb-3">
                    <img
                      className="img-fluid img-thumbnail"
                      src={book.thumb || '/images/placeholder.jpg'}
                      alt={book.name || 'Book'}
                      style={{ maxHeight: '250px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg'
                      }}
                    />
                  </Link>
                  <div>
                    <strong>{book.name || 'Unknown'}</strong>
                    {book.engName && (
                      <>
                        <br />
                        <small className="text-muted">{book.engName}</small>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Error rendering Books component:', error)
    return (
      <div className="container text-center p-5">
        <h3>Error loading books</h3>
        <p className="text-muted">{error.message}</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    )
  }
}

export default Books

