import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Layout({ children }) {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="bodyFillGrad">
      {/* Mobile Burger Menu */}
      <div className="manaBurgerMenuDiv">
        <nav className="navbar fixed-top navbar-light navbar-expand-lg bg-warning bg-opacity-100 p-0 mr-auto">
          <Link className="nav-link" to="/">
            <img className="img img-fluid m-0 me-lg-5" src="/images/MasterPage/mainLogo2024.png" alt="Saibharadwaja.org" />
          </Link>

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
                <Link className="nav-link" to="/about/acharya" onClick={() => setIsMenuOpen(false)}>
                  Acharya Sri Ekkirala Bharadwaja
                </Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/about/divyajanani" onClick={() => setIsMenuOpen(false)}>
                  Divyajanani Alivelu Mangamma
                </Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item">
                <Link className="nav-link" to="/books" onClick={() => setIsMenuOpen(false)}>Books</Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/magazine" onClick={() => setIsMenuOpen(false)}>Saibaba Magazine</Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/media/speeches-videos" onClick={() => setIsMenuOpen(false)}>Speeches & Videos</Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/media/photos" onClick={() => setIsMenuOpen(false)}>Photos</Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={() => setIsMenuOpen(false)}><strong>Contacts</strong></Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendar" onClick={() => setIsMenuOpen(false)}><strong>Calender</strong></Link>
              </li>
              <li role="separator" className="divider"></li>
              <li className="nav-item d-none d-lg-block"><a className="nav-link">&nbsp;&#9733;&nbsp;</a></li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Desktop Menu */}
      <div className="manaBigMenuDiv position-fixed">
        <div className="manaBigMenuDiv-left">
          <Link to="/">
            <img className="img img-fluid m-2" src="/images/MasterPage/mainLogo2024.png" alt="Saibharadwaja.org" />
          </Link>
        </div>
        <div className="manaBigMenuDiv-middle">
          <div className="manaMainMenuDivs mainMasterPageMenuFontBigScreens">
            <div className="manaMainMenuDivs-TopRow">
              <Link to="/about/acharya">Acharya Sri Ekkirala Bharadwaja</Link>
              <a className="p-2">&nbsp;&nbsp;&#9733;&nbsp;</a>
              <Link to="/about/divyajanani">Divyajanani Alivelu Mangamma</Link>
            </div>
            <div className="manaMainMenuDivs-MiddleGapRow">
              &nbsp;
            </div>
            <div className="manaMainMenuDivs-BottomRow">
              <Link to="/books">Books</Link>
              <a className="p-2 m-0">&#9733;</a>
              <Link className="p-0 m-0" to="/magazine">Saibaba Magazine</Link>
              <a className="p-1 m-0">&#9733;</a>
              <Link className="p-0 m-0" to="/media/speeches-videos">Speeches & Videos</Link>
              <a className="p-2 m-0">&nbsp;&#9733;&nbsp;</a>
              <Link to="/media/photos">Photos</Link>
              <a className="p-2 m-0">&nbsp;&#9733;&nbsp;</a>
              <Link className="p-0 m-0" to="/contact">Contacts</Link>
              <a className="p-2 m-0">&nbsp;&#9733;&nbsp;</a>
              <Link className="p-0 m-0" to="/calendar">Calender</Link>
              <a className="p-2 m-0">&nbsp;&#9733;&nbsp;</a>
              <Link className="p-0 m-0" to="/">Home</Link>
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

      <footer className="text-center bg-transparant text-muted p-4 m-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <div className="justify-content-end txtFooter">
          <span>Supported on:</span>
          <img className="img img-fluid opacity-50" src="/images/DefaultPage/browsers.png" alt="Browsers" />
        </div>
        <div className="txtFooter text-center">
          &#169; 2002-2024: Saibharadwaja.org
        </div>
      </footer>
    </div>
  )
}

export default Layout

