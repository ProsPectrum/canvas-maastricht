import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountSideNav from '../components/layout/AccountSideNav'
import GlobalNav from '../components/layout/GlobalNav'
import { approvedIntegrations, featureOptions } from '../data/userSettings'
import { useUser } from '../context/UserContext'
import avatar from '../assets/settings/avatar-50.png'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/settings/profile_edit-f21cdab3d3.css'
import '../assets/settings/ways_to_contact-101f8a36f9.css'
import '../assets/settings/settings-overrides.css'

function truncateEmail(email, max = 22) {
  if (!email) return ''
  if (email.length <= max) return email
  return `${email.slice(0, max - 1)}…`
}

export default function UserSettings() {
  const { user } = useUser()
  const [navExpanded, setNavExpanded] = useState(true)
  const [menuOpen, setMenuOpen] = useState(true)
  const [featureFilter, setFeatureFilter] = useState('')
  const [featureQuery, setFeatureQuery] = useState('')

  const displayName = user?.displayName || 'User'
  const firstName = user?.firstName || 'User'
  const lastName = user?.lastName || ''
  const email = user?.email || ''
  const fullName = displayName
  const sortableName = lastName ? `${lastName}, ${firstName}` : displayName
  const settingsTitle = `${displayName}'s Settings`

  const filteredFeatures = useMemo(() => {
    const q = featureQuery.trim().toLowerCase()
    return featureOptions.filter((feature) => {
      if (!q) return true
      return feature.name.toLowerCase().includes(q) || feature.id.toLowerCase().includes(q)
    })
  }, [featureQuery])

  useEffect(() => {
    document.title = 'Settings'
    const previous = document.body.className
    const navClass = navExpanded ? 'primary-nav-expanded' : 'primary-nav-collapsed'
    const menuClass = menuOpen ? 'course-menu-expanded' : 'course-menu-collapsed'
    document.body.className = `with-left-side ${menuClass} with-right-side profile_settings ${navClass} full-width context-user_130653 responsive_student_grades_page ff no-touch`
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
                  <span className="ellipsible">Settings</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />
          <AccountSideNav activeId="settings-link" menuOpen={menuOpen} />

          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <div className="us-page">
                  <div className="us-header">
                    <div
                      className="us-avatar"
                      style={{ backgroundImage: `url(${avatar})` }}
                      role="img"
                      aria-label={displayName}
                    />
                    <h1 className="us-title">{settingsTitle}</h1>
                  </div>

                  <table className="us-table profile_table">
                    <tbody>
                      <tr>
                        <th scope="row">Full name:</th>
                        <td>
                          {fullName}
                          <span className="us-hint">This name will be used for grading.</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Display name:</th>
                        <td>
                          {displayName}
                          <span className="us-hint">
                            People will see this name in discussions, messages and comments.
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Sortable name:</th>
                        <td>
                          {sortableName}
                          <span className="us-hint">This name appears in sorted lists.</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Pronouns:</th>
                        <td>
                          None
                          <span className="us-hint">
                            This pronoun will appear after your name when enabled
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Language:</th>
                        <td>System default (English (United Kingdom))</td>
                      </tr>
                      <tr>
                        <th scope="row">Time Zone:</th>
                        <td>
                          Amsterdam
                          <div className="us-maintenance">
                            Maintenance windows: 1st and 3rd Thursday of the month from 2:05 to 4:05
                            (Thursday from 0:05 to 2:05 UTC)
                            <br />
                            Next window: Thu, 20 Aug 2026 from 2:05 to 4:05
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <section className="us-section">
                    <h2>Web services</h2>
                    <p>
                      Canvas can make your life a lot easier by tying itself in with the web tools
                      you already use. Click any of the services in &quot;Other services&quot; to
                      see what we mean.
                    </p>
                    <label className="us-checkbox">
                      <input type="checkbox" defaultChecked />
                      <span>
                        Let fellow course/group members see which services I&apos;ve linked to my
                        profile
                      </span>
                    </label>

                    <div className="us-services">
                      <div>
                        <h3>Registered services</h3>
                        <p>No registered services</p>
                      </div>
                      <div>
                        <h3>Other services</h3>
                        <p>Click any service below to register:</p>
                        <p>
                          <a href="#google-drive">Google Drive</a>
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="us-section">
                    <h2>Approved integrations:</h2>
                    <p>
                      These are the third-party applications you have authorised to access the
                      Canvas site on your behalf:
                    </p>
                    <table className="us-integrations">
                      <thead>
                        <tr>
                          <th scope="col">App</th>
                          <th scope="col">Status</th>
                          <th scope="col">Purpose</th>
                          <th scope="col">Dates</th>
                          <th scope="col">Details</th>
                          <th scope="col">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedIntegrations.map((item) => (
                          <tr key={item.id}>
                            <td>{item.app}</td>
                            <td>{item.status}</td>
                            <td />
                            <td className="us-dates">
                              Expires: never
                              <br />
                              Last used: {item.lastUsed}
                            </td>
                            <td>
                              <a href="#details">details</a>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="us-remove"
                                aria-label={`Delete ${item.app} Token`}
                                title="Delete this token"
                              >
                                <i className="icon-trash" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <button type="button" className="us-btn-primary">
                      <span aria-hidden="true">+</span> New access token
                    </button>
                  </section>

                  <section className="us-section">
                    <h2>Feature options</h2>
                    <div className="us-features-controls">
                      <select
                        aria-label="Filter by"
                        value={featureFilter}
                        onChange={(event) => setFeatureFilter(event.target.value)}
                      >
                        <option value="">All</option>
                      </select>
                      <input
                        type="search"
                        placeholder="Search by name or id"
                        aria-label="Search Features"
                        value={featureQuery}
                        onChange={(event) => setFeatureQuery(event.target.value)}
                      />
                      <button
                        type="button"
                        className="us-clear"
                        onClick={() => {
                          setFeatureFilter('')
                          setFeatureQuery('')
                        }}
                      >
                        Clear
                      </button>
                    </div>

                    <h3 className="us-features-subhead">User</h3>
                    <table className="us-features">
                      <thead>
                        <tr>
                          <th scope="col">Feature</th>
                          <th scope="col">Status</th>
                          <th scope="col">State</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFeatures.map((feature) => (
                          <tr key={feature.id}>
                            <td>
                              <span className="us-feature-name">
                                <span className="us-chevron" aria-hidden="true">
                                  ›
                                </span>
                                {feature.name}
                              </span>
                            </td>
                            <td />
                            <td>
                              <span
                                className={
                                  feature.state === 'on' ? 'us-state-on' : 'us-state-off'
                                }
                                aria-label={`${feature.name}, current state: ${
                                  feature.state === 'on' ? 'Enabled' : 'Disabled'
                                }`}
                              >
                                {feature.state === 'on' ? '●' : '⊗'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <div id="right-side-wrapper" className="ic-app-main-content__secondary">
            <aside id="right-side" className="us-right">
              <h2>Ways to contact</h2>

              <h3>Email addresses</h3>
              <div className="us-email-row">
                <i className="icon-star" aria-hidden="true" title="Default email" />
                <span title={email}>{truncateEmail(email, 28)}</span>
              </div>
              <a href="#add-email">+ Email address</a>

              <h3>Other contacts</h3>
              <table className="us-contact-table">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">For all devices</th>
                    <th scope="col">
                      <span className="screenreader-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>push</td>
                    <td />
                    <td>
                      <button
                        type="button"
                        className="us-remove"
                        aria-label="Remove contact method"
                      >
                        <i className="icon-trash" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <a href="#add-contact">+ Contact method</a>

              <div className="us-sidebar-actions">
                <button type="button" className="Button button-sidebar-wide edit_settings_link">
                  <i className="icon-edit" aria-hidden="true" /> Edit settings
                </button>
                <a href="#mfa" className="Button button-sidebar-wide">
                  <i className="icon-lock" aria-hidden="true" /> Set up multi-factor authentication
                </a>
                <a href="#download-submissions" className="Button button-sidebar-wide">
                  <i className="icon-download" aria-hidden="true" /> Download submissions
                </a>
                <a href="#download-content" className="Button button-sidebar-wide">
                  <i className="icon-download" aria-hidden="true" /> Download Course Content
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
