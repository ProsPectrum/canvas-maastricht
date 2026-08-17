import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountSideNav from '../components/layout/AccountSideNav'
import GlobalNav from '../components/layout/GlobalNav'
import { useUser } from '../context/UserContext'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/eportfolios/eportfolios-overrides.css'

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.25em" height="1.25em" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <rect x="11" y="6" width="2" height="8" rx="1" fill="#fff" />
      <circle cx="12" cy="17" r="1.25" fill="#fff" />
    </svg>
  )
}

export default function EPortfolios() {
  const { user } = useUser()
  const [navExpanded, setNavExpanded] = useState(true)
  const [menuOpen, setMenuOpen] = useState(true)

  const displayName = user?.displayName || 'User'

  useEffect(() => {
    document.title = 'ePortfolios'
    const previous = document.body.className
    const navClass = navExpanded ? 'primary-nav-expanded' : 'primary-nav-collapsed'
    const menuClass = menuOpen ? 'course-menu-expanded' : 'course-menu-collapsed'
    document.body.className = `with-left-side ${menuClass} with-right-side eportfolios ${navClass} full-width context-user_130653 responsive_student_grades_page ff no-touch`
    return () => {
      document.body.className = previous
    }
  }, [navExpanded, menuOpen])

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="account"
        mobileTitle="Account"
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div className="ic-app-nav-toggle-and-crumbs no-print">
          <button
            type="button"
            id="courseMenuToggle"
            className="Button Button--link ic-app-course-nav-toggle"
            aria-live="polite"
            aria-label={menuOpen ? 'Hide account navigation menu' : 'Show account navigation menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <i className="icon-hamburger" aria-hidden="true" />
          </button>

          <div className="ic-app-crumbs">
            <nav id="breadcrumbs" role="navigation" aria-label="breadcrumbs">
              <ol>
                <li className="home">
                  <Link to="/dashboard">
                    <span className="ellipsible">
                      <i className="icon-home" title="My dashboard">
                        <span className="screenreader-only">My dashboard</span>
                      </i>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <span className="ellipsible">{displayName}</span>
                  </Link>
                </li>
                <li aria-current="page">
                  <span className="ellipsible">ePortfolios</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />
          <AccountSideNav activeId="eportfolios-(legacy)-link" menuOpen={menuOpen} />

          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <div className="ep-page">
                  <div
                    className="ep-alert"
                    role="status"
                    data-testid="eportfolio-deprecation-notice"
                  >
                    <div className="ep-alert__bar">
                      <WarningIcon />
                    </div>
                    <div className="ep-alert__body">
                      <span className="ep-alert__title">ePortfolios Will Be Sunset</span>
                      <span className="ep-alert__text">
                        Legacy ePortfolio will now be retired on December 30, 2026. Export your
                        ePortfolios before the end of the year to avoid losing access.
                      </span>
                      <a
                        className="ep-alert__btn"
                        href="https://community.instructure.com/en/kb/articles/662836-unknown#download-eportfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="eportfolio-deprecation-community-link"
                      >
                        Learn how to export your ePortfolios
                      </a>
                    </div>
                  </div>

                  <h1 className="screenreader-only">ePortfolios</h1>

                  <div id="whats_an_eportfolio">
                    <h2>What&apos;s an ePortfolio?</h2>
                    <p>
                      ePortfolios are a place where you can display and discuss the significant
                      submissions and experiences that are happening during your learning process.
                      You can use an ePortfolio to:
                    </p>
                    <ul>
                      <li>
                        Display the papers you&apos;re proud of for more than just your instructor to
                        see
                      </li>
                      <li>
                        Talk about all the thought and work that went into your class submissions
                      </li>
                      <li>Gather an overview of your educational experience as a whole</li>
                      <li>Share your work with friends, future employers, etc.</li>
                    </ul>
                    <p>
                      ePortfolios can be public for everyone to see, or private so only those you
                      allow can see, and you can change that setting at any time.
                    </p>
                    <p>Ready to get started?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="right-side-wrapper" className="ic-app-main-content__secondary">
            <aside id="right-side">
              <div id="create_portfolio_mount">
                <button
                  type="button"
                  id="add_eportfolio_button"
                  className="ep-create-btn"
                  data-testid="add-portfolio-button"
                >
                  <span className="ep-create-btn__plus" aria-hidden="true">
                    +
                  </span>
                  Create an ePortfolio
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
