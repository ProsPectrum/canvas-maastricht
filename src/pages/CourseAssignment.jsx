import { useParams } from 'react-router-dom'
import CourseShell from '../components/course/CourseShell'
import { getAssignmentById } from '../data/courseAssignments'
import '../assets/course/assignments-show-b6d3a288a7.css'
import '../assets/course/assignment-show-overrides.css'

export default function CourseAssignment() {
  const { courseId, assignmentId } = useParams()
  const assignment = getAssignmentById(assignmentId)
  const basePath = `/courses/${courseId}`

  return (
    <CourseShell
      courseId={courseId}
      activeNav="assignments"
      documentTitle={assignment.title}
      bodyExtraClass="assignments"
      showImmersiveReader
      extraCrumbs={[
        { label: 'Assignments', to: `${basePath}/assignments` },
        { label: assignment.title },
      ]}
    >
      <div
        id="assignment_show"
        className="assignment content_underline_links course-assignment-show"
      >
        <div className="assignment-title">
          <div className="title-content">
            <h1 className="title">{assignment.title}</h1>
          </div>
          <div className="assignment-buttons">
            <button type="button" className="Button Button--primary">
              Start Assignment
            </button>
          </div>
        </div>

        <ul className="student-assignment-overview">
          <li>
            <span className="title">Due</span>
            <span className="value">
              <span className="date_text">
                <span className="display_date">{assignment.dueDate}</span> by{' '}
                <span className="display_time">{assignment.dueTime}</span>
              </span>
            </span>
          </li>
          <li>
            <span className="title">Points</span>
            <span className="value">{assignment.points}</span>
          </li>
          <li>
            <span className="title">Submitting</span>
            <span className="value">{assignment.submitting}</span>
          </li>
        </ul>

        <div className="description user_content enhanced">
          <p>{assignment.description}</p>
        </div>
      </div>
    </CourseShell>
  )
}
