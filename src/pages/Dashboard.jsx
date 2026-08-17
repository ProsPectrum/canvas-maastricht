import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalNav from '../components/layout/GlobalNav'
import {
  IconAnnouncement,
  IconAssignment,
  IconDiscussion,
  IconMore,
  IconSearchSmall,
} from '../components/layout/NavIcons'
import { dashboardCourses } from '../data/dashboardCourses'
import sidebarLogo from '../assets/dashboard/logo-universiteit-maastricht-375x250.png'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/react_todo_sidebar-df089b77a5.css'
import '../assets/dashboard/dashboard-bb19c48e68.css'
import '../assets/dashboard/dashboard_card-2d946d6f5f.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/dashboard/dashboard-overrides.css'

const BODY_CLASS =
  'with-right-side primary-nav-expanded full-width context-user_130653 responsive_student_grades_page ff no-touch'

function CourseCard({ course }) {
  const imageStyle = course.image
    ? { backgroundImage: `url("${course.image}")` }
    : undefined

  return (
    <div
      className="ic-DashboardCard"
      style={{ opacity: 1 }}
      aria-label={course.aria || course.title}
    >
      <div className="ic-DashboardCard__header">
        <span className="screenreader-only">
          Course image for {course.title}
        </span>
        <div className="ic-DashboardCard__header_image" style={imageStyle}>
          <div
            className="ic-DashboardCard__header_hero"
            style={{ backgroundColor: course.heroColor, opacity: 0.6 }}
            aria-hidden="true"
          />
        </div>
        <Link to={`/courses/${course.id}`} className="ic-DashboardCard__link">
          <div className="ic-DashboardCard__header_content">
            <h2 className="ic-DashboardCard__header-title ellipsis" title={course.title}>
              <span style={{ color: course.titleColor }}>{course.title}</span>
            </h2>
            <div
              className="ic-DashboardCard__header-subtitle ellipsis"
              title={course.subtitle}
            >
              {course.subtitle}
            </div>
            {course.term ? (
              <div
                className="ic-DashboardCard__header-term ellipsis"
                title={course.term}
              >
                {course.term}
              </div>
            ) : null}
          </div>
        </Link>
        <button
          type="button"
          className="Button Button--icon-action-rev ic-DashboardCard__header-button"
          aria-label={`${course.title} options`}
        >
          <span className="screenreader-only">{course.title} options</span>
          <IconMore style={{ color: '#fff' }} />
        </button>
      </div>

      <div
        className="ic-DashboardCard__action-container"
        aria-label={`Actions for ${course.title}`}
      >
        <Link
          to={`/courses/${course.id}`}
          className="ic-DashboardCard__action announcements"
          title={`Announcements - ${course.title}`}
        >
          <span className="screenreader-only">
            Announcements - {course.title}
          </span>
          <div className="ic-DashboardCard__action-layout">
            <IconAnnouncement />
            {course.announcementsBadge ? (
              <span className="ic-DashboardCard__action-badge">
                {course.announcementsBadge}
              </span>
            ) : null}
          </div>
        </Link>
        <Link
          to={`/courses/${course.id}`}
          className="ic-DashboardCard__action assignments"
          title={`Assignments - ${course.title}`}
        >
          <span className="screenreader-only">Assignments - {course.title}</span>
          <div className="ic-DashboardCard__action-layout">
            <IconAssignment />
          </div>
        </Link>
        <Link
          to={`/courses/${course.id}`}
          className="ic-DashboardCard__action discussions"
          title={`Discussions - ${course.title}`}
        >
          <span className="screenreader-only">Discussions - {course.title}</span>
          <div className="ic-DashboardCard__action-layout">
            <IconDiscussion />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [navExpanded, setNavExpanded] = useState(true)

  useEffect(() => {
    document.title = 'Dashboard'
    const previous = document.body.className
    document.body.className = navExpanded
      ? BODY_CLASS
      : BODY_CLASS.replace('primary-nav-expanded', 'primary-nav-collapsed')
    return () => {
      document.body.className = previous
    }
  }, [navExpanded])

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="dashboard"
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div id="main" className="ic-Layout-columns">
          <div
            className="ic-app-main-content no-content"
            data-tool-position="0"
            id="not_right_side"
          >
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <div id="dashboard_header_container" className="ic-Dashboard-header">
                  <div className="large ic-Dashboard-header__layout">
                    <div className="ic-Dashboard-header__title">
                      <h1 className="hidden-phone">Dashboard</h1>
                    </div>
                    <div className="ic-Dashboard-header__actions">
                      <button
                        type="button"
                        className="Button"
                        data-testid="switch-to-new-dashboard-button"
                      >
                        Switch to new dashboard view
                      </button>
                      <form
                        className="dashboard-course-search"
                        onSubmit={(event) => event.preventDefault()}
                        role="search"
                      >
                        <input
                          className="dashboard-course-search__input"
                          type="search"
                          placeholder="Search my courses"
                          aria-label="Search my courses"
                        />
                        <button
                          type="submit"
                          className="dashboard-course-search__button"
                          aria-label="Search"
                        >
                          <IconSearchSmall />
                        </button>
                      </form>
                      <button
                        type="button"
                        className="dashboard-header-options"
                        aria-label="Dashboard options"
                      >
                        <IconMore />
                      </button>
                    </div>
                  </div>
                </div>

                <div id="DashboardCard_Container" style={{ display: 'block' }}>
                  <div className="ic-DashboardCard__box">
                    <div className="ic-DashboardCard__box__container">
                      {dashboardCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="ic-app-main-content__secondary"
            id="right-side-wrapper"
          >
            <aside id="right-side" style={{ opacity: 1, display: 'block' }}>
              <div className="ic-sidebar-logo">
                <img
                  className="ic-sidebar-logo__image"
                  alt="Canvas by Instructure"
                  src={sidebarLogo}
                />
              </div>

              <div className="Sidebar__TodoListContainer">
                <div data-testid="ToDoSidebar">
                  <h2 className="todo-list-header">
                    <span tabIndex={-1}>To do</span>
                  </h2>
                  <span>Nothing for now</span>
                </div>
              </div>

              <div className="events_list recent_feedback">
                <div className="h2 shared-space">
                  <h2>Recent feedback</h2>
                </div>
                <ul className="right-side-list events">
                  <li>
                    <small>Nothing for now</small>
                  </li>
                </ul>
              </div>

              <div>
                <a
                  href="#grades"
                  className="Button button-sidebar-wide element_toggler_inst_focus_ring"
                >
                  View Grades
                </a>
              </div>
            </aside>
          </div>
        </div>

        <footer role="contentinfo" id="footer" className="ic-app-footer">
          <a
            href="http://www.instructure.com/"
            className="footer-logo ic-app-footer__logo-link"
            target="_blank"
            rel="noreferrer"
          >
            <span className="screenreader-only">By Instructure</span>
          </a>
          <div id="footer-links" className="ic-app-footer__links">
            <a
              href="https://library.maastrichtuniversity.nl/maastricht-university-canvas-privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.instructure.com/policies/canvas-lms-cookie-notice"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie Notice
            </a>
            <a
              href="https://www.instructure.com/policies/acceptable-use"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acceptable Use Policy
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
