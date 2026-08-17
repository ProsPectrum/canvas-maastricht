import { createContext, useContext, useMemo, useState } from 'react'
import {
  clearStoredUser,
  loadStoredUser,
  saveStoredUser,
} from '../utils/userProfile'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredUser())

  const value = useMemo(
    () => ({
      user,
      isSignedIn: Boolean(user),
      signIn(nextUser) {
        saveStoredUser(nextUser)
        setUser(nextUser)
      },
      signOut() {
        clearStoredUser()
        setUser(null)
      },
    }),
    [user],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
