/**
 * frequency:
 * - immediate: green bell
 * - daily: green day calendar
 * - weekly: green month calendar
 * - off: grey muted bell
 * - unsupported: grey circle slash
 */
export const notificationSections = [
  {
    id: 'course-activities',
    title: 'Course activities',
    rows: [
      {
        id: 'due-date',
        title: 'Due Date',
        description: 'Assignment due date change',
        email: 'immediate',
        push: 'immediate',
      },
      {
        id: 'grading-policies',
        title: 'Grading policies',
        description: 'Course grading policy change',
        email: 'weekly',
        push: 'unsupported',
      },
      {
        id: 'course-content',
        title: 'Course Content',
        description: 'Change to course content:',
        bullets: ['Page content', 'Quiz content', 'Assignment content'],
        email: 'off',
        push: 'off',
      },
      {
        id: 'files',
        title: 'Files',
        description: 'New file added to your course',
        email: 'off',
        push: 'unsupported',
      },
      {
        id: 'announcement',
        title: 'Announcement',
        description: 'New Announcement in your course',
        email: 'off',
        push: 'off',
      },
      {
        id: 'announcement-created-by-you',
        title: 'Announcement created by you',
        description: "Announcements created by you\nReplies to announcements you've created",
        email: 'off',
        push: 'unsupported',
      },
      {
        id: 'grading',
        title: 'Grading',
        description: 'Includes:',
        bullets: [
          'Assignment/submission grade entered/changed',
          'Grade weight changed',
        ],
        note: 'Include scores when alerting about grades.\nIf your email is not an institution email this means sensitive content will be sent outside of the institution.',
        email: 'daily',
        push: 'immediate',
      },
      {
        id: 'invitation',
        title: 'Invitation',
        description: 'Invitation for:',
        bullets: [
          'Web conference',
          'Group',
          'Collaboration',
          'Peer Review & reminder',
        ],
        email: 'immediate',
        push: 'immediate',
      },
      {
        id: 'all-submissions',
        title: 'All submissions',
        badge: '(Instructor and Admin only)',
        description: 'Assignment submission/resubmission, except quizzes',
        email: 'off',
        push: 'unsupported',
      },
      {
        id: 'late-grading',
        title: 'Late grading',
        badge: '(Instructor and Admin only)',
        description: 'Late assignment submission',
        email: 'daily',
        push: 'unsupported',
      },
      {
        id: 'submission-comment',
        title: 'Submission comment',
        description: 'Assignment submission comment',
        email: 'off',
        push: 'off',
      },
      {
        id: 'blueprint-sync',
        title: 'Blueprint Sync',
        badge: '(Instructor and Admin only)',
        description:
          'Content was synced from a blueprint course to associated courses',
        email: 'off',
        push: 'unsupported',
      },
    ],
  },
  {
    id: 'discussions',
    title: 'Discussions',
    rows: [
      {
        id: 'new-topic',
        title: 'New Topic',
        description: 'New Discussion topic in your course',
        email: 'daily',
        push: 'off',
      },
      {
        id: 'new-reply',
        title: 'New Reply',
        description: "New reply on a topic you're subscribed to",
        email: 'daily',
        push: 'off',
      },
      {
        id: 'new-mention',
        title: 'New Mention',
        description:
          'New Mention in a Discussion\n(Discussion Mentions are only available for courses or accounts that have the Discussions/Announcements Redesign feature flag turned on)',
        email: 'daily',
        push: 'off',
      },
    ],
  },
  {
    id: 'conversations',
    title: 'Conversations',
    rows: [
      {
        id: 'added-to-conversation',
        title: 'Added to conversation',
        description: 'You are added to a conversation',
        email: 'immediate',
        push: 'unsupported',
      },
      {
        id: 'conversation-message',
        title: 'Conversation message',
        description: 'New Inbox Messages',
        email: 'immediate',
        push: 'immediate',
      },
      {
        id: 'conversations-created-by-me',
        title: 'Conversations created by me',
        description: 'You created a conversation',
        email: 'off',
        push: 'unsupported',
      },
    ],
  },
  {
    id: 'scheduling',
    title: 'Scheduling',
    rows: [
      {
        id: 'student-appointment-signups',
        title: 'Student appointment signups',
        badge: '(Instructor and Admin only)',
        description: 'Student appointment sign-up',
        email: 'immediate',
        push: 'immediate',
      },
      {
        id: 'appointment-signups',
        title: 'Appointment signups',
        description: 'New appointment on your calendar',
        email: 'immediate',
        push: 'unsupported',
      },
      {
        id: 'appointment-cancellations',
        title: 'Appointment Cancellations',
        description: 'Appointment cancellation',
        email: 'immediate',
        push: 'immediate',
      },
      {
        id: 'appointment-availability',
        title: 'Appointment availability',
        description: 'New appointment time slots are available for signup',
        email: 'immediate',
        push: 'immediate',
      },
      {
        id: 'calendar',
        title: 'Calendar',
        description: 'New and changed items on your course calendar',
        email: 'off',
        push: 'off',
      },
    ],
  },
  {
    id: 'groups',
    title: 'Groups',
    rows: [
      {
        id: 'membership-update',
        title: 'Membership update',
        badge: '(Admin only)',
        description:
          'pending enrollment activated\nGroup enrollment accepted/rejected',
        email: 'weekly',
        push: 'unsupported',
      },
    ],
  },
  {
    id: 'conferences',
    title: 'Conferences',
    rows: [
      {
        id: 'recording-ready',
        title: 'Recording ready',
        description: 'A conference recording is ready',
        email: 'immediate',
        push: 'unsupported',
      },
    ],
  },
]

export const frequencyLabels = {
  immediate: 'Notify immediately',
  daily: 'Daily summary',
  weekly: 'Weekly summary',
  off: 'Notifications off',
  unsupported: 'Notifications unsupported',
}
