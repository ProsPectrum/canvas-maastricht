import { Link, useParams } from 'react-router-dom'
import CourseShell from '../components/course/CourseShell'
import { courseAnnouncements, courseHomeLinks } from '../data/courseHome'
import matthiasPhoto from '../assets/matthias-wibral-photo.jpg'

export default function Course() {
  const { courseId } = useParams()

  return (
    <CourseShell
      courseId={courseId}
      activeNav="home"
      showImmersiveReader
      rightSide={
        <div id="right-side-wrapper" className="ic-app-main-content__secondary">
          <aside id="right-side">
            <div id="course_show_secondary">
              <div className="course-options">
                <a
                  id="view_course_stream_btn"
                  className="btn button-sidebar-wide"
                  href="#stream"
                  onClick={(event) => event.preventDefault()}
                >
                  <i className="icon-stats" />
                  View Course Stream
                </a>
              </div>

              <a
                className="btn button-sidebar-wide"
                href="#calendar"
                onClick={(event) => event.preventDefault()}
              >
                <i className="icon-calendar-day" />
                View Course Calendar
              </a>

              <a
                id="view_course_notifications_btn"
                className="btn button-sidebar-wide"
                href="#notifications"
                onClick={(event) => event.preventDefault()}
              >
                <i className="icon-unmuted" />
                View Course Notifications
              </a>

              <div className="todo-list Sidebar__TodoListContainer">
                <div data-testid="ToDoSidebar">
                  <h2 className="todo-list-header">
                    <span tabIndex={-1}>To do</span>
                  </h2>
                  <span className="course-sidebar-empty">Nothing for now</span>
                </div>
              </div>

              <h2>Course groups</h2>
              <ul className="unstyled_list group_list">
                <li>
                  <span className="course-sidebar-empty">Nothing for now</span>
                </li>
              </ul>
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
          </aside>
        </div>
      }
    >
      {({ course, basePath }) => (
        <>
          <div id="announcements_on_home_page">
            <section
              aria-label="Recent announcements"
              className="course-recent-announcements"
            >
              <h2 className="course-recent-announcements__title">
                Recent announcements
              </h2>
              {courseAnnouncements.map((item) => (
                <div key={item.id} className="ic-item-row ic-announcement-row">
                  {item.unread ? (
                    <span
                      className="course-announcement-unread"
                      aria-label="Unread"
                    />
                  ) : (
                    <span className="course-announcement-unread-spacer" />
                  )}
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
                    <div className="ic-item-row__content-container">
                      <div className="ic-announcement-row__content user_content enhanced">
                        {item.snippet}
                      </div>
                      <a
                        className="course-announcement-reply"
                        href="#reply"
                        onClick={(event) => event.preventDefault()}
                      >
                        <i className="icon-reply" aria-hidden="true" />
                        Reply
                      </a>
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
              ))}
            </section>
          </div>

          <div id="course_home_content">
            <div id="wiki_page_show">
              <div className="header-bar-outer-container">
                <div className="sticky-toolbar">
                  <div className="header-bar page-toolbar as-course-home">
                    <div className="page-toolbar-start">
                      <div className="page-heading">
                        <h1 className="course-title" title={course.title}>
                          {course.title}
                        </h1>
                      </div>
                    </div>
                    <div className="page-toolbar-end">
                      <div className="buttons" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="show-content user_content clearfix enhanced">
                <div className="course-home-tiles" aria-label="Course sections">
                  {courseHomeLinks.map((item) => {
                    const className = `course-home-tile course-home-tile--${item.variant}`
                    const content = (
                      <>
                        <span>{item.label}</span>
                        <span className="course-home-tile__arrow" aria-hidden="true">
                          →
                        </span>
                      </>
                    )

                    if (item.id === 'modules') {
                      return (
                        <Link
                          key={item.id}
                          to={`${basePath}/modules`}
                          className={className}
                        >
                          {content}
                        </Link>
                      )
                    }

                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        className={className}
                        onClick={(event) => event.preventDefault()}
                      >
                        {content}
                      </a>
                    )
                  })}
                </div>

                <h2 id="overview" className="course-about-title">
                  About the course
                </h2>
                <p>
                  In this course you write your Bachelor Thesis for the BSc
                  Economics and Business Economics programme (IBE). The thesis is
                  an individually written and individually assessed academic essay
                  in which you demonstrate mastery of your domain and integrate
                  knowledge and skills from the programme.
                </p>
                <p>
                  The process begins with an Introduction Lecture covering
                  guidelines and available topics. You then choose a topic (agreed
                  with the coordinator and/or your supervisor) and work on the
                  thesis in thesis circles alongside your other courses. For
                  students going on study abroad in the spring semester, circles
                  normally run in Periods 1 and 2, and Period 3 is used to
                  finalise the paper.
                </p>
                <p>
                  Your thesis is based on scientific literature and should
                  typically be 4,500–5,000 words (8 ECTS). Assessment is based on
                  the final paper. The submission is checked for plagiarism, and
                  the thesis is written in English.
                </p>
                <p>
                  More detailed materials, deadlines and the topic list will be
                  published after the Introduction Lecture.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </CourseShell>
  )
}
