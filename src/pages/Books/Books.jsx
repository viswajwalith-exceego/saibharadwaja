import { Link } from 'react-router-dom'

function Books() {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-transparant table-borderless text-center textJustifiedNoMargin">
          <tbody>
            <tr>
              <td>
                <span className="PageHeadingBS1">Books</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container bg-transparant p-sm-2 p-md-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">SB.org Books (Telugu)</h5>
              <p className="card-text">Read Telugu books online</p>
              <Link to="/books/read" className="btn btn-primary">
                Read Books
              </Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Purchase Books</h5>
              <p className="card-text">Purchase physical copies of books</p>
              <Link to="/books/purchase" className="btn btn-primary">
                Purchase
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Books

