import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountSideNav from '../components/layout/AccountSideNav'
import GlobalNav from '../components/layout/GlobalNav'
import { recentAnnouncements } from '../data/globalAnnouncements'
import { useUser } from '../context/UserContext'
import emptyDesert from '../assets/announcements/empty-desert.svg'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/announcements/announcements-overrides.css'

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <rect x="11" y="10" width="2" height="7" rx="1" fill="#000831" />
      <circle cx="12" cy="7" r="1.25" fill="#000831" />
    </svg>
  )
}

function AnnouncementCard({ announcement }) {
  return (
    <div className="ic-notification ic-notification--admin-created ic-notification--info account_notification">
      <div className="ic-notification__icon" role="presentation">
        <InfoIcon />
        <span className="screenreader-only">information</span>
      </div>
      <div className="notification_account_content">
        <div className="ic-notification__content">
          <div className="ic-notification__message">
            <h2 className="ic-notification__title">{announcement.title}</h2>
            <span
              className="notification_message"
              dangerouslySetInnerHTML={{ __html: announcement.html }}
            />
          </div>
        </div>
        <span className="notification_account_content_text">
          This is an announcement from <b>Maastricht University</b>
        </span>
      </div>
    </div>
  )
}

export default function GlobalAnnouncements() {
  const { user } = useUser()
  const [navExpanded, setNavExpanded] = useState(true)
  const [menuOpen, setMenuOpen] = useState(true)
  const [tab, setTab] = useState('current')

  const displayName = user?.displayName || 'User'

  useEffect(() => {
    document.title = 'Global announcements'
    const previous = document.body.className
    const navClass = navExpanded ? 'primary-nav-expanded' : 'primary-nav-collapsed'
    const menuClass = menuOpen ? 'course-menu-expanded' : 'course-menu-collapsed'
    document.body.className = `with-left-side ${menuClass} past_global_announcements ${navClass} full-width context-user_130653 responsive_student_grades_page ff no-touch`
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
                  <span className="ellipsible">Global announcements</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />
          <AccountSideNav activeId="global-announcements-link" menuOpen={menuOpen} />

          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <div className="ga-page">
                  <h1 className="screenreader-only">Global announcements</h1>

                  <div data-testid="GlobalAnnouncementTabs">
                    <div className="ga-tabs" role="tablist" aria-label="Global announcement tabs">
                      <button
                        type="button"
                        role="tab"
                        id="tab-currentTab"
                        aria-controls="currentTab"
                        aria-selected={tab === 'current'}
                        className={`ga-tab${tab === 'current' ? ' is-active' : ''}`}
                        onClick={() => setTab('current')}
                      >
                        Current
                      </button>
                      <button
                        type="button"
                        role="tab"
                        id="tab-pastTab"
                        aria-controls="pastTab"
                        aria-selected={tab === 'recent'}
                        className={`ga-tab${tab === 'recent' ? ' is-active' : ''}`}
                        onClick={() => setTab('recent')}
                      >
                        Recent
                      </button>
                    </div>

                    {tab === 'current' ? (
                      <div
                        data-testid="GlobalAnnouncementCurrentTab"
                        role="tabpanel"
                        id="currentTab"
                        aria-labelledby="tab-currentTab"
                      >
                        <span className="ga-subtitle">Active Announcements</span>
                        <div className="ga-empty">
                          <img src={emptyDesert} alt="" />
                          <p>No announcements to display</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        data-testid="GlobalAnnouncementPastTab"
                        role="tabpanel"
                        id="pastTab"
                        aria-labelledby="tab-pastTab"
                      >
                        <span className="ga-subtitle">
                          Announcements from the past four months
                        </span>
                        <div className="ga-list">
                          {recentAnnouncements.map((announcement) => (
                            <AnnouncementCard
                              key={announcement.id}
                              announcement={announcement}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="right-side-wrapper" className="ic-app-main-content__secondary">
            <aside id="right-side" />
          </div>
        </div>
      </div>
    </div>
  )
}
