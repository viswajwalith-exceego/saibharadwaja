import React from 'react'
import { Link } from 'react-router-dom'
import { booksPurchase, pairBooks } from '../../data/booksPurchase'
import './Purchase.css'

function BooksPurchase() {
  // Pair books for two-column display
  const teluguPairs = pairBooks(booksPurchase.telugu)
  const englishBooks = booksPurchase.english
  const tamilBooks = booksPurchase.tamil
  const kannadaBooks = booksPurchase.kannada
  const otherLanguagesBooks = booksPurchase.otherLanguages

  // Build the table rows matching the original structure
  const allRows = []

  // Add Telugu books (22 rows)
  allRows.push(...teluguPairs)

  // Empty row
  allRows.push({ left: null, right: null })

  // Header row: Books in English | Books in Tamil
  allRows.push({
    left: { number: '#', name: 'Books in English', price: '' },
    right: { number: '#', name: 'Books in Tamil', price: '' }
  })

  // English books 1-3 with Tamil books 1-3
  for (let i = 0; i < 3; i++) {
    allRows.push({
      left: englishBooks[i] || null,
      right: tamilBooks[i] || null
    })
  }

  // English book 4 with "Books in Other Languages" header
  allRows.push({
    left: englishBooks[3] || null,
    right: { number: '#', name: 'Books in Other Languages', price: '' }
  })

  // English book 5 with first Other Languages book
  allRows.push({
    left: englishBooks[4] || null,
    right: otherLanguagesBooks[0] || null
  })

  // English book 6 with second Other Languages book
  allRows.push({
    left: englishBooks[5] || null,
    right: otherLanguagesBooks[1] || null
  })

  // "Books in Kannada" header with third Other Languages book
  allRows.push({
    left: { number: '#', name: 'Books in Kannada', price: '' },
    right: otherLanguagesBooks[2] || null
  })

  // Kannada books 1-6 with remaining Other Languages books
  for (let i = 0; i < kannadaBooks.length; i++) {
    allRows.push({
      left: kannadaBooks[i] || null,
      right: otherLanguagesBooks[i + 3] || null
    })
  }

  // Filter out rows where both are null
  const displayPairs = allRows.filter(pair => pair.left || pair.right)

  return (
    <>
      {/* Title */}
      <div className="table-responsive">
        <table className="table table-transparant table-borderless text-center textJustifiedNoMargin">
          <tbody>
            <tr>
              <td>
                <span className="PageHeadingBS1">Purchase Books</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container-fluid bg-transparant p-sm-2 p-md-5">
        {/* Top Button */}
        <div className="d-flex justify-content-end mb-3">
          <Link to="/books" className="btn btn-outline-primary">
            Read books  పారాయణ
          </Link>
        </div>

        {/* Books Table */}
        <div id="books-list-container" className="table table-responsive">
          <table className="table table-light ta table-responsive textBooksListNPrices w-100">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Price (₹ )</th>
                <th scope="col">#</th>
                <th scope="col">Book Name</th>
                <th scope="col">Price (₹ )</th>
              </tr>
            </thead>
            <tbody>
              {displayPairs.map((pair, index) => {
                const isHeaderRow = pair.left?.name && (
                  pair.left.name.includes('Books in') || 
                  pair.right?.name?.includes('Books in')
                )

                return (
                  <tr key={index}>
                    <td className={isHeaderRow ? '' : 'txtSmallNumber'}>
                      {pair.left?.number || ''}
                    </td>
                    <td>
                      {pair.left?.name ? (
                        isHeaderRow ? (
                          <span className="textLatoBold10px">{pair.left.name}</span>
                        ) : (
                          pair.left.name
                        )
                      ) : ''}
                    </td>
                    <td>{pair.left?.price || ''}</td>
                    <td className={isHeaderRow ? '' : 'txtSmallNumber'}>
                      {pair.right?.number || ''}
                    </td>
                    <td>
                      {pair.right?.name ? (
                        isHeaderRow ? (
                          <span className="textLatoBold10px">{pair.right.name}</span>
                        ) : (
                          pair.right.name
                        )
                      ) : ''}
                    </td>
                    <td>{pair.right?.price || ''}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Links Section */}
        <div className="table-responsive">
          <table className="table table-light text-center textDarkBlueLink7pt">
            <tbody>
              <tr>
                <td>
                  <Link to="/contact" className="textDarkBlueLink7pt">
                    Office Addresses
                  </Link>&nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  <a href="http://messageofthemasters.org" className="textDarkBlueLink7pt" target="_blank" rel="noopener noreferrer">
                    Order Books online - USA
                  </a>&nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  <a 
                    href="https://www.amazon.in/Sri-Saileelamruthamu-Ekkirala-Bharadwaja/dp/B073NM5J4N/ref=asc_df_B073NM5J4N/?tag=googleshopdes-21&linkCode=df0&hvadid=397008201820&hvpos=&hvnetw=g&hvrand=13323348298140579992&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9062178&hvtargid=pla-843956350796&psc=1&ext_vrnc=hi"
                    className="textDarkBlueLink7pt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Amazon India
                  </a>&nbsp;
                </td>
              </tr>
              <tr>
                <td>
                  <br /><br /><br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default BooksPurchase
