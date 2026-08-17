import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalNav from '../components/layout/GlobalNav'
import { groups } from '../data/groups'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/courses/course_list-c82f802803.css'
import '../assets/groups/groups-overrides.css'

const BODY_CLASS =
  'primary-nav-expanded full-width context-user_130653 responsive_student_grades_page ff no-touch'

export default function Groups() {
  const [navExpanded, setNavExpanded] = useState(true)

  useEffect(() => {
    document.title = 'Groups'
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
        active="groups"
        mobileTitle="Groups"
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div className="ic-app-nav-toggle-and-crumbs no-print">
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
                <li aria-current="page">
                  <span className="ellipsible">Groups</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />
          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain groups-page" role="main">
                <span className="screenreader-only">
                  <h1>Groups</h1>
                </span>
                <h2>Current groups</h2>

                <table id="current_groups_table" className="ic-Table ic-Table--bordered">
                  <thead>
                    <tr>
                      <th scope="col" className="course-list-group-column">
                        Group
                      </th>
                      <th
                        scope="col"
                        className="course-list-course-title-column course-list-no-left-border"
                      >
                        Course
                      </th>
                      <th
                        scope="col"
                        className="course-list-term-column course-list-no-left-border"
                      >
                        Term
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group) => (
                      <tr key={group.id}>
                        <td>
                          <a href={`#groups/${group.id}`}>{group.name}</a>
                        </td>
                        <td className="course-list-no-left-border">
                          <span className="group-course-name">{group.course}</span>
                        </td>
                        <td className="course-list-no-left-border">{group.term}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
