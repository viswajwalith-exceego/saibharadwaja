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
      {/* Title */}
      <div className="container text-center my-3">
        <span className="PageHeadingBS1">Purchase Books</span>
      </div>

      <div className="container bg-transparant p-2 p-md-5">
        {/* Top Button */}
        <div className="d-flex justify-content-end mb-3">
          <Link to="/books" className="btn btn-outline-primary">
            Read books  పారాయణ
          </Link>
        </div>

        {/* Height Header for Desktop */}
        <div className="row font-weight-bold border-bottom d-none d-md-flex textBooksListNPrices mb-2">
          <div className="col-6">
            <div className="row">
              <div className="col-1">#</div>
              <div className="col-9">Book Name</div>
              <div className="col-2">Price</div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-1">#</div>
              <div className="col-9">Book Name</div>
              <div className="col-2">Price</div>
            </div>
          </div>
        </div>

        {/* Books List */}
        <div className="textBooksListNPrices">
          {displayPairs.map((pair, index) => {
            const isHeaderRow = pair.left?.name && (
              pair.left.name.includes('Books in') ||
              pair.right?.name?.includes('Books in')
            )

            // Function to render a single book item
            const renderItem = (item) => {
              if (!item) return null;
              const isHeader = item.name && item.name.includes('Books in');

              if (isHeader) {
                return (
                  <div className="col-12 py-2">
                    <span className="textLatoBold10px" style={{ fontSize: '1.1em' }}>{item.name}</span>
                  </div>
                );
              }

              return (
                <div className="row py-1">
                  <div className="col-2 col-md-1 txtSmallNumber">{item.number}</div>
                  <div className="col-8 col-md-9">{item.name}</div>
                  <div className="col-2 col-md-2">{item.price}</div>
                </div>
              );
            };

            return (
              <div className="row border-bottom py-1" key={index}>
                <div className="col-12 col-md-6 border-end-md">
                  {renderItem(pair.left)}
                </div>
                <div className="col-12 col-md-6">
                  {renderItem(pair.right)}
                </div>
              </div>
            )
          })}
        </div>

        {/* Links Section */}
        <div className="container text-center mt-5 textDarkBlueLink7pt">
          <div className="row justify-content-center">
            <div className="col-12 mb-2">
              <Link to="/contact" className="textDarkBlueLink7pt" style={{ fontSize: '1rem' }}>
                Office Addresses
              </Link>
            </div>
            <div className="col-12 mb-2">
              <a href="http://messageofthemasters.org" className="textDarkBlueLink7pt" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1rem' }}>
                Order Books online - USA
              </a>
            </div>
            <div className="col-12 mb-2">
              <a
                href="https://www.amazon.in/Sri-Saileelamruthamu-Ekkirala-Bharadwaja/dp/B073NM5J4N"
                className="textDarkBlueLink7pt"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1rem' }}
              >
                Amazon India
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BooksPurchase
