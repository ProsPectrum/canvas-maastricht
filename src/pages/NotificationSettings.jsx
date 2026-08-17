import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountSideNav from '../components/layout/AccountSideNav'
import GlobalNav from '../components/layout/GlobalNav'
import {
  CloseIcon,
  FrequencyIcon,
  InfoIcon,
} from '../components/notifications/FrequencyIcon'
import {
  frequencyLabels,
  notificationSections,
} from '../data/notificationSettings'
import { useUser } from '../context/UserContext'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/notifications/notification-overrides.css'

function truncateEmail(email, max = 32) {
  if (!email) return ''
  if (email.length <= max) return email
  return `${email.slice(0, max - 1)}…`
}

function PreferenceRow({ row }) {
  return (
    <tr>
      <th scope="row">
        <div className="ns-row-title">
          {row.title}
          {row.badge ? <span className="ns-row-badge">{row.badge}</span> : null}
        </div>
        {row.description ? <p className="ns-row-desc">{row.description}</p> : null}
        {row.bullets?.length ? (
          <ul className="ns-row-desc">
            {row.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {row.note ? <p className="ns-row-note">{row.note}</p> : null}
      </th>
      <td className="ns-cell-channel">
        <button
          type="button"
          className="ns-freq-btn"
          aria-label={`${row.title} email: ${frequencyLabels[row.email]}`}
        >
          <FrequencyIcon frequency={row.email} label={frequencyLabels[row.email]} />
        </button>
      </td>
      <td className="ns-cell-channel">
        <button
          type="button"
          className="ns-freq-btn"
          aria-label={`${row.title} push: ${frequencyLabels[row.push]}`}
        >
          <FrequencyIcon frequency={row.push} label={frequencyLabels[row.push]} />
        </button>
      </td>
    </tr>
  )
}

export default function NotificationSettings() {
  const { user } = useUser()
  const [navExpanded, setNavExpanded] = useState(true)
  const [menuOpen, setMenuOpen] = useState(true)
  const [showAccountAlert, setShowAccountAlert] = useState(true)
  const [showScheduleAlert, setShowScheduleAlert] = useState(true)

  const displayName = user?.displayName || 'User'
  const email = user?.email || ''
  const emailLabel = truncateEmail(email)

  useEffect(() => {
    document.title = 'Notification Settings'
    const previous = document.body.className
    const navClass = navExpanded ? 'primary-nav-expanded' : 'primary-nav-collapsed'
    const menuClass = menuOpen ? 'course-menu-expanded' : 'course-menu-collapsed'
    document.body.className = `with-left-side ${menuClass} notifications ${navClass} full-width context-user_130653 responsive_student_grades_page ff no-touch`
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
                  <span className="ellipsible">Notification Settings</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />
          <AccountSideNav activeId="notifications-link" menuOpen={menuOpen} />

          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <div className="ns-page">
                  <h1>Notification Settings</h1>

                  <div className="ns-alerts">
                    {showAccountAlert ? (
                      <div className="ns-alert" role="status">
                        <span className="ns-alert__icon">
                          <InfoIcon />
                        </span>
                        <div className="ns-alert__body">
                          Account-level notifications apply to all courses. Notifications for
                          individual courses can be changed within each course and will override
                          these notifications.
                        </div>
                        <button
                          type="button"
                          className="ns-alert__close"
                          aria-label="Dismiss account-level notification information"
                          onClick={() => setShowAccountAlert(false)}
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    ) : null}

                    {showScheduleAlert ? (
                      <div className="ns-alert" role="status">
                        <span className="ns-alert__icon">
                          <InfoIcon />
                        </span>
                        <div className="ns-alert__body">
                          Daily notifications will be delivered around 18:00. Weekly notifications
                          will be delivered Saturday between 11:00 and 13:00.
                        </div>
                        <button
                          type="button"
                          className="ns-alert__close"
                          aria-label="Dismiss notification schedule information"
                          onClick={() => setShowScheduleAlert(false)}
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <div className="ns-settings-for">
                    <label className="ns-settings-for__label" htmlFor="ns-context-select">
                      Settings for
                    </label>
                    <select
                      id="ns-context-select"
                      className="ns-settings-for__select"
                      defaultValue="account"
                    >
                      <option value="account">Account</option>
                    </select>
                  </div>

                  {notificationSections.map((section) => (
                    <section key={section.id} className="ns-section">
                      <table className="ns-table">
                        <caption className="screenreader-only">
                          {section.title} notification preferences
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" className="ns-col-category">
                              {section.title}
                            </th>
                            <th scope="col" className="ns-col-channel">
                              Email
                              <span className="ns-col-channel__sub" title={email}>
                                {emailLabel}
                              </span>
                            </th>
                            <th scope="col" className="ns-col-channel">
                              Push Notification
                              <span className="ns-col-channel__sub">For all devices</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((row) => (
                            <PreferenceRow key={row.id} row={row} />
                          ))}
                        </tbody>
                      </table>
                    </section>
                  ))}
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
