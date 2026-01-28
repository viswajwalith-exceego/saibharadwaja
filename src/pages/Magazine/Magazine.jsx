import React, { useState } from 'react'

function Magazine() {
  const [expandedYear, setExpandedYear] = useState('2025')

  // Dynamic import of magazine files
  const magazineFiles = import.meta.glob('../../../magazines/*.pdf', { eager: true, as: 'url' })

  // Helper to parse file paths and build the data structure
  const getMagazineData = () => {
    const issues = {}
    const monthsOrder = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    Object.keys(magazineFiles).forEach((filePath) => {
      // Extract filename from path (e.g., /magazines/Saibaba_Magazine_December_2025.pdf)
      const fileName = filePath.split('/').pop()

      // Regex to match "Saibaba_Magazine_[Month]_[Year].pdf" (case insensitive)
      const match = fileName.match(/Saibaba_Magazine_([A-Za-z]+)_(\d{4})\.pdf$/i)

      if (match) {
        const [, month, year] = match
        // Standardize month case (e.g., "december" -> "December")
        const standardizedMonth = monthsOrder.find(m => m.toLowerCase() === month.toLowerCase()) || month

        if (!issues[year]) {
          issues[year] = []
        }

        issues[year].push({
          month: standardizedMonth,
          pdf: magazineFiles[filePath], // Use the URL resolved by Vite
          // Construct thumbnail path dynamically: /images/Magazines/[Year][Month].jpg
          thumb: `/images/Magazines/${year}${standardizedMonth}.jpg`
        })
      }
    })

    // Sort issues within each year by month (descending: Dec -> Jan)
    Object.keys(issues).forEach(year => {
      issues[year].sort((a, b) => {
        return monthsOrder.indexOf(b.month) - monthsOrder.indexOf(a.month)
      })
    })

    return issues
  }

  const magazineIssues = getMagazineData()

  const renderIssues = (year) => {
    const issues = magazineIssues[year] || []
    return (
      <div className="row justify-content-center">
        {issues.map((issue) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4 text-center" key={issue.month}>
            <div className="h-100 d-flex flex-column align-items-center">
              <a href={issue.pdf} target="_blank" rel="noopener noreferrer" className="d-block mb-2">
                <img
                  className="img-fluid img-thumbnail"
                  src={issue.thumb}
                  alt={issue.month}
                  style={{ maxHeight: '250px', objectFit: 'contain' }}
                />
              </a>
              <div>{issue.month} {year}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card magazineCard724 w-100">
              <div className="card-header PageHeadingBS1 text-center">Saibaba Magazine</div>
              <div className="card-body text-center">
                <img className="img-fluid" src="/images/pages/magazines301224.jpg" alt="Magazine" />
                <br />
                <br />
                <blockquote className="blockquote mb-0 LatoCenter9_724">
                  <p>
                    Edited, Printed and Published by &nbsp;Dr. R.S.Sasidhar, Ph.D.
                    <br />
                    Trustee of Sri Manga Bharadwaja Trust, Ongole 523002
                    <br />
                    Postal Registration Number: Prakasam/16/2024-2026 &nbsp; Regd.No.37926/83
                  </p>
                  <footer className="blockquote LatoCenter9_724">
                    Email : <cite title="Source Title">editor.saibaba@gmail.com</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container bg-transparant pt-sm-2 pt-md-3">
        <div className="container bg-transparant pt-sm-2 pt-md-3">
          <div className="accordion accordion-flush" id="accordionFlusA1">
            {Object.keys(magazineIssues)
              .filter((year) => parseInt(year) >= 2021)
              .sort((a, b) => b - a)
              .map((year) => (
                <div className="accordion-item" key={year}>
                  <h2 className="accordion-header" id={`flush-heading${year}`}>
                    <button
                      className={`accordion-button ${expandedYear === year ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => setExpandedYear(expandedYear === year ? '' : year)}
                    >
                      <span className="TitleColourNShadow1">
                        <strong>{year}</strong>
                      </span>
                    </button>
                  </h2>

                  <div
                    id={`flush-collapse${year}`}
                    className={`accordion-collapse collapse ${expandedYear === year ? 'show' : ''}`}
                    aria-labelledby={`flush-heading${year}`}
                    data-bs-parent="#accordionFlusA1"
                  >
                    <div className="accordion-body p-3">
                      {renderIssues(year)}
                    </div>
                  </div>
                </div>
              ))}

            {/* Previous Years Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingPrevious">
                <button
                  className={`accordion-button ${expandedYear === 'Previous' ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => setExpandedYear(expandedYear === 'Previous' ? '' : 'Previous')}
                  style={{ backgroundColor: '#e7f1ff' }} // Light blue background to distinguish
                >
                  <span className="TitleColourNShadow1">
                    <strong>Previous Years</strong>
                  </span>
                </button>
              </h2>
              <div
                id="flush-collapsePrevious"
                className={`accordion-collapse collapse ${expandedYear === 'Previous' ? 'show' : ''}`}
                aria-labelledby="flush-headingPrevious"
                data-bs-parent="#accordionFlusA1"
              >
                <div className="accordion-body p-3">
                  {Object.keys(magazineIssues)
                    .filter((year) => parseInt(year) < 2021)
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <React.Fragment key={year}>{renderIssues(year)}</React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Magazine

