import React from 'react'
import { Link } from 'react-router-dom'
import { books } from '../../data/books'

function BooksRead() {

  return (
    <>
      <div className="table-responsive">
        <table className="table table-transparant table-borderless text-center textJustifiedNoMargin">
          <tbody>
            <tr>
              <td>
                <span className="TitleColourNShadow1">
                  <strong>Read Books - గ్రంధ పారాయణము</strong>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container bg-transparant p-sm-2 p-md-5">
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
                              <img className="img-fluid img-thumbnail" src={b.thumb} alt={b.name} />
                            </Link>
                          </td>
                        ))}
                        {rowBooks.length < 3 && <td colSpan={3 - rowBooks.length}></td>}
                      </tr>
                      <tr>
                        {rowBooks.map((b) => (
                          <td key={b.id}>{b.name}</td>
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
}

export default BooksRead

