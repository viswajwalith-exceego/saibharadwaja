import React from 'react'
import { Link } from 'react-router-dom'
import { books } from '../../data/books'

function Books() {

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
                              <img className="img-fluid img-thumbnail" src={b.thumb} alt={b.name} style={{ maxHeight: '200px' }} />
                            </Link>
                          </td>
                        ))}
                        {rowBooks.length < 3 && <td colSpan={3 - rowBooks.length}></td>}
                      </tr>
                      <tr>
                        {rowBooks.map((b) => (
                          <td key={b.id}>
                            <strong>{b.name}</strong><br />
                            <small className="text-muted">{b.engName}</small>
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
}

export default Books

