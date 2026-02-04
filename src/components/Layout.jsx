import { Link } from 'react-router-dom'
import { useState } from 'react'

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="bodyFillGrad">
      {/* Mobile Burger Menu */}
      <div className="manaBurgerMenuDiv">
        <nav className="navbar fixed-top navbar-light navbar-expand-lg bg-warning bg-opacity-100 p-0 mr-auto">
          <a className="nav-link" href="/Default.aspx">
            <img className="img img-fluid m-0 me-lg-5" src="/images/MasterPage/mainLogo2024.png" alt="Saibharadwaja.org" />
          </a>

          <button 
            className={`navbar-toggler px-3 collapsed border-0 ${isMenuOpen ? '' : 'collapsed'}`}
            type="button" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`collapse navbar-collapse fw-normal fs-1 ${isMenuOpen ? 'show' : ''}`} id="collapsingNavbar3">
            <ul className="navbar-nav w-100 justify-content-center mainMasterPageMenuFontMobiles">
              <li role="separator" className="divider"></li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/acharyaeb.aspx" onClick={() => setIsMenuOpen(false)}>
                  Acharya Sri Ekkirala Bharadwaja
                </a>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/Ammagaru/divyajanani.aspx" onClick={() => setIsMenuOpen(false)}>
                  Divyajanani Alivelu Mangamma
                </a>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/sbbooks/sbbooksTel.html" onClick={() => setIsMenuOpen(false)}>Books</a>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/magazine.aspx" onClick={() => setIsMenuOpen(false)}>Saibaba Magazine</a>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/media/speeches-videos" onClick={() => setIsMenuOpen(false)}>Speeches & Videos</Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <a className="nav-link" href="/photos/gallery1.aspx" onClick={() => setIsMenuOpen(false)}>Photos</a>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/contacts.aspx" onClick={() => setIsMenuOpen(false)}><strong>Contacts</strong></a>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/calander.aspx" onClick={() => setIsMenuOpen(false)}><strong>Calender</strong></a>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <a className="nav-link" href="/Default.aspx" onClick={() => setIsMenuOpen(false)}>Home</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Desktop Menu */}
      <div className="manaBigMenuDiv position-fixed">
        <div className="manaBigMenuDiv-left">
          <a href="/Default.aspx">
            <img className="img img-fluid m-2" src="/images/MasterPage/mainLogo2024.png" alt="Saibharadwaja.org" />
          </a>
        </div>
        <div className="manaBigMenuDiv-middle">
          <div className="manaMainMenuDivs mainMasterPageMenuFontBigScreens">
            <div className="manaMainMenuDivs-TopRow">
              <a href="/pages/acharyaeb.aspx">Acharya Sri Ekkirala Bharadwaja</a>
              <a className="p-2">&nbsp;&nbsp;&#9733;&nbsp;</a>
              <a href="/pages/Ammagaru/divyajanani.aspx">Divyajanani Alivelu Mangamma</a>
            </div>
            <div className="manaMainMenuDivs-MiddleGapRow">
              &nbsp;
            </div>
            <div className="manaMainMenuDivs-BottomRow">
              <a href="/pages/sbbooks/sbbooksTel.html">Books</a>
              <a className="p-2 m-0">&#9733;</a>
              <a className="p-0 m-0" href="/pages/magazine.aspx">Saibaba Magazine</a>
              <a className="p-1 m-0">&#9733;</a>
              <Link className="p-0 m-0" to="/media/speeches-videos">Speeches & Videos</Link>
              <a className="p-2 m-0">&nbsp;&#9733;&nbsp;</a>
              <a href="/photos/gallery1.aspx">Photos</a>
              <a className="p-2 m-0">&nbsp;&#9733;&nbsp;</a>
              <a className="p-0 m-0" href="/pages/contacts.aspx">Contacts</a>
              <a className="p-2 m-0">&nbsp;&#9733;&nbsp;</a>
              <a className="p-0 m-0" href="/pages/calander.aspx">Calender</a>
              <a className="p-2 m-0">&nbsp;&#9733;&nbsp;</a>
              <a className="p-0 m-0" href="/Default.aspx">Home</a>
            </div>
          </div>
        </div>
        <div className="manaBigMenuDiv-right">
          &nbsp;
        </div>
      </div>

      <div className="mt-sm-1">&nbsp;</div>
      <div className="mt-md-5 mt-lg-5">&nbsp;</div>
      <div className="d-lg-none">
        <br />
      </div>

      {children}
    </div>
  )
}

export default Layout

