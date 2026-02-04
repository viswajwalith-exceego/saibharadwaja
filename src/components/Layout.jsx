import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MENU_ROUTES, useReact } from '../config/featureFlags'

function MenuLink({ route, className, onClick, children }) {
  const useReactRoute = useReact(route.flag)
  const content = children || (route.strong ? <strong>{route.label}</strong> : route.label)
  if (useReactRoute) {
    return (
      <Link className={className} to={route.reactPath} onClick={onClick}>
        {content}
      </Link>
    )
  }
  return (
    <a className={className} href={route.legacyUrl} onClick={onClick}>
      {content}
    </a>
  )
}

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  const logoRoute = MENU_ROUTES.find(r => r.isLogo)
  const topRowRoutes = MENU_ROUTES.filter(r => ['acharya', 'divyajanani'].includes(r.flag))
  const bottomRowRoutes = MENU_ROUTES.filter(r => ['books', 'magazine', 'speechesVideos', 'photos', 'contact', 'calendar', 'home'].includes(r.flag))
  const mobileNavRoutes = MENU_ROUTES.filter(r => !r.isLogo)

  return (
    <div className="bodyFillGrad">
      {/* Mobile Burger Menu */}
      <div className="manaBurgerMenuDiv">
        <nav className="navbar fixed-top navbar-light navbar-expand-lg bg-warning bg-opacity-100 p-0 mr-auto">
          <MenuLink route={logoRoute || MENU_ROUTES[0]} className="nav-link">
            <img className="img img-fluid m-0 me-lg-5" src="/images/MasterPage/mainLogo2024.png" alt="Saibharadwaja.org" />
          </MenuLink>

          <button
            className={`navbar-toggler px-3 collapsed border-0 ${isMenuOpen ? '' : 'collapsed'}`}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`collapse navbar-collapse fw-normal fs-1 ${isMenuOpen ? 'show' : ''}`} id="collapsingNavbar3">
            <ul className="navbar-nav w-100 justify-content-center mainMasterPageMenuFontMobiles">
              {mobileNavRoutes.map((route, idx) => (
                <React.Fragment key={route.flag}>
                  <li role="separator" className="divider"></li>
                  {[1, 3, 5, 7].includes(idx) && (
                    <li className="nav-item d-none d-lg-block"><span className="nav-link">&nbsp;&#9733;&nbsp;</span></li>
                  )}
                  <li className="nav-item">
                    <MenuLink route={route} className="nav-link" onClick={closeMenu} />
                  </li>
                </React.Fragment>
              ))}
              <li role="separator" className="divider"></li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Desktop Menu */}
      <div className="manaBigMenuDiv position-fixed">
        <div className="manaBigMenuDiv-left">
          <MenuLink route={logoRoute || MENU_ROUTES[0]}>
            <img className="img img-fluid m-2" src="/images/MasterPage/mainLogo2024.png" alt="Saibharadwaja.org" />
          </MenuLink>
        </div>
        <div className="manaBigMenuDiv-middle">
          <div className="manaMainMenuDivs mainMasterPageMenuFontBigScreens">
            <div className="manaMainMenuDivs-TopRow">
              {topRowRoutes.map((route, i) => (
                <React.Fragment key={route.flag}>
                  <MenuLink route={route}>{route.label}</MenuLink>
                  {i === 0 && <a className="p-2">&nbsp;&nbsp;&#9733;&nbsp;</a>}
                </React.Fragment>
              ))}
            </div>
            <div className="manaMainMenuDivs-MiddleGapRow">
              &nbsp;
            </div>
            <div className="manaMainMenuDivs-BottomRow">
              {bottomRowRoutes.map((route, i) => (
                <React.Fragment key={route.flag}>
                  <MenuLink
                    route={route}
                    className={[1, 2, 4, 5, 6].includes(i) ? 'p-0 m-0' : ''}
                  />
                  {i < bottomRowRoutes.length - 1 && (
                    <span className={i === 1 ? 'p-1 m-0' : 'p-2 m-0'}>
                      {i === 1 ? '\u2733' : '\u00A0\u2733\u00A0'}
                    </span>
                  )}
                </React.Fragment>
              ))}
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
