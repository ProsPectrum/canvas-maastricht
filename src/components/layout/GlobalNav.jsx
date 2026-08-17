import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import avatar from '../../assets/dashboard/avatar-50.png'
import {
  IconCalendar,
  IconCourses,
  IconDashboard,
  IconHelp,
  IconHistory,
  IconInbox,
  IconNavToggle,
  IconSearch,
} from './NavIcons'
import '../../assets/layout/global-nav-overrides.css'

function navClass({ isActive }) {
  return [
    'menu-item ic-app-header__menu-list-item',
    isActive ? 'ic-app-header__menu-list-item--active' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

export default function GlobalNav({
  active = 'dashboard',
  mobileTitle = 'Dashboard',
}) {
  const navigate = useNavigate()
  const { user, signOut } = useUser()
  const displayName = user?.displayName || 'Account'

  function handleLogOut(e) {
    e.preventDefault()
    signOut()
    navigate('/', { replace: true })
  }

  return (
    <>
      <header id="mobile-header" className="no-print" style={{ position: 'relative' }}>
        <button
          type="button"
          className="Button Button--icon-action-rev Button--large mobile-header-hamburger"
          aria-label="Global Navigation Menu"
        >
          <i className="icon-solid icon-hamburger" />
          <span className="screenreader-only">Global Navigation Menu</span>
        </button>
        <div className="mobile-header-space" />
        <span className="mobile-header-title">{mobileTitle}</span>
        <div className="mobile-header-space" />
        <div className="mobile-header-space" />
      </header>

      <header id="header" className="ic-app-header no-print" aria-label="Global Header">
        <a href="#content" id="skip_navigation_link">
          Skip to content
        </a>
        <div
          role="region"
          className="ic-app-header__main-navigation"
          aria-label="Global navigation"
        >
          <div className="ic-app-header__logomark-container">
            <NavLink to="/dashboard" className="ic-app-header__logomark">
              <span className="screenreader-only">Dashboard</span>
            </NavLink>
          </div>

          <ul id="menu" className="ic-app-header__menu-list">
            <li
              className={navClass({ isActive: active === 'account' })}
              aria-current={active === 'account' ? 'page' : undefined}
            >
              <NavLink
                id="global_nav_profile_link"
                to="/profile"
                className="ic-app-header__menu-list-link"
              >
                <div className="menu-item-icon-container">
                  <div aria-hidden="true" className="fs-exclude ic-avatar">
                    <img src={avatar} alt={displayName} />
                  </div>
                  <span className="menu-item__badge" />
                </div>
                <div className="menu-item__text">Account</div>
              </NavLink>
            </li>

            <li
              className={navClass({ isActive: active === 'dashboard' })}
              aria-current={active === 'dashboard' ? 'page' : undefined}
            >
              <NavLink
                id="global_nav_dashboard_link"
                to="/dashboard"
                className="ic-app-header__menu-list-link"
              >
                <div className="menu-item-icon-container" aria-hidden="true">
                  <IconDashboard />
                </div>
                <div className="menu-item__text">Dashboard</div>
              </NavLink>
            </li>

            <li
              className={navClass({ isActive: active === 'courses' })}
              aria-current={active === 'courses' ? 'page' : undefined}
            >
              <NavLink
                id="global_nav_courses_link"
                to="/courses"
                className="ic-app-header__menu-list-link"
              >
                <div className="menu-item-icon-container" aria-hidden="true">
                  <IconCourses />
                </div>
                <div className="menu-item__text">Courses</div>
              </NavLink>
            </li>

            <li
              className={navClass({ isActive: active === 'calendar' })}
              aria-current={active === 'calendar' ? 'page' : undefined}
            >
              <NavLink
                id="global_nav_calendar_link"
                to="/calendar"
                className="ic-app-header__menu-list-link"
              >
                <div className="menu-item-icon-container" aria-hidden="true">
                  <IconCalendar />
                </div>
                <div className="menu-item__text">Calendar</div>
              </NavLink>
            </li>

            <li
              className={navClass({ isActive: active === 'inbox' })}
              aria-current={active === 'inbox' ? 'page' : undefined}
            >
              <NavLink
                id="global_nav_conversations_link"
                to="/inbox"
                className="ic-app-header__menu-list-link"
              >
                <div className="menu-item-icon-container">
                  <span aria-hidden="true">
                    <IconInbox />
                  </span>
                  <span className="menu-item__badge" />
                </div>
                <div className="menu-item__text">Inbox</div>
              </NavLink>
            </li>

            <li
              className={navClass({ isActive: active === 'history' })}
              aria-current={active === 'history' ? 'page' : undefined}
            >
              <NavLink
                id="global_nav_history_link"
                to="/history"
                className="ic-app-header__menu-list-link"
              >
                <div className="menu-item-icon-container" aria-hidden="true">
                  <IconHistory />
                </div>
                <div className="menu-item__text">History</div>
              </NavLink>
            </li>

            <li
              id="context_external_tool_636_menu_item"
              className={[
                'globalNavExternalTool menu-item ic-app-header__menu-list-item',
                active === 'search' ? 'ic-app-header__menu-list-item--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={active === 'search' ? 'page' : undefined}
            >
              <NavLink className="ic-app-header__menu-list-link" to="/search">
                <IconSearch />
                <div className="menu-item__text">Search</div>
              </NavLink>
            </li>

            <li className="ic-app-header__menu-list-item">
              <a
                id="global_nav_help_link"
                role="button"
                className="ic-app-header__menu-list-link"
                href="#help"
              >
                <div className="menu-item-icon-container" role="presentation">
                  <IconHelp />
                  <span className="menu-item__badge">
                    <span dir="ltr">
                      <span className="screenreader-only">
                        10 unread release notes.
                      </span>
                      <span aria-hidden="true">10</span>
                    </span>
                  </span>
                </div>
                <div className="menu-item__text">Help</div>
              </a>
            </li>
          </ul>
        </div>

        <div className="ic-app-header__secondary-navigation">
          <ul className="ic-app-header__menu-list">
            <li className="menu-item ic-app-header__menu-list-item">
              <a
                id="primaryNavToggle"
                role="button"
                href="#log-out"
                className="ic-app-header__menu-list-link ic-app-header__menu-list-link--nav-toggle"
                aria-label="Log out"
                title="Log out"
                onClick={handleLogOut}
              >
                <div className="menu-item-icon-container" aria-hidden="true">
                  <IconNavToggle />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}
