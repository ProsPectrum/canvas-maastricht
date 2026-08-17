import { courseAssignments } from './courseAssignments'
import { toDateKey } from '../utils/calendarDates'

/** Thesis Writing / Academic Reporting calendar context (EBS2071) */
export const THESIS_CALENDAR_ID = 'course_24445'
export const THESIS_COURSE_SLUG = 'ebs2071'
export const THESIS_CALENDAR_CLASS = 'group_course_24445'

/**
 * Build calendar assignment events from course assignment due dates.
 */
export function buildAssignmentEvents() {
  return courseAssignments.map((assignment) => {
    const due = new Date(assignment.dueAt)
    return {
      id: `assignment-${assignment.id}`,
      assignmentId: assignment.id,
      title: assignment.title,
      dateKey: toDateKey(due),
      dueAt: assignment.dueAt,
      type: 'assignment',
      calendarId: THESIS_CALENDAR_ID,
      cssClass: THESIS_CALENDAR_CLASS,
      href: `/courses/${THESIS_COURSE_SLUG}/assignments/${assignment.id}`,
      struck: false,
    }
  })
}

export function groupEventsByDate(events) {
  const map = {}
  for (const event of events) {
    if (!map[event.dateKey]) map[event.dateKey] = []
    map[event.dateKey].push(event)
  }
  return map
}
