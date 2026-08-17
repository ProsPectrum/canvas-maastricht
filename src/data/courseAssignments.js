/**
 * Course Assignments — fall thesis track (hand-in in Period 3).
 *
 * Date anchors (public sources; exact Canvas due times are not published):
 * - Academic calendar 2026–2027: Period 2 education ends 11 Dec 2026;
 *   Period 3 skills 11–26 Jan 2027
 *   (SBE Exchange Guide 2026–2027)
 * - BSc-EER 2025–2026 Art. 12.1: semester 1 thesis handed in in Period 3
 * - BSc-EER Art. 12.2: resit = 2 weeks after publication of first-sit results
 * - BSc-EER Art. 4.19: results within 15 working days → retake ≈ early March
 */

export const courseAssignmentGroups = [
  { id: 'upcoming', title: 'Upcoming Assignments' },
]

export const courseAssignments = [
  {
    id: 'draft',
    groupId: 'upcoming',
    title: 'Draft',
    dueLabel: '11 Dec at 23:59',
    dueDate: '11 Dec',
    dueTime: '23:59',
    dueAt: '2026-12-11T22:59:00.000Z',
    points: 0,
    pointsLabel: '-/0 pts',
    scoreTitle: 'No Submission',
    statusText: 'No submission for this assignment. 0 points possible.',
    submitting: 'a text entry box, a website url, or a file upload',
    description: 'Please upload a draft of your bachelor thesis (PDF and LaTeX files).',
  },
  {
    id: 'final-presentation',
    groupId: 'upcoming',
    title: 'Final presentation',
    dueLabel: '26 Jan at 23:59',
    dueDate: '26 Jan',
    dueTime: '23:59',
    dueAt: '2027-01-26T22:59:00.000Z',
    points: 0,
    pointsLabel: '-/0 pts',
    scoreTitle: 'No Submission',
    statusText: 'No submission for this assignment. 0 points possible.',
    submitting: 'a text entry box, a website url, or a file upload',
    description:
      'Please prepare your final on-campus presentation. Upload any supporting slides if required.',
  },
  {
    id: 'retake-final-presentation',
    groupId: 'upcoming',
    title: 'Retake final presentation',
    dueLabel: '2 Mar at 23:59',
    dueDate: '2 Mar',
    dueTime: '23:59',
    dueAt: '2027-03-02T22:59:00.000Z',
    points: 0,
    pointsLabel: '-/0 pts',
    scoreTitle: 'No Submission',
    statusText: 'No submission for this assignment. 0 points possible.',
    submitting: 'a text entry box, a website url, or a file upload',
    description:
      'Retake opportunity for the final presentation if the first sit was insufficient.',
  },
]

export function getAssignmentById(id) {
  return (
    courseAssignments.find((item) => item.id === id) || courseAssignments[0]
  )
}
