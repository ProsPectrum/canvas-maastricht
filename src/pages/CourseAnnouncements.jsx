import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CourseShell from '../components/course/CourseShell'
import { courseAnnouncements } from '../data/courseHome'
import matthiasPhoto from '../assets/matthias-wibral-photo.jpg'
import '../assets/course/announcements_index-887efc206b.css'
import '../assets/course/announcements-overrides.css'

function EnvelopeIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 5.50042V5.49851L8.99737 1L0.999969 5.49872V5.50051L0.999924 5.50054V16.9989H17.0002V5.50054L17 5.50042ZM16 6.12286V7.42H16.0002V15.1179L13.1351 11.6788L12.3661 12.3188L15.4322 15.9989H2.56795L5.634 12.3188L4.86499 11.6788L1.99994 15.1179V7.42H1.99997V6.12277L4.27751 7.42L9.00005 10.1099L13.7226 7.42L16 6.12286ZM15.0064 5.53575L8.99753 2.11293L2.99328 5.53551L6.30186 7.42L9.00005 8.95683L11.6983 7.42L15.0064 5.53575Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 1920 1920" width="1em" height="1em" aria-hidden="true">
      <path
        fill="currentColor"
        d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default function CourseAnnouncements() {
  const { courseId } = useParams()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return courseAnnouncements.filter((item) => {
      if (!needle) return true
      const haystack = [item.title, item.snippet, item.body, item.author]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [query])

  return (
    <CourseShell
      courseId={courseId}
      activeNav="announcements"
      documentTitle="Announcements"
      bodyExtraClass="discussions announcements"
      crumbLabel="Announcements"
      showImmersiveReader={false}
    >
      {({ basePath }) => (
        <div className="announcements-v2__wrapper course-announcements-page">
          <h1 className="screenreader-only">Announcements</h1>

          <div className="course-announcements-toolbar">
            <div className="course-announcements-toolbar__row">
              <label className="course-announcements-filter">
                <span className="screenreader-only">Announcement filter</span>
                <select
                  id="announcement-filter"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  title={filter}
                >
                  <option value="All">All</option>
                  <option value="Unread">Unread</option>
                </select>
              </label>

              <label className="course-announcements-search">
                <span className="screenreader-only">Search discussions by title</span>
                <SearchIcon />
                <input
                  id="announcements-search"
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <button
                type="button"
                id="mark_all_announcement_read"
                className="course-announcements-mark-read"
              >
                <EnvelopeIcon />
                <span>Mark all as read</span>
              </button>
            </div>

            <button type="button" id="external_feed" className="course-announcements-feeds">
              External Feeds
            </button>
          </div>

          <h2 className="screenreader-only">Announcements list</h2>

          <div className="course-announcements-list">
            {visible.length === 0 ? (
              <p className="course-announcements-empty">No announcements found.</p>
            ) : (
              visible.map((item) => (
                <div key={item.id} className="ic-item-row ic-announcement-row">
                  <div className="ic-item-row__author-col">
                    <span
                      className="course-announcement-avatar"
                      aria-label={item.author}
                      role="img"
                    >
                      <img src={matthiasPhoto} alt="" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="ic-item-row__content-col">
                    <Link
                      className="ic-item-row__content-link"
                      to={`${basePath}/announcements/${item.id}`}
                    >
                      <div className="ic-item-row__content-link-container">
                        <h3 className="course-announcement-title">{item.title}</h3>
                      </div>
                    </Link>
                    <span className="ic-section-tooltip">
                      <span className="course-announcement-audience">
                        {item.audience || 'All sections'}
                      </span>
                    </span>
                    <div className="ic-item-row__content-container">
                      <div className="ic-announcement-row__content user_content enhanced">
                        {item.snippet}
                      </div>
                    </div>
                  </div>
                  <div className="ic-item-row__meta-col">
                    <div className="ic-item-row__meta-content">
                      <div>
                        <span className="ic-item-row__meta-content-heading">
                          <p>Posted on:</p>
                        </span>
                        <span className="ic-item-row__meta-content-timestamp">
                          <p>{item.postedOn}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </CourseShell>
  )
}
