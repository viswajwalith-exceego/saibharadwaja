import React, { useState } from 'react'

function Magazine() {
  const [expandedYear, setExpandedYear] = useState('2025')

  const magazineIssues = {
    2025: [
      { month: 'December', pdf: '/magazines/Saibaba_Magazine_December_2025.pdf', thumb: '/images/Magazines/2025December.jpg' },
      { month: 'November', pdf: '/magazines/Saibaba_Magazine_November_2025.pdf', thumb: '/images/Magazines/2025November.jpg' },
      { month: 'October', pdf: '/magazines/Saibaba_Magazine_October_2025.pdf', thumb: '/images/Magazines/2025October.jpg' },
      { month: 'September', pdf: '/magazines/Saibaba_Magazine_September_2025.pdf', thumb: '/images/Magazines/2025September.jpg' },
      { month: 'August', pdf: '/magazines/Saibaba_Magazine_August_2025.pdf', thumb: '/images/Magazines/2025August.jpg' },
      { month: 'July', pdf: '/magazines/Saibaba_Magazine_July_2025.pdf', thumb: '/images/Magazines/2025July.jpg' },
      { month: 'June', pdf: '/magazines/Saibaba_Magazine_June_2025.pdf', thumb: '/images/Magazines/2025June.jpg' },
      { month: 'May', pdf: '/magazines/Saibaba_Magazine_May_2025.pdf', thumb: '/images/Magazines/2025May.jpg' },
      { month: 'April', pdf: '/magazines/Saibaba_Magazine_April_2025.pdf', thumb: '/images/Magazines/2025April.jpg' },
      { month: 'March', pdf: '/magazines/Saibaba_Magazine_March_2025.pdf', thumb: '/images/Magazines/2025March.jpg' },
      { month: 'February', pdf: '/magazines/Saibaba_Magazine_February_2025.pdf', thumb: '/images/Magazines/2025February.jpg' },
      { month: 'January', pdf: '/magazines/Saibaba_Magazine_January_2025.pdf', thumb: '/images/Magazines/2025January.jpg' },
    ],
    2024: [
      { month: 'December', pdf: '/magazines/Saibaba_Magazine_December_2024.pdf', thumb: '/images/Magazines/2024December.jpg' },
      { month: 'November', pdf: '/magazines/Saibaba_Magazine_November_2024.pdf', thumb: '/images/Magazines/2024November.jpg' },
      { month: 'October', pdf: '/magazines/Saibaba_Magazine_October_2024.pdf', thumb: '/images/Magazines/2024October.jpg' },
      { month: 'September', pdf: '/magazines/Saibaba_Magazine_September_2024.pdf', thumb: '/images/Magazines/2024September.jpg' },
      { month: 'August', pdf: '/magazines/Saibaba_Magazine_August_2024.pdf', thumb: '/images/Magazines/2024August.jpg' },
      { month: 'July', pdf: '/magazines/Saibaba_Magazine_July_2024.pdf', thumb: '/images/Magazines/2024July.jpg' },
      { month: 'June', pdf: '/magazines/Saibaba_Magazine_June_2024.pdf', thumb: '/images/Magazines/2024June.jpg' },
      { month: 'May', pdf: '/magazines/Saibaba_Magazine_May_2024.pdf', thumb: '/images/Magazines/2024May.jpg' },
      { month: 'April', pdf: '/magazines/Saibaba_Magazine_April_2024.pdf', thumb: '/images/Magazines/2024April.jpg' },
      { month: 'March', pdf: '/magazines/Saibaba_Magazine_March_2024.pdf', thumb: '/images/Magazines/2024March.jpg' },
      { month: 'February', pdf: '/magazines/Saibaba_Magazine_February_2024.pdf', thumb: '/images/Magazines/2024February.jpg' },
      { month: 'January', pdf: '/magazines/Saibaba_Magazine_January_2024.pdf', thumb: '/images/Magazines/2024January.jpg' },
    ],
    2023: [
      { month: 'December', pdf: '/magazines/Saibaba_Magazine_December_2023.pdf', thumb: '/images/Magazines/2023December.jpg' },
      { month: 'November', pdf: '/magazines/Saibaba_Magazine_November_2023.pdf', thumb: '/images/Magazines/2023November.jpg' },
      { month: 'October', pdf: '/magazines/Saibaba_Magazine_October_2023.pdf', thumb: '/images/Magazines/2023October.jpg' },
      { month: 'September', pdf: '/magazines/Saibaba_Magazine_September_2023.pdf', thumb: '/images/Magazines/2023September.jpg' },
      { month: 'August', pdf: '/magazines/Saibaba_Magazine_August_2023.pdf', thumb: '/images/Magazines/2023August.jpg' },
      { month: 'July', pdf: '/magazines/Saibaba_Magazine_July_2023.pdf', thumb: '/images/Magazines/2023July.jpg' },
      { month: 'June', pdf: '/magazines/Saibaba_Magazine_June_2023.pdf', thumb: '/images/Magazines/2023June.jpg' },
      { month: 'May', pdf: '/magazines/Saibaba_Magazine_May_2023.pdf', thumb: '/images/Magazines/2023May.jpg' },
      { month: 'April', pdf: '/magazines/Saibaba_Magazine_April_2023.pdf', thumb: '/images/Magazines/2023April.jpg' },
      { month: 'March', pdf: '/magazines/Saibaba_Magazine_March_2023.pdf', thumb: '/images/Magazines/2023March.jpg' },
      { month: 'February', pdf: '/magazines/Saibaba_Magazine_February_2023.pdf', thumb: '/images/Magazines/2023February.jpg' },
      { month: 'January', pdf: '/magazines/Saibaba_Magazine_January_2023.pdf', thumb: '/images/Magazines/2023January.jpg' },
    ],
  }

  const renderIssues = (year) => {
    const issues = magazineIssues[year] || []
    const rows = []
    for (let i = 0; i < issues.length; i += 3) {
      const rowIssues = issues.slice(i, i + 3)
      rows.push(
        <React.Fragment key={i}>
          <tr>
            {rowIssues.map((issue) => (
              <td key={issue.month}>
                <a href={issue.pdf} target="_blank" rel="noopener noreferrer">
                  <img className="img-fluid img-thumbnail" src={issue.thumb} alt={issue.month} />
                </a>
              </td>
            ))}
            {rowIssues.length < 3 && <td colSpan={3 - rowIssues.length}></td>}
          </tr>
          <tr>
            {rowIssues.map((issue) => (
              <td key={issue.month}>{issue.month} {year}</td>
            ))}
            {rowIssues.length < 3 && <td colSpan={3 - rowIssues.length}></td>}
          </tr>
        </React.Fragment>
      )
    }
    return rows
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-transparant table-borderless text-center textJustifiedNoMargin">
          <tbody>
            <tr>
              <td>
                <div className="card magazineCard724 mx-auto mb-3" style={{maxWidth: '60%'}}>
                  <div className="card-header PageHeadingBS1">Saibaba Magazine</div>
                  <div className="card-body">
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container bg-transparant pt-sm-2 pt-md-3">
        <div className="container bg-transparant pt-sm-2 pt-md-3">
          <div className="accordion accordion-flush" id="accordionFlusA1">
            {Object.keys(magazineIssues).sort((a, b) => b - a).map((year) => (
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
                  <div className="accordion-body p-0">
                    <div className="table-responsive">
                      <table className="table mana-fixed-noB-table table-light text-center textJustifiedNoMargin">
                        <tbody>{renderIssues(year)}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Magazine

