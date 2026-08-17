import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalNav from '../layout/GlobalNav'
import { COURSE_NAV } from './courseNav'
import { dashboardCourses } from '../../data/dashboardCourses'
import '../../assets/course/fonts-eb4a10fb18.css'
import '../../assets/course/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../../assets/course/common-7faef57a1a.css'
import '../../assets/course/dashboard-bb19c48e68.css'
import '../../assets/course/react_todo_sidebar-df089b77a5.css'
import '../../assets/course/wiki_page-64d84d7ffb.css'
import '../../assets/course/course_show-1b363a7344.css'
import '../../assets/course/course_show_secondary-cdb1b416c5.css'
import '../../assets/course/um-canvas-css_2026-04-02.min.css'
import '../../assets/course/course-overrides.css'

function ImmersiveReaderIcon() {
  return (
    <svg
      viewBox="0 0 40 37"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      className="course-immersive-reader__icon"
    >
      <g fillRule="nonzero">
        <path
          d="M37.4,0.9 L37.4,9.6 L35.4,9.6 L35.4,2.9 L24.4,2.9 C22.9,3.3 20,4.5 20,6 L20,17.2 L18,17.2 L18,6 C18,5 15.6,3.6 13.8,2.9 L2,2.9 L2,29 L12.4,29 L12.4,31 L0,31 L0,0.9 L14.1,0.9 L14.3,1 C15,1.2 17.5,2.2 18.9,3.7 C20.5,1.9 23.5,1.1 23.9,1 L24.1,1 L37.4,1 L37.4,0.9 Z"
          fill="#000000"
        />
        <path
          d="M27.4,37 L25.8,37 L18.4,29.4 L14,29.4 L14,21 L18.4,20.9 L26.1,13 L27.4,13 L27.4,37 Z M16,27.4 L19.2,27.4 L25.3,33.7 L25.3,16.6 L19.2,22.9 L15.9,22.9 L15.9,27.4 L16,27.4 Z"
          fill="#0197F2"
        />
        <path
          d="M31.3,32.7 L29.6,31.7 C29.6,31.7 31.7,28.3 31.7,25.2 C31.7,21.9 29.6,18.5 29.6,18.4 L31.3,17.4 C31.4,17.6 33.7,21.3 33.7,25.2 C33.7,28.8 31.4,32.6 31.3,32.7 Z"
          fill="#0197F2"
        />
        <path
          d="M36.4,36.2 L34.8,35 C34.8,35 38,30.8 38,25.2 C38,19.6 34.8,15.4 34.8,15.4 L36.4,14.2 C36.5,14.4 40,19 40,25.3 C40,31.5 36.5,36 36.4,36.2 Z"
          fill="#0197F2"
        />
      </g>
    </svg>
  )
}

function CourseSearchIcon() {
  return (
    <svg viewBox="0 0 1920 1920" width="1em" height="1em" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
      />
    </svg>
  )
}

export default function CourseShell({
  courseId,
  activeNav = 'home',
  documentTitle,
  bodyExtraClass = 'pages home with-right-side padless-content',
  crumbLabel = null,
  extraCrumbs = null,
  showImmersiveReader = true,
  rightSide = null,
  children,
}) {
  const [navExpanded, setNavExpanded] = useState(true)
  const [courseMenuOpen, setCourseMenuOpen] = useState(true)
  const course =
    dashboardCourses.find((item) => item.id === courseId) || dashboardCourses[0]
  const basePath = `/courses/${course.id}`
  const crumbs = extraCrumbs || (crumbLabel ? [{ label: crumbLabel }] : [])

  useEffect(() => {
    document.title = documentTitle || course?.title || 'Course'
    const previous = document.body.className
    const parts = [
      'with-left-side',
      bodyExtraClass,
      'primary-nav-expanded',
      'full-width',
      'responsive_student_grades_page',
      'show',
      'ff',
      'no-touch',
      courseMenuOpen ? 'course-menu-expanded' : 'course-menu-collapsed',
    ]
      .filter(Boolean)
      .join(' ')
      .split(/\s+/)

    let className = [...new Set(parts)].join(' ')
    if (!navExpanded) {
      className = className.replace('primary-nav-expanded', 'primary-nav-collapsed')
    }
    document.body.className = className
    return () => {
      document.body.className = previous
    }
  }, [navExpanded, courseMenuOpen, course?.title, documentTitle, bodyExtraClass])

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="courses"
        mobileTitle={course.subtitle || course.title}
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div className="ic-app-nav-toggle-and-crumbs no-print">
          <button
            type="button"
            id="courseMenuToggle"
            className="Button Button--link ic-app-course-nav-toggle"
            aria-live="polite"
            aria-label={
              courseMenuOpen
                ? 'Hide courses navigation menu'
                : 'Show courses navigation menu'
            }
            onClick={() => setCourseMenuOpen((value) => !value)}
          >
            <i className="icon-hamburger" aria-hidden="true" />
          </button>

          <div className="ic-app-crumbs ic-app-crumbs-enhanced-rubrics">
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
                <li
                  id={`crumb_course_${course.id}`}
                  aria-current={crumbs.length ? undefined : 'page'}
                >
                  <Link to={basePath}>
                    <span className="ellipsible">{course.subtitle}</span>
                  </Link>
                </li>
                {crumbs.map((crumb, index) => {
                  const isLast = index === crumbs.length - 1
                  return (
                    <li
                      key={`${crumb.label}-${index}`}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {crumb.to && !isLast ? (
                        <Link to={crumb.to}>
                          <span className="ellipsible">{crumb.label}</span>
                        </Link>
                      ) : (
                        <span className="ellipsible">{crumb.label}</span>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
          </div>

          <div className="right-of-crumbs right-of-crumbs-no-reverse">
            {showImmersiveReader ? (
              <div id="immersive_reader_mount_point">
                <button type="button" className="course-immersive-reader">
                  <ImmersiveReaderIcon />
                  <span>Immersive Reader</span>
                </button>
              </div>
            ) : null}
            <div className="course-search-widget" role="search">
              <label className="screenreader-only" htmlFor="course-search-input">
                Search this course
              </label>
              <input
                id="course-search-input"
                type="search"
                placeholder="Search this course"
                autoComplete="off"
              />
              <button
                type="button"
                className="course-search-widget__button"
                aria-label="Search"
              >
                <CourseSearchIcon />
              </button>
            </div>
          </div>
        </div>

        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />

          {courseMenuOpen ? (
            <div
              id="left-side"
              className="ic-app-course-menu ic-sticky-on list-view"
              style={{ display: 'block' }}
            >
              <div id="sticky-container" className="ic-sticky-frame">
                {course.term ? (
                  <span id="section-tabs-header-subtitle" className="ellipsis">
                    {course.term}
                  </span>
                ) : null}
                <nav role="navigation" aria-label="Courses navigation menu">
                  <ul id="section-tabs">
                    {COURSE_NAV.map((item) => {
                      const to = `${basePath}${item.path}`
                      const isActive = item.id === activeNav
                      const isRouted =
                        item.id === 'home' ||
                        item.id === 'announcements' ||
                        item.id === 'modules' ||
                        item.id === 'assignments'
                      const className = [item.id, isActive ? 'active' : '']
                        .filter(Boolean)
                        .join(' ')

                      return (
                        <li key={item.id} className="section">
                          {isRouted ? (
                            <Link
                              id={`${item.id}-link`}
                              to={to}
                              aria-current={isActive ? 'page' : undefined}
                              className={className}
                              tabIndex={0}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <a
                              id={`${item.id}-link`}
                              href={`#${item.id}`}
                              className={className}
                              tabIndex={0}
                              onClick={(event) => event.preventDefault()}
                            >
                              {item.label}
                            </a>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          ) : null}

          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                {typeof children === 'function' ? children({ course, basePath }) : children}
              </div>
            </div>
            {rightSide}
          </div>
        </div>
      </div>
    </div>
  )
}
