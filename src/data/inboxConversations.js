function replaceUserName(text, displayName, firstName) {
  if (!text) return text
  return String(text)
    .replace(/Duong Đo/g, displayName)
    .replace(/Duong Do/g, displayName)
    .replace(/Hi Duong/g, `Hi ${firstName}`)
}

export function buildInboxConversations(user) {
  const displayName = user?.displayName || 'User'
  const firstName = user?.firstName || displayName.split(' ')[0] || 'User'
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return [
    {
      id: '621873',
      date: '10 Dec 2025',
      messageCount: 2,
      participants: `Sidi Wang, ${displayName}`,
      subject: '[No Subject]',
      snippet: 'Tapijn :)',
      starred: false,
      unread: false,
      messages: [
        {
          id: 'm1',
          author: 'Sidi Wang',
          authorInitials: 'SW',
          recipients: null,
          course: 'Responsible Data Use (2025-2026-200-EBC2178)',
          timestamp: '10 Dec 2025 at 16:23',
          body: 'Tapijn :)',
        },
        {
          id: 'm2',
          author: displayName,
          authorInitials: initials,
          recipients: 'Sidi Wang',
          course: 'Responsible Data Use (2025-2026-200-EBC2178)',
          timestamp: '10 Dec 2025 at 13:47',
          body: "Hi Sidi,\n\nI want to confirm on the location that we will have our presentation, as it's not clear whether we'll have it at SBE or Tapijn. Please let me know!",
        },
      ],
    },
    {
      id: '620095',
      date: '8 Dec 2025',
      messageCount: 3,
      participants: 'Sidi Wang, Hervé Djiemboko Njankouo, Bel...',
      subject: 'Final project',
      snippet: 'Hi Cristian, Yes, for you it is 10 page...',
      starred: false,
      unread: false,
      messages: [
        {
          id: 'm1',
          author: 'Sidi Wang',
          authorInitials: 'SW',
          recipients: null,
          course: 'Responsible Data Use (2025-2026-200-EBC2178)',
          timestamp: '8 Dec 2025',
          body: 'Hi Cristian,\n\nYes, for you it is 10 pages.',
        },
      ],
    },
    {
      id: '620750',
      date: '5 Dec 2025',
      messageCount: 2,
      participants: `Sidi Wang, ${displayName}, Igor Garștea, Xi Pa...`,
      subject: 'Presentation Draft',
      snippet: 'Forwarding the feedback to all group mem...',
      starred: false,
      unread: false,
      messages: [
        {
          id: 'm1',
          author: 'Sidi Wang',
          authorInitials: 'SW',
          recipients: null,
          course: 'Responsible Data Use (2025-2026-200-EBC2178)',
          timestamp: '5 Dec 2025',
          body: 'Forwarding the feedback to all group members.',
        },
      ],
    },
    {
      id: '620975',
      date: '4 Dec 2025',
      messageCount: 2,
      participants: `Sidi Wang, ${displayName}`,
      subject: "Absence from today's class",
      snippet: replaceUserName(
        'Hi Duong, you have almost full participa...',
        displayName,
        firstName,
      ),
      starred: false,
      unread: false,
      messages: [
        {
          id: 'm1',
          author: 'Sidi Wang',
          authorInitials: 'SW',
          recipients: null,
          course: 'Responsible Data Use (2025-2026-200-EBC2178)',
          timestamp: '4 Dec 2025',
          body: replaceUserName(
            `Hi Duong, you have almost full participation.`,
            displayName,
            firstName,
          ),
        },
      ],
    },
  ]
}
