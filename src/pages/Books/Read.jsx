import React from 'react'
import { Link } from 'react-router-dom'

function BooksRead() {
  const books = [
    { id: 1, name: 'ఏది నిజం?', engName: 'Edi Nijam', thumb: '/images/Books/thumbImages/edinijamthumb.jpg' },
    { id: 2, name: 'మతం ఎందుకు?', engName: 'Matham Enduku', thumb: '/images/Books/thumbImages/matamendukuthumb.jpg' },
    {
      id: 'Vignana-Veechikalu',
      name: 'విజ్ఞాన వీచికలు',
      engName: 'Vignana Veechikalu',
      thumb: '/images/Books/thumbImages/vignanaveechikaluthumb.jpg',
    },
    {
      id: 'Sri-Sai-Leelamruthamu',
      name: 'శ్రీ సాయి లీలామృతము',
      engName: 'Sri Sai Leelamruthamu',
      thumb: '/images/Books/thumbImages/saileelamruthamuthumb.jpg',
    },
    {
      id: 'Sri-Sainathaprabodhamruthamu',
      name: 'శ్రీ సాయినాధ ప్రభోదామృతము',
      engName: 'Sri Sainathaprabodhamruthamu',
      thumb: '/images/Books/thumbImages/sainathaprabodhamruthamuthumb.jpg',
    },
    {
      id: 'Sri-Sai-Sannidhi',
      name: 'శ్రీ సాయి సన్నిధి',
      engName: 'Sri Sai Sannidhi',
      thumb: '/images/Books/thumbImages/saisannidhithumb.jpg',
    },
    {
      id: 'Sri-Swamy-Samartha',
      name: 'శ్రీ స్వామి సమర్థ',
      engName: 'Sri Swamy Samartha',
      thumb: '/images/Books/thumbImages/sswthumb.jpg',
    },
    {
      id: 'Bhagavan-Sri-Bharadwaja',
      name: 'భగవాన్ శ్రీ భరద్వాజ',
      engName: 'Bhagavan Sri Bharadwaja',
      thumb: '/images/Books/thumbImages/bhagavansribharadwajathumb.jpg',
    },
    {
      id: 'Mahapurushudu',
      name: 'మహా పురుషుడు',
      engName: 'Mahapurushudu',
      thumb: '/images/Books/thumbImages/mahapurushuduthumb.jpg',
    },
    {
      id: 'Mahatmula-Muddu-Biddadu',
      name: 'మహాత్ముల ముద్దుబిడ్దడు',
      engName: 'Mahatmula Muddu Biddadu',
      thumb: '/images/Books/thumbImages/mahatmulamuddubiddaduthumb.jpg',
    },
  ]

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

