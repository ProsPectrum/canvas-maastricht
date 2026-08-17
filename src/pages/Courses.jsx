import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalNav from '../components/layout/GlobalNav'
import { dashboardCourses } from '../data/dashboardCourses'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/courses/course_list-c82f802803.css'
import '../assets/courses/courses-overrides.css'

const BODY_CLASS =
  'primary-nav-expanded full-width context-user_130653 responsive_student_grades_page ff no-touch'

const SORT_KEYS = {
  favorite: 'favorite',
  course: 'course',
  nickname: 'nickname',
  term: 'term',
  enrolled_as: 'enrolled_as',
  published: 'published',
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 1920 1920"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
      />
    </svg>
  )
}

function SortIcon({ direction }) {
  if (direction === 'asc') {
    return <i className="course-list-sort-icon sorted icon-mini-arrow-up" />
  }
  if (direction === 'desc') {
    return <i className="course-list-sort-icon sorted icon-mini-arrow-down" />
  }
  return <i className="course-list-sort-icon icon-mini-arrow-double" />
}

function compareCourses(a, b, sortKey, order) {
  const dir = order === 'desc' ? -1 : 1
  const emptyLast = (value) => (value == null || value === '' ? 1 : 0)

  let av
  let bv

  switch (sortKey) {
    case 'favorite':
      av = a.favorite ? 1 : 0
      bv = b.favorite ? 1 : 0
      break
    case 'nickname':
      av = a.nickname || ''
      bv = b.nickname || ''
      break
    case 'term':
      av = a.term || ''
      bv = b.term || ''
      break
    case 'enrolled_as':
      av = a.enrolledAs || ''
      bv = b.enrolledAs || ''
      break
    case 'published':
      av = a.published ? 1 : 0
      bv = b.published ? 1 : 0
      break
    case 'course':
    default:
      av = a.title || ''
      bv = b.title || ''
      break
  }

  if (typeof av === 'string' || typeof bv === 'string') {
    const emptyCmp = emptyLast(av) - emptyLast(bv)
    if (emptyCmp !== 0) return emptyCmp
    const cmp = String(av).localeCompare(String(bv), 'en', { sensitivity: 'base' })
    if (cmp !== 0) return cmp * dir
    return String(a.title).localeCompare(String(b.title), 'en', { sensitivity: 'base' })
  }

  if (av !== bv) return (av - bv) * dir
  return String(a.title).localeCompare(String(b.title), 'en', { sensitivity: 'base' })
}

function CourseRow({ course, onToggleFavorite }) {
  const favoriteTitle = course.favorite
    ? `Click to remove ${course.title} from the courses menu.`
    : `Click to add ${course.title} to the courses menu.`

  return (
    <tr className="course-list-table-row">
      <td className="course-list-star-column">
        <span
          className={[
            course.favorite ? 'course-list-favorite-course' : '',
            'course-list-favoritable',
          ]
            .filter(Boolean)
            .join(' ')}
          data-tooltip="bottom"
          title={favoriteTitle}
          role="button"
          tabIndex={0}
          onClick={() => onToggleFavorite(course.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onToggleFavorite(course.id)
            }
          }}
        >
          <i
            className={`course-list-favorite-icon ${
              course.favorite ? 'icon-star' : 'icon-star-light'
            }`}
          />
          <span className="screenreader-only">{favoriteTitle}</span>
        </span>
      </td>

      <th scope="row" className="course-list-course-title-column course-list-no-left-border">
        <span
          aria-hidden="true"
          className="course-color-block"
          style={{ color: course.color }}
        />
        <Link to={`/courses/${course.id}`} title={course.title}>
          <span className="name">{course.title}</span>
        </Link>
      </th>

      <td className="course-list-no-left-border course-list-nickname-column">
        {course.nickname || null}
      </td>

      <td className="course-list-no-left-border course-list-term-column">
        {course.term || null}
      </td>

      <td className="course-list-no-left-border course-list-enrolled-as-column">
        {course.enrolledAs}
      </td>

      <td className="course-list-no-left-border course-list-published-column">
        {course.published ? (
          <>
            <span data-tooltip="" title="This course has been published.">
              Yes
            </span>
            <span className="screenreader-only">This course has been published.</span>
          </>
        ) : (
          <>
            <span data-tooltip="" title="This course has not been published.">
              No
            </span>
            <span className="screenreader-only">This course has not been published.</span>
          </>
        )}
      </td>
    </tr>
  )
}

export default function Courses() {
  const [navExpanded, setNavExpanded] = useState(true)
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(SORT_KEYS.course)
  const [sortOrder, setSortOrder] = useState('asc')
  const [favorites, setFavorites] = useState(() =>
    Object.fromEntries(dashboardCourses.map((course) => [course.id, true])),
  )

  useEffect(() => {
    document.title = 'Courses'
    const previous = document.body.className
    document.body.className = navExpanded
      ? BODY_CLASS
      : BODY_CLASS.replace('primary-nav-expanded', 'primary-nav-collapsed')
    return () => {
      document.body.className = previous
    }
  }, [navExpanded])

  const courses = useMemo(() => {
    return dashboardCourses.map((course) => ({
      id: course.id,
      title: course.title,
      term: course.term,
      color: course.heroColor || course.titleColor || '#000831',
      nickname: '',
      enrolledAs: 'Student',
      published: true,
      favorite: Boolean(favorites[course.id]),
    }))
  }, [favorites])

  const visibleCourses = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = needle
      ? courses.filter((course) => {
          const haystack = [course.title, course.nickname, course.term, course.enrolledAs]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
          return haystack.includes(needle)
        })
      : courses

    return [...filtered].sort((a, b) => compareCourses(a, b, sortKey, sortOrder))
  }, [courses, query, sortKey, sortOrder])

  function handleSort(nextKey) {
    if (sortKey === nextKey) {
      setSortOrder((value) => (value === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(nextKey)
    setSortOrder('asc')
  }

  function sortAria(label, key) {
    if (sortKey !== key) return `${label} column, sorted none, click to sort`
    return `${label} column, sorted ${sortOrder === 'asc' ? 'ascending' : 'descending'}, click to sort`
  }

  function toggleFavorite(id) {
    setFavorites((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="courses"
        mobileTitle="Courses"
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
              <div id="content" className="ic-Layout-contentMain courses-page" role="main">
                <div className="page_header_container">
                  <h1 className="page_header">All courses</h1>
                  <form
                    className="ajas-search"
                    role="search"
                    onSubmit={(event) => event.preventDefault()}
                  >
                    <input
                      className="ajas-search__input"
                      type="search"
                      placeholder="Search this course"
                      aria-label="Search this course"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <button type="submit" className="ajas-search__button" aria-label="Search">
                      <SearchIcon />
                    </button>
                  </form>
                </div>

                <div className="table-overflow-container">
                  <table
                    id="my_courses_table"
                    className="ic-Table ic-Table--bordered course-list-table"
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="course-list-star-column course-list-column-header course-list-no-left-border"
                        >
                          <a
                            id="cc_favorite"
                            aria-label={sortAria('Favourite', SORT_KEYS.favorite)}
                            href="#sort-favorite"
                            onClick={(event) => {
                              event.preventDefault()
                              handleSort(SORT_KEYS.favorite)
                            }}
                          >
                            Favourite{' '}
                            <SortIcon
                              direction={sortKey === SORT_KEYS.favorite ? sortOrder : null}
                            />
                          </a>
                        </th>
                        <th
                          scope="col"
                          className="course-list-course-title-column course-list-column-header course-list-no-left-border"
                        >
                          <a
                            id="cc_course"
                            aria-label={sortAria('Course', SORT_KEYS.course)}
                            href="#sort-course"
                            onClick={(event) => {
                              event.preventDefault()
                              handleSort(SORT_KEYS.course)
                            }}
                          >
                            Course{' '}
                            <SortIcon
                              direction={sortKey === SORT_KEYS.course ? sortOrder : null}
                            />
                          </a>
                        </th>
                        <th
                          scope="col"
                          className="course-list-nickname-column course-list-column-header course-list-no-left-border"
                        >
                          <a
                            id="cc_nickname"
                            aria-label={sortAria('Nickname', SORT_KEYS.nickname)}
                            href="#sort-nickname"
                            onClick={(event) => {
                              event.preventDefault()
                              handleSort(SORT_KEYS.nickname)
                            }}
                          >
                            Nickname{' '}
                            <SortIcon
                              direction={sortKey === SORT_KEYS.nickname ? sortOrder : null}
                            />
                          </a>
                        </th>
                        <th
                          scope="col"
                          className="course-list-term-column course-list-column-header course-list-no-left-border"
                        >
                          <a
                            id="cc_term"
                            aria-label={sortAria('Term', SORT_KEYS.term)}
                            href="#sort-term"
                            onClick={(event) => {
                              event.preventDefault()
                              handleSort(SORT_KEYS.term)
                            }}
                          >
                            Term{' '}
                            <SortIcon direction={sortKey === SORT_KEYS.term ? sortOrder : null} />
                          </a>
                        </th>
                        <th
                          scope="col"
                          className="course-list-enrolled-as-column course-list-column-header course-list-no-left-border"
                        >
                          <a
                            id="cc_enrolled_as"
                            aria-label={sortAria('Enrolled as', SORT_KEYS.enrolled_as)}
                            href="#sort-enrolled"
                            onClick={(event) => {
                              event.preventDefault()
                              handleSort(SORT_KEYS.enrolled_as)
                            }}
                          >
                            Enrolled as{' '}
                            <SortIcon
                              direction={sortKey === SORT_KEYS.enrolled_as ? sortOrder : null}
                            />
                          </a>
                        </th>
                        <th
                          scope="col"
                          className="course-list-published-column course-list-column-header course-list-no-left-border"
                        >
                          <a
                            id="cc_published"
                            aria-label={sortAria('Published', SORT_KEYS.published)}
                            href="#sort-published"
                            onClick={(event) => {
                              event.preventDefault()
                              handleSort(SORT_KEYS.published)
                            }}
                          >
                            Published{' '}
                            <SortIcon
                              direction={sortKey === SORT_KEYS.published ? sortOrder : null}
                            />
                          </a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleCourses.map((course) => (
                        <CourseRow
                          key={course.id}
                          course={course}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
