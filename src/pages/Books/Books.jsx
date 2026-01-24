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
        <div className="table-responsive">
          <table className="table table-transparant table-borderless text-center textJustifiedNoMargin">
            <tbody>
              <tr>
                <td>
                  <span className="PageHeadingBS1">Books / గ్రంధ పారాయణము</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="container bg-transparant p-sm-2 p-md-5">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/books/purchase" className="btn btn-outline-primary">
              Purchase Physical Books
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table mana-fixed-noB-table table-light text-center textJustifiedNoMargin">
              <tbody>
                <tr>
                  <td colSpan="3">
                    <span className="TitleColourNShadow1">
                      <strong>తెలుగు గ్రంధములు</strong>
                    </span>
                  </td>
                </tr>
                {books.map((book, index) => {
                  if (index % 3 === 0) {
                    const rowBooks = books.slice(index, index + 3)
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          {rowBooks.map((b) => (
                            <td key={b.id}>
                              <Link to={`/books/read/${b.id}`} className="textDarkBlueLink">
                                <img 
                                  className="img-fluid img-thumbnail" 
                                  src={b.thumb || '/images/placeholder.jpg'} 
                                  alt={b.name || 'Book'} 
                                  style={{ maxHeight: '200px' }}
                                  onError={(e) => {
                                    e.target.src = '/images/placeholder.jpg'
                                  }}
                                />
                              </Link>
                            </td>
                          ))}
                          {rowBooks.length < 3 && <td colSpan={3 - rowBooks.length}></td>}
                        </tr>
                        <tr>
                          {rowBooks.map((b) => (
                            <td key={b.id}>
                              <strong>{b.name || 'Unknown'}</strong><br />
                              <small className="text-muted">{b.engName || ''}</small>
                            </td>
                          ))}
                          {rowBooks.length < 3 && <td colSpan={3 - rowBooks.length}></td>}
                        </tr>
                      </React.Fragment>
                    )
                  }
                  return null
                })}
              </tbody>
            </table>
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

