import React from 'react'

function BooksPurchase() {
  const purchaseInfo = [
    {
      city: 'Ongole',
      address: [
        'Sri Manga Bharadwaja Trust Office',
        'Sri Manga Bharadwaja Trust,',
        'Kothapeta,',
        'Kondaiah Banku street,',
        'Lawyerpet,',
        'Ongole 523002.'
      ],
      phone: '08592-233271'
    },
    {
      city: 'Hyderabad',
      address: [
        'Sri Manga Bharadwaja Trust Office',
        '12-1-170/46P',
        'Hanuman Nagar Jaipuri Colony,',
        'Nagole, Hyderabad,',
        'India - 500068.'
      ],
      phone: '+91-74160 41550'
    }
  ]

  const bankDetails = {
    name: "Sri Manga Bharadwaja Trust",
    bank: "State Bank of India",
    branch: "Ongole",
    accountNo: "30814674457",
    ifsc: "SBIN0000890"
  }

  const bookPrices = [
    { name: "Edi Nijam", price: 50 },
    { name: "Matham Enduku", price: 30 },
    { name: "Vignana Veechikalu", price: 100 },
    { name: "Sri Sai Leelamruthamu", price: 250 },
    { name: "Sri Sainathaprabodhamruthamu", price: 150 },
    // Add more if known
  ]

  return (
    <div className="purchase-page">
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

      <div className="container bg-white p-4 shadow-sm rounded mb-5" style={{ maxWidth: '900px' }}>

        <div className="row mb-5">
          <div className="col-12 text-center mb-4">
            <h4 className="text-primary border-bottom pb-2 d-inline-block">How to Order</h4>
            <p className="mt-3 text-muted">
              You can purchase books by contacting our trust offices directly or by sending a money order/bank transfer.
              Books will be sent via post.
            </p>
          </div>

          {purchaseInfo.map((info, idx) => (
            <div key={idx} className="col-md-6 mb-4">
              <div className="card h-100 border-0 bg-light">
                <div className="card-body">
                  <h5 className="card-title text-dark border-bottom pb-2">{info.city} Office</h5>
                  <address className="card-text mt-3" style={{ lineHeight: '1.8' }}>
                    {info.address.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}<br />
                      </React.Fragment>
                    ))}
                  </address>
                  <div className="mt-3">
                    <strong>Phone:</strong> <a href={`tel:${info.phone}`} className="text-decoration-none">{info.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mb-5">
          <div className="col-md-6">
            <div className="card h-100 border-primary">
              <div className="card-header bg-primary text-white">
                Bank Details for Online Helper
              </div>
              <div className="card-body">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Account Name:</th>
                      <td>{bankDetails.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Bank:</th>
                      <td>{bankDetails.bank}</td>
                    </tr>
                    <tr>
                      <th scope="row">Branch:</th>
                      <td>{bankDetails.branch}</td>
                    </tr>
                    <tr>
                      <th scope="row">Account No:</th>
                      <td><strong>{bankDetails.accountNo}</strong></td>
                    </tr>
                    <tr>
                      <th scope="row">IFSC Code:</th>
                      <td>{bankDetails.ifsc}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-info h-100">
              <h5 className="alert-heading">Note:</h5>
              <p>
                Please contact the office numbers above to confirm book availability and courier charges before making any payment.
              </p>
              <hr />
              <p className="mb-0">
                After payment, please send the transaction details and your address to the phone numbers provided to dispatch the books.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BooksPurchase
