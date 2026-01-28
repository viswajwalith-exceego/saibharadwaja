import React from 'react'
import { Link } from 'react-router-dom'
import { books } from '../../data/books'

function BooksRead() {

  return (
    <>
      <div className="container text-center my-3">
        <span className="TitleColourNShadow1">
          <strong>Read Books - గ్రంధ పారాయణము</strong>
        </span>
      </div>

      <div className="container bg-transparant p-2 p-md-5">
        <div className="text-center mb-4">
          <span className="TitleColourNShadow1">
            <strong>తెలుగు గ్రంధములు</strong>
          </span>
        </div>

        <div className="row justify-content-center">
          {books.map((book) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4 text-center" key={book.id}>
              <div className="h-100 d-flex flex-column align-items-center">
                <Link to={`/books/read/${book.id}`} className="textDarkBlueLink d-block mb-2">
                  <img
                    className="img-fluid img-thumbnail"
                    src={book.thumb}
                    alt={book.name}
                    style={{ maxHeight: '250px', objectFit: 'contain' }}
                  />
                </Link>
                <div>{book.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BooksRead

