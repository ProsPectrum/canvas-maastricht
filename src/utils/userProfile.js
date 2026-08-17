const STORAGE_KEY = 'um-canvas-user'

function capitalizeWord(word) {
  if (!word) return ''
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

/**
 * Accepts: name.surname@student.maastrichtuniversity.nl
 * Returns display parts or null if invalid.
 */
export function parseStudentEmail(rawEmail) {
  const email = String(rawEmail || '').trim()
  const match = email.match(
    /^([^.@]+)\.([^.@]+)@student\.maastrichtuniversity\.nl$/i,
  )

  if (!match) return null

  const firstName = capitalizeWord(match[1])
  const lastName = capitalizeWord(match[2])

  return {
    email: `${match[1].toLowerCase()}.${match[2].toLowerCase()}@student.maastrichtuniversity.nl`,
    firstName,
    lastName,
    displayName: `${firstName} ${lastName}`,
  }
}

export function loadStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const user = JSON.parse(raw)
    if (!user?.email || !user?.displayName) return null
    return user
  } catch {
    return null
  }
}

export function saveStoredUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEY)
}
