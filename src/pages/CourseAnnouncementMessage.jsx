import { useParams } from 'react-router-dom'
import CourseShell from '../components/course/CourseShell'
import { getAnnouncementById } from '../data/courseHome'
import matthiasPhoto from '../assets/matthias-wibral-photo.jpg'
import '../assets/course/discussions_index-dd65c6d8e0.css'
import '../assets/course/announcement-message-overrides.css'

function MoreIcon() {
  return (
    <svg viewBox="0 0 1920 1920" width="1em" height="1em" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M960 1468.235c93.448 0 169.412 75.965 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.447 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.447-75.964 169.412-169.412 169.412-93.448 0-169.412-75.965-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Z"
      />
    </svg>
  )
}

export default function CourseAnnouncementMessage() {
  const { courseId, announcementId } = useParams()
  const announcement = getAnnouncementById(announcementId)
  const basePath = `/courses/${courseId}`
  const bodyParagraphs = announcement.body
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <CourseShell
      courseId={courseId}
      activeNav="announcements"
      documentTitle={announcement.title}
      bodyExtraClass="discussions announcements discussion-topic-page"
      showImmersiveReader={false}
      extraCrumbs={[
        { label: 'Announcements', to: `${basePath}/announcements` },
        { label: announcement.title },
      ]}
    >
      <div className="discussion-redesign-layout announcement-message-page">
        <div className="announcement-message-toolbar">
          <div className="announcement-message-toolbar__left">
            <button type="button" className="announcement-message-btn">
              View Split Screen
            </button>
            <button type="button" className="announcement-message-btn">
              Collapse Threads
            </button>
          </div>
          <div className="announcement-message-toolbar__right">
            <label className="announcement-message-select">
              <span className="screenreader-only">Filter by</span>
              <select defaultValue="All" title="All">
                <option value="All">All</option>
              </select>
            </label>
            <label className="announcement-message-search">
              <span className="screenreader-only">Search entries or author...</span>
              <input type="search" placeholder="Search entries or author..." />
            </label>
            <label className="announcement-message-select">
              <span className="screenreader-only">Sort by</span>
              <select defaultValue="Oldest First" title="Oldest First">
                <option value="Oldest First">Oldest First</option>
                <option value="Newest First">Newest First</option>
              </select>
            </label>
          </div>
        </div>

        <article className="announcement-message-card">
          <header className="announcement-message-header">
            <div className="announcement-message-author">
              <span
                className="course-announcement-avatar"
                aria-label={announcement.author}
                role="img"
              >
                <img src={matthiasPhoto} alt="" aria-hidden="true" />
              </span>
              <div className="announcement-message-author__meta">
                <div className="announcement-message-author__row">
                  <span className="announcement-message-author__name">
                    {announcement.author}
                  </span>
                  <ul className="announcement-message-pills">
                    <li>Author</li>
                    <li>{announcement.authorRole || 'Teacher'}</li>
                  </ul>
                </div>
                <p className="announcement-message-posted">
                  {announcement.postedShort || `Posted ${announcement.postedOn}`}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="announcement-message-more"
              aria-label="Manage Discussion"
            >
              <MoreIcon />
            </button>
          </header>

          <h1 className="announcement-message-title">
            <span className="screenreader-only">Discussion Topic: </span>
            {announcement.title}
          </h1>

          <div className="userMessage">
            <div className="user_content enhanced announcement-message-body">
              {bodyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="announcement-message-actions">
            <button type="button" className="announcement-message-reply">
              Reply
            </button>
          </div>
        </article>
      </div>
    </CourseShell>
  )
}
