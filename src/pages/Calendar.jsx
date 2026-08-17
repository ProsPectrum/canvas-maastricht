import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalNav from '../components/layout/GlobalNav'
import { useUser } from '../context/UserContext'
import { calendars as calendarsData } from '../data/calendars'
import {
  buildAssignmentEvents,
  groupEventsByDate,
} from '../data/calendarEvents'
import {
  WEEKDAYS,
  addDays,
  addMonths,
  buildMonthWeeks,
  dayMeta,
  formatMonthYear,
  sameDay,
  startOfWeek,
  toDateKey,
} from '../utils/calendarDates'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/calendar/calendar2-0ab2c86ecc.css'
import '../assets/calendar/calendarApp-e491a7fa98.css'
import '../assets/calendar/agenda_view-661a0cf634.css'
import '../assets/calendar/calendar-colors.css'
import '../assets/calendar/calendar-overrides.css'

const BODY_CLASS =
  'with-right-side primary-nav-expanded full-width context-user_130653 responsive_student_grades_page ff no-touch calendar'

const ALL_ASSIGNMENT_EVENTS = buildAssignmentEvents()

function CalendarEventChip({ event, stopDaySelect = true }) {
  return (
    <Link
      to={event.href}
      className={`fc-day-grid-event fc-h-event fc-event fc-start fc-end ${event.type} ${event.cssClass}${
        event.struck ? ' event_pending' : ''
      }`}
      title={event.title}
      onClick={(e) => {
        if (stopDaySelect) e.stopPropagation()
      }}
    >
      <div className="fc-content">
        <i className="icon-assignment" aria-hidden="true" />
        <span className={`fc-title${event.struck ? ' calendar-event-struck' : ''}`}>{event.title}</span>
      </div>
    </Link>
  )
}

function MonthGrid({
  weeks,
  viewDate,
  today,
  selectedKey,
  onSelectDay,
  eventsByDay = {},
  compact = false,
}) {
  return (
    <div className={`fc-view fc-month-view fc-basic-view${compact ? ' fc-minical-view' : ''}`}>
      <table>
        <thead className="fc-head">
          <tr>
            <td className="fc-head-container fc-widget-header">
              <div className="fc-row fc-widget-header">
                <table>
                  <thead>
                    <tr>
                      {WEEKDAYS.map((label, index) => (
                        <th
                          key={label}
                          className={`fc-day-header fc-widget-header fc-${['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][index]}`}
                        >
                          <span>{label}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
            </td>
          </tr>
        </thead>
        <tbody className="fc-body">
          <tr>
            <td className="fc-widget-content">
              <div className="fc-day-grid fc-unselectable">
                {weeks.map((week) => (
                  <div key={toDateKey(week[0])} className="fc-row fc-week fc-widget-content">
                    <div className="fc-bg">
                      <table>
                        <tbody>
                          <tr>
                            {week.map((date) => {
                              const meta = dayMeta(date, viewDate, today)
                              const selected = selectedKey === meta.key
                              return (
                                <td
                                  key={meta.key}
                                  className={`${meta.className}${selected ? ' fc-highlight-day' : ''}`}
                                  data-date={meta.key}
                                  onClick={() => onSelectDay(date)}
                                  style={
                                    compact && meta.isToday
                                      ? { backgroundColor: 'rgb(224, 247, 250)', cursor: 'pointer' }
                                      : { cursor: 'pointer' }
                                  }
                                />
                              )
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="fc-content-skeleton">
                      <table>
                        <thead>
                          <tr>
                            {week.map((date) => {
                              const meta = dayMeta(date, viewDate, today)
                              return (
                                <td
                                  key={meta.key}
                                  className={meta.topClassName}
                                  data-date={meta.key}
                                  style={
                                    compact && meta.isToday
                                      ? { backgroundColor: 'rgb(224, 247, 250)', cursor: 'pointer' }
                                      : { cursor: 'pointer' }
                                  }
                                  onClick={() => onSelectDay(date)}
                                >
                                  {compact ? (
                                    <button
                                      type="button"
                                      className="day-wrapper-button fc-day-number"
                                      aria-label={`${date.toLocaleDateString('en-GB', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      })}${meta.isToday ? ', Today' : ''}`}
                                    >
                                      {meta.day}
                                    </button>
                                  ) : (
                                    <span className="fc-day-number">{meta.day}</span>
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        </thead>
                        {!compact ? (
                          <tbody>
                            <tr>
                              {week.map((date) => {
                                const key = toDateKey(date)
                                const dayEvents = eventsByDay[key] || []
                                return (
                                  <td key={key} className="fc-event-container" onClick={() => onSelectDay(date)}>
                                    {dayEvents.map((event) => (
                                      <CalendarEventChip key={event.id} event={event} />
                                    ))}
                                  </td>
                                )
                              })}
                            </tr>
                          </tbody>
                        ) : null}
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function WeekView({ viewDate, today, eventsByDay = {} }) {
  const weekStart = startOfWeek(viewDate)
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  return (
    <div className="fc-week-view-grid" role="grid">
      {days.map((date, index) => {
        const isToday = sameDay(date, today)
        const dayEvents = eventsByDay[toDateKey(date)] || []
        return (
          <div key={toDateKey(date)} className={`week-day${isToday ? ' today' : ''}`}>
            <div className="week-day-head">{WEEKDAYS[index]}</div>
            <div className="week-day-num">{date.getDate()}</div>
            <div className="week-day-events">
              {dayEvents.map((event) => (
                <CalendarEventChip key={event.id} event={event} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function AgendaView({ events }) {
  if (!events.length) {
    return (
      <div className="agenda-wrapper">
        <div className="agenda-empty">No events to display.</div>
      </div>
    )
  }

  const sorted = [...events].sort((a, b) => a.dueAt.localeCompare(b.dueAt))

  return (
    <div className="agenda-wrapper">
      <ul className="agenda-event-list">
        {sorted.map((event) => {
          const due = new Date(event.dueAt)
          return (
            <li key={event.id} className="agenda-event-item">
              <time dateTime={event.dateKey}>
                {due.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
              <CalendarEventChip event={event} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Calendar() {
  const { user } = useUser()
  const [navExpanded, setNavExpanded] = useState(true)
  const [viewMode, setViewMode] = useState('month')
  const [today] = useState(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const nextDue = ALL_ASSIGNMENT_EVENTS.map((event) => new Date(event.dueAt))
      .filter((due) => due >= now)
      .sort((a, b) => a - b)[0]
    const anchor = nextDue || now
    return new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  })
  const [selectedDay, setSelectedDay] = useState(today)
  const [calendarsOpen, setCalendarsOpen] = useState(true)
  const [undatedOpen, setUndatedOpen] = useState(false)
  const [enabled, setEnabled] = useState(() =>
    Object.fromEntries(calendarsData.map((item) => [item.id, item.checked])),
  )

  const displayName = user?.displayName || 'User'

  useEffect(() => {
    document.title = 'Calendar'
    const previous = document.body.className
    document.body.className = navExpanded
      ? BODY_CLASS
      : BODY_CLASS.replace('primary-nav-expanded', 'primary-nav-collapsed')
    return () => {
      document.body.className = previous
    }
  }, [navExpanded])

  const visibleEvents = useMemo(
    () => ALL_ASSIGNMENT_EVENTS.filter((event) => enabled[event.calendarId]),
    [enabled],
  )
  const eventsByDay = useMemo(() => groupEventsByDate(visibleEvents), [visibleEvents])

  const monthWeeks = useMemo(() => buildMonthWeeks(viewDate), [viewDate])
  const miniWeeks = monthWeeks
  const title = formatMonthYear(viewDate)
  const selectedKey = toDateKey(selectedDay)

  function goToday() {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDay(today)
  }

  function shiftView(delta) {
    if (viewMode === 'week') {
      const next = addDays(selectedDay, delta * 7)
      setSelectedDay(next)
      setViewDate(new Date(next.getFullYear(), next.getMonth(), 1))
      return
    }
    setViewDate((current) => addMonths(current, delta))
  }

  function selectDay(date) {
    setSelectedDay(date)
    if (date.getMonth() !== viewDate.getMonth() || date.getFullYear() !== viewDate.getFullYear()) {
      setViewDate(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }

  function toggleCalendar(id) {
    setEnabled((current) => ({ ...current, [id]: !current[id] }))
  }

  const navLabel =
    viewMode === 'week' ? 'week' : viewMode === 'agenda' ? 'period' : 'month'

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="calendar"
        mobileTitle="Calendar"
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />

          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain calendar-page" role="main">
                <div id="calendar_header">
                  <div className="header-bar-outer-container calendar_header">
                    <div className="sticky-toolbar">
                      <div className="header-bar flex-container">
                        <div className="header-bar-left header-left-flex">
                          <div className="calendar_navigator">
                            <button type="button" className="navigate_today btn" onClick={goToday}>
                              Today
                            </button>
                            <span className="navigation_buttons ui-buttonset">
                              <button
                                type="button"
                                className="navigate_prev btn"
                                aria-label={`Previous ${navLabel}`}
                                onClick={() => shiftView(-1)}
                              >
                                <i className="icon-arrow-left" aria-hidden="true" />
                                <span className="screenreader-only">Previous {navLabel}</span>
                              </button>
                              <button
                                type="button"
                                className="navigate_next btn"
                                aria-label={`Next ${navLabel}`}
                                onClick={() => shiftView(1)}
                              >
                                <i className="icon-arrow-right" aria-hidden="true" />
                                <span className="screenreader-only">Next {navLabel}</span>
                              </button>
                            </span>
                            <h2 className="navigation_title" tabIndex={-1}>
                              <span className="navigation_title_text">{title}</span>
                            </h2>
                          </div>
                        </div>

                        <div className="header-bar-right header-right-flex">
                          <span className="calendar_view_buttons btn-group" role="tablist">
                            <button
                              type="button"
                              id="week"
                              className={`btn calendar-button${viewMode === 'week' ? ' active' : ''}`}
                              role="tab"
                              aria-selected={viewMode === 'week'}
                              onClick={() => setViewMode('week')}
                            >
                              Week
                            </button>
                            <button
                              type="button"
                              id="month"
                              className={`btn calendar-button${viewMode === 'month' ? ' active' : ''}`}
                              role="tab"
                              aria-selected={viewMode === 'month'}
                              onClick={() => setViewMode('month')}
                            >
                              Month
                            </button>
                            <button
                              type="button"
                              id="agenda"
                              className={`btn${viewMode === 'agenda' ? ' active' : ''}`}
                              role="tab"
                              aria-selected={viewMode === 'agenda'}
                              onClick={() => setViewMode('agenda')}
                            >
                              Agenda
                            </button>
                          </span>
                          <a
                            href="#create-event"
                            id="create_new_event_link"
                            className="btn"
                            title="Create new event"
                            role="button"
                            onClick={(event) => event.preventDefault()}
                          >
                            <i className="icon-plus" />
                            <span className="screenreader-only">Create new event</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="calendar-app" role="tabpanel" className="inline-calendar-event-titles">
                  {viewMode === 'month' ? (
                    <div className="calendar fc fc-unthemed fc-ltr">
                      <div className="fc-view-container">
                        <MonthGrid
                          weeks={monthWeeks}
                          viewDate={viewDate}
                          today={today}
                          selectedKey={selectedKey}
                          onSelectDay={selectDay}
                          eventsByDay={eventsByDay}
                        />
                      </div>
                    </div>
                  ) : null}

                  {viewMode === 'week' ? (
                    <WeekView viewDate={selectedDay} today={today} eventsByDay={eventsByDay} />
                  ) : null}

                  {viewMode === 'agenda' ? <AgendaView events={visibleEvents} /> : null}
                </div>
              </div>
            </div>
          </div>

          <div id="right-side-wrapper" className="ic-app-main-content__secondary">
            <aside id="right-side" className="calendar-page">
              <div className="rs-section hidden-phone">
                <div id="minical" className="fc fc-unthemed fc-ltr" role="region" aria-label="Mini calendar view">
                  <div className="fc-toolbar fc-header-toolbar">
                    <div className="fc-left">
                      <button
                        type="button"
                        className="fc-prev-button fc-button fc-state-default"
                        aria-label="Previous month"
                        onClick={() => setViewDate((current) => addMonths(current, -1))}
                      >
                        <span className="fc-icon fc-icon-left-single-arrow" />
                      </button>
                    </div>
                    <div className="fc-center">
                      <h2>{title}</h2>
                    </div>
                    <div className="fc-right">
                      <button
                        type="button"
                        className="fc-next-button fc-button fc-state-default"
                        aria-label="Next month"
                        onClick={() => setViewDate((current) => addMonths(current, 1))}
                      >
                        <span className="fc-icon fc-icon-right-single-arrow" />
                      </button>
                    </div>
                  </div>
                  <div className="fc-view-container">
                    <MonthGrid
                      weeks={miniWeeks}
                      viewDate={viewDate}
                      today={today}
                      selectedKey={selectedKey}
                      onSelectDay={(date) => {
                        selectDay(date)
                        setViewMode('month')
                      }}
                      compact
                    />
                  </div>
                </div>
              </div>

              <div className="rs-section">
                <h2 tabIndex={-1}>
                  <span
                    role="button"
                    id="calendar-toggle-button"
                    className="element_toggler"
                    aria-controls="calendar-list-holder"
                    aria-expanded={calendarsOpen}
                    aria-label="Calendars toggle list visibility"
                    tabIndex={0}
                    onClick={() => setCalendarsOpen((value) => !value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setCalendarsOpen((value) => !value)
                      }
                    }}
                  >
                    <i
                      className={`icon-mini-arrow-${calendarsOpen ? 'down' : 'right'} auto_rotate`}
                    />{' '}
                    Calendars
                  </span>
                </h2>

                {calendarsOpen ? (
                  <div id="calendar-list-holder">
                    <ul id="calendars-context-list">
                      {calendarsData.map((item) => {
                        const checked = Boolean(enabled[item.id])
                        const label = item.isUser ? displayName : item.name
                        return (
                          <li
                            key={item.id}
                            data-context={item.id}
                            className={`context_list_context hover-container${checked ? ' checked' : ''}`}
                          >
                            <span
                              className={`context-list-toggle-box ${item.cssClass}`}
                              role="checkbox"
                              tabIndex={0}
                              aria-checked={checked}
                              aria-labelledby={`${item.cssClass}_checkbox_label`}
                              onClick={() => toggleCalendar(item.id)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                  event.preventDefault()
                                  toggleCalendar(item.id)
                                }
                              }}
                              style={
                                checked
                                  ? undefined
                                  : { background: '#fff', borderColor: '#8b969e' }
                              }
                            />
                            <label
                              id={`${item.cssClass}_checkbox_label`}
                              style={{ flexGrow: 1 }}
                              onClick={() => toggleCalendar(item.id)}
                            >
                              {label}
                            </label>
                            <div className="buttons-wrapper" style={{ flexShrink: 0 }}>
                              <button
                                type="button"
                                tabIndex={0}
                                className="Button Button--icon-action ContextList__MoreBtn"
                                aria-label={`Open ${label} colour picker`}
                              >
                                <i className="icon-more" aria-hidden="true" />
                                <span className="screenreader-only">
                                  Open {label} colour picker
                                </span>
                              </button>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="rs-section" id="undated-events-section">
                <h2>
                  <span
                    role="button"
                    id="undated-events-button"
                    className="element_toggler"
                    aria-controls="undated-events"
                    aria-expanded={undatedOpen}
                    aria-label="Undated items toggle list visibility"
                    tabIndex={0}
                    onClick={() => setUndatedOpen((value) => !value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setUndatedOpen((value) => !value)
                      }
                    }}
                  >
                    <i
                      className={`icon-mini-arrow-${undatedOpen ? 'down' : 'right'} auto_rotate`}
                    />{' '}
                    Undated
                  </span>
                </h2>
                {undatedOpen ? (
                  <div id="undated-events">
                    <div className="agenda-empty">No undated items.</div>
                  </div>
                ) : null}
              </div>

              <div className="rs-section">
                <a
                  href="#calendar-feed"
                  id="calendar_feed_link"
                  onClick={(event) => event.preventDefault()}
                >
                  <i className="icon-calendar-days" /> Calendar feed
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
