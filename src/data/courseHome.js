export const courseAnnouncements = [
  {
    id: 'ann-1',
    title: 'Welcome to Thesis Writing',
    author: 'Matthias Wibral',
    authorRole: 'Teacher',
    audience: 'All sections',
    snippet:
      'Dear students, Welcome to Thesis Writing. Please note that the thesis writing process will take place online. Only the final presentation will be held in person...',
    body: `Dear students,

Welcome to Thesis Writing.

Please note the following organisational update for this academic year:

• The thesis writing process (thesis circles, supervision meetings and feedback) will take place online.
• Only the final presentation will be held on campus / in person.

Further details on the online setup, meeting links and the date/location of the final presentation will be shared after the Introduction Lecture.

If you have any questions in the meantime, please contact us via AskSBE or reply to this announcement.

Kind regards,
Matthias Wibral
Course Coordinator`,
    postedOn: '16 Aug 2026, 16:00',
    postedShort: 'Posted 16 Aug 16:00',
    unread: true,
  },
]

export const courseHomeLinks = [
  { id: 'overview', label: 'Overview', href: '#overview', variant: 'navy' },
  { id: 'contact', label: 'Contact', href: '#contact', variant: 'navy' },
  { id: 'resources', label: 'Resources', href: '#resources', variant: 'navy' },
  { id: 'modules', label: 'Modules', href: 'modules', variant: 'orange' },
]

export function getAnnouncementById(id) {
  return courseAnnouncements.find((item) => item.id === id) || courseAnnouncements[0]
}
