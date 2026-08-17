import { useEffect, useMemo, useState } from 'react'
import GlobalNav from '../components/layout/GlobalNav'
import { useUser } from '../context/UserContext'
import { buildInboxConversations } from '../data/inboxConversations'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/inbox/inbox-overrides.css'

const BODY_CLASS =
  'primary-nav-expanded full-width context-user_130653 responsive_student_grades_page ff no-touch'

function IconSearch() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" />
    </svg>
  )
}

function IconAddressBook() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M1688.412 1807.059H332.059v-326.275h56.515c31.196 0 56.514-25.299 56.514-56.47 0-31.172-25.318-56.47-56.514-56.47h-56.515V1029.02h56.515c31.196 0 56.514-25.3 56.514-56.471 0-31.172-25.318-56.47-56.514-56.47h-56.515V577.254h56.515c31.196 0 56.514-25.299 56.514-56.47 0-31.172-25.318-56.471-56.514-56.471h-56.515V112.942h1356.353v1694.117ZM219.029 0v464.314h-56.514c-31.196 0-56.515 25.299-56.515 56.47 0 31.172 25.319 56.47 56.515 56.47h56.514v338.824h-56.514c-31.196 0-56.515 25.3-56.515 56.471 0 31.172 25.319 56.47 56.515 56.47h56.514v338.824h-56.514c-31.196 0-56.515 25.299-56.515 56.47 0 31.172 25.319 56.471 56.515 56.471h56.514V1920h1582.412V0H219.03Z" />
    </svg>
  )
}

function IconCompose() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M909.191 303.66v101.02h-808.17v1414.3H1515.32v-721.494h101.021V1920H0V303.66h909.191ZM1562.132 0c40.51 0 78.494 15.76 106.982 44.348l206.588 206.488c58.997 59.097 58.997 155.27 0 214.266L1666.184 674.62l-349.432-349.332-818.778 818.778 277.91 277.91 723.514-723.414 71.422 71.422-857.367 857.266-526.018 105.164 105.264-525.917L1454.848 44.348C1483.437 15.76 1521.522 0 1562.03 0Z" />
    </svg>
  )
}

function IconReply() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M835.942 632.563H244.966l478.08-478.08-90.496-90.496L-.026 696.563 632.55 1329.14l90.496-90.496-478.08-478.08h590.976c504.448 0 914.816 410.368 914.816 914.816v109.184h128V1675.38c0-574.976-467.84-1042.816-1042.816-1042.816" />
    </svg>
  )
}

function IconReplyAll() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="m1030.975 188 81.249 81.249-429.228 429.228h300.747c516.223 0 936.257 420.034 936.257 936.257v98.028h-114.92v-98.028c0-452.901-368.436-821.337-821.337-821.337H682.996l429.228 429.229-81.25 81.248-567.936-567.937L1030.975 188Zm-463.038.011 81.249 81.25-486.688 486.688 486.688 486.688-81.249 81.249L0 755.949 567.937 188.01Z" />
    </svg>
  )
}

function IconArchive() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M1510.854 1779.583H409.146L81.255 1451.576 0 1532.946l361.566 361.566h1196.868L1920 1532.946l-81.14-81.37-328.006 328.007Zm-548.52-347.05L462.047 932.248l81.14-81.37 361.68 361.681V25h114.815v1187.559l361.795-361.68 81.14 81.369-500.285 500.285Z" />
    </svg>
  )
}

function IconTrash() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M1581.176 1750.588c0 31.06-25.411 56.47-56.47 56.47H395.294c-31.059 0-56.47-25.41-56.47-56.47V564.706H225.882v1185.882c0 93.403 76.01 169.412 169.412 169.412h1129.412c93.402 0 169.412-76.01 169.412-169.412V564.706h-112.942v1185.882Zm-903.529-169.412h112.941V677.647h-112.94v903.53Zm451.765 0h112.94V677.647h-112.94v903.53Z" />
    </svg>
  )
}

function IconMore() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M960 1468.235c93.448 0 169.412 75.965 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.447 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.447-75.964 169.412-169.412 169.412-93.448 0-169.412-75.965-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Z" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M1306.181 1110.407c-28.461 20.781-40.32 57.261-29.477 91.03l166.136 511.398-435.05-316.122c-28.686-20.781-67.086-20.781-95.66 0l-435.05 316.122 166.25-511.623c10.842-33.544-1.017-70.024-29.591-90.805L178.577 794.285h537.825c35.351 0 66.523-22.701 77.365-56.245l166.25-511.51 166.136 511.397a81.155 81.155 0 0 0 77.365 56.358h537.939l-435.276 316.122Z" />
    </svg>
  )
}

function IconEnvelope() {
  return (
    <svg viewBox="0 0 1920 1920" aria-hidden="true">
      <path d="M0 1694.118h1920V225.882H0v1468.236ZM112.941 338.824h1694.118v112.94L960 1044.988 112.941 451.765v-112.94Zm0 209.845 795.953 552.847c30.72 21.364 72.422 21.364 103.142 0l795.953-552.847v1032.565H112.941V548.669Z" />
    </svg>
  )
}

export default function Inbox() {
  const { user } = useUser()
  const [navExpanded, setNavExpanded] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [checked, setChecked] = useState({})
  const [starred, setStarred] = useState({})

  const conversations = useMemo(() => buildInboxConversations(user), [user])

  useEffect(() => {
    document.title = 'Inbox'
    const previous = document.body.className
    document.body.className = navExpanded
      ? BODY_CLASS
      : BODY_CLASS.replace('primary-nav-expanded', 'primary-nav-collapsed')
    return () => {
      document.body.className = previous
    }
  }, [navExpanded])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return conversations
    return conversations.filter((item) => {
      const haystack = [item.participants, item.subject, item.snippet, item.date]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [conversations, query])

  const selected = conversations.find((item) => item.id === selectedId) || null
  const hasSelection = Boolean(selected)

  function toggleChecked(id, event) {
    event.stopPropagation()
    setChecked((current) => ({ ...current, [id]: !current[id] }))
  }

  function toggleStar(id, event) {
    event.stopPropagation()
    setStarred((current) => ({ ...current, [id]: !current[id] }))
  }

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="inbox"
        mobileTitle="Inbox"
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />
          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <h1 className="screenreader-only">Inbox</h1>

                <div className="inbox-page">
                  <div className="inbox-toolbar" data-testid="tool-bar">
                    <select className="inbox-select" aria-label="Course filter" defaultValue="all">
                      <option value="all">All courses</option>
                    </select>
                    <select className="inbox-select" aria-label="Mailbox Selection" defaultValue="inbox">
                      <option value="inbox">Inbox</option>
                      <option value="unread">Unread</option>
                      <option value="starred">Starred</option>
                      <option value="sent">Sent</option>
                      <option value="archived">Archived</option>
                    </select>

                    <div className="inbox-search" role="search">
                      <IconSearch />
                      <input
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>

                    <div className="inbox-toolbar-actions">
                      <button type="button" className="inbox-icon-btn" aria-label="Open Search Menu">
                        <IconAddressBook />
                      </button>
                      <button
                        type="button"
                        className="inbox-icon-btn"
                        aria-label="Compose a new message"
                      >
                        <IconCompose />
                      </button>
                      <button
                        type="button"
                        className="inbox-icon-btn"
                        aria-label="Reply"
                        disabled={!hasSelection}
                      >
                        <IconReply />
                      </button>
                      <button
                        type="button"
                        className="inbox-icon-btn"
                        aria-label="Reply all"
                        disabled={!hasSelection}
                      >
                        <IconReplyAll />
                      </button>
                      <button
                        type="button"
                        className="inbox-icon-btn"
                        aria-label="Archive"
                        disabled={!hasSelection}
                      >
                        <IconArchive />
                      </button>
                      <button
                        type="button"
                        className="inbox-icon-btn"
                        aria-label="Delete"
                        disabled={!hasSelection}
                      >
                        <IconTrash />
                      </button>
                      <button type="button" className="inbox-icon-btn" aria-label="More options">
                        <IconMore />
                      </button>
                    </div>
                  </div>

                  <div className="inbox-body">
                    <div className="inbox-list" id="inbox-conversation-holder">
                      {filtered.map((item) => {
                        const isSelected = item.id === selectedId
                        const isStarred = Boolean(starred[item.id] ?? item.starred)
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`inbox-item${isSelected ? ' is-selected' : ''}`}
                            onClick={() => setSelectedId(item.id)}
                          >
                            <input
                              className="inbox-item__check"
                              type="checkbox"
                              checked={Boolean(checked[item.id])}
                              onChange={(event) => toggleChecked(item.id, event)}
                              onClick={(event) => event.stopPropagation()}
                              aria-label={`Select ${item.subject}`}
                            />
                            <span className="inbox-item__unread" aria-hidden="true" />
                            <span className="inbox-item__date">{item.date}</span>
                            <span className="inbox-item__badge">{item.messageCount}</span>
                            <p className="inbox-item__participants">{item.participants}</p>
                            <p className="inbox-item__subject">{item.subject}</p>
                            <div className="inbox-item__snippet-row">
                              <p className="inbox-item__snippet">{item.snippet}</p>
                              <span
                                className="inbox-item__star"
                                role="button"
                                tabIndex={0}
                                aria-label={isStarred ? 'Starred' : 'Not starred'}
                                onClick={(event) => toggleStar(item.id, event)}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    toggleStar(item.id, event)
                                  }
                                }}
                              >
                                <IconStar />
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    <div className="inbox-detail">
                      {!selected ? (
                        <div className="inbox-empty">
                          <IconEnvelope />
                          <p>No Conversations Selected</p>
                        </div>
                      ) : (
                        <>
                          <div className="inbox-detail-header">
                            <h2>{selected.subject}</h2>
                            <button
                              type="button"
                              className="inbox-icon-btn inbox-icon-btn--sm"
                              aria-label="Reply"
                            >
                              <IconReply />
                            </button>
                            <button
                              type="button"
                              className="inbox-icon-btn inbox-icon-btn--sm"
                              aria-label="Reply all"
                            >
                              <IconReplyAll />
                            </button>
                            <button
                              type="button"
                              className="inbox-icon-btn inbox-icon-btn--sm"
                              aria-label="More options"
                            >
                              <IconMore />
                            </button>
                          </div>

                          {selected.messages.map((message) => (
                            <article key={message.id} className="inbox-message">
                              <div className="inbox-avatar" aria-hidden="true">
                                {message.authorInitials}
                              </div>
                              <p className="inbox-message__author">
                                {message.author}
                                {message.recipients ? (
                                  <span>, {message.recipients}</span>
                                ) : null}
                              </p>
                              <div className="inbox-message__actions">
                                <button
                                  type="button"
                                  className="inbox-icon-btn inbox-icon-btn--xs"
                                  aria-label={`Reply to ${message.author}`}
                                >
                                  <IconReply />
                                </button>
                              </div>
                              <p className="inbox-message__meta">{message.course}</p>
                              <p className="inbox-message__meta">{message.timestamp}</p>
                              <p className="inbox-message__body">{message.body}</p>
                            </article>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
