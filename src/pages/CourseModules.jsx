import { Link, useParams } from 'react-router-dom'
import CourseShell from '../components/course/CourseShell'
import '../assets/course/modules-overrides.css'

export default function CourseModules() {
  const { courseId } = useParams()

  return (
    <CourseShell
      courseId={courseId}
      activeNav="modules"
      documentTitle="Modules"
      bodyExtraClass="context_modules modules"
      crumbLabel="Modules"
      showImmersiveReader={false}
    >
      {({ basePath }) => (
        <div className="course-modules-page">
          <h1 className="course-modules-page__title">Modules</h1>
          <div className="course-modules-empty">
            <p>Nothing here yet.</p>
            <p>
              Modules will appear after the Introduction Lecture.
            </p>
            <p className="course-modules-empty__back">
              <Link to={basePath}>Back to Home</Link>
            </p>
          </div>
        </div>
      )}
    </CourseShell>
  )
}
