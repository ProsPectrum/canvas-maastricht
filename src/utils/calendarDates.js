const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function addMonths(date, months) {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

/** Monday-based start of week */
export function startOfWeek(date) {
  const d = startOfDay(date)
  const day = d.getDay() // 0 Sun .. 6 Sat
  const diff = day === 0 ? -6 : 1 - day
  return addDays(d, diff)
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function formatMonthYear(date) {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}

export function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function buildMonthWeeks(viewDate) {
  const monthStart = startOfMonth(viewDate)
  const gridStart = startOfWeek(monthStart)
  const weeks = []

  let cursor = gridStart
  for (let w = 0; w < 6; w += 1) {
    const days = []
    for (let i = 0; i < 7; i += 1) {
      days.push(new Date(cursor))
      cursor = addDays(cursor, 1)
    }
    weeks.push(days)
  }

  return weeks
}

export function dayMeta(date, viewDate, today) {
  const key = toDateKey(date)
  const otherMonth = date.getMonth() !== viewDate.getMonth()
  const isToday = sameDay(date, today)
  let temporal = 'fc-future'
  if (isToday) temporal = 'fc-today'
  else if (date < startOfDay(today)) temporal = 'fc-past'

  const weekday = WEEKDAY_KEYS[date.getDay() === 0 ? 6 : date.getDay() - 1]

  return {
    key,
    date,
    day: date.getDate(),
    otherMonth,
    isToday,
    weekday,
    className: [
      'fc-day',
      'fc-widget-content',
      `fc-${weekday}`,
      otherMonth ? 'fc-other-month' : '',
      temporal,
    ]
      .filter(Boolean)
      .join(' '),
    topClassName: [
      'fc-day-top',
      `fc-${weekday}`,
      otherMonth ? 'fc-other-month' : '',
      temporal,
    ]
      .filter(Boolean)
      .join(' '),
  }
}

export { WEEKDAYS, WEEKDAY_KEYS, MONTH_NAMES }
