import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import { UserProvider } from './context/UserContext'
import Calendar from './pages/Calendar'
import CourseAssignment from './pages/CourseAssignment'
import CourseAssignments from './pages/CourseAssignments'
import Course from './pages/Course'
import CourseAnnouncementMessage from './pages/CourseAnnouncementMessage'
import CourseAnnouncements from './pages/CourseAnnouncements'
import CourseModules from './pages/CourseModules'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import EPortfolios from './pages/EPortfolios'
import Files from './pages/Files'
import GlobalAnnouncements from './pages/GlobalAnnouncements'
import Groups from './pages/Groups'
import History from './pages/History'
import Inbox from './pages/Inbox'
import NotificationSettings from './pages/NotificationSettings'
import Search from './pages/Search'
import SignIn from './pages/SignIn'
import UserProfile from './pages/UserProfile'
import UserSettings from './pages/UserSettings'

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-in" element={<Navigate to="/" replace />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/courses"
            element={
              <RequireAuth>
                <Courses />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <RequireAuth>
                <Course />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:courseId/announcements"
            element={
              <RequireAuth>
                <CourseAnnouncements />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:courseId/announcements/:announcementId"
            element={
              <RequireAuth>
                <CourseAnnouncementMessage />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:courseId/modules"
            element={
              <RequireAuth>
                <CourseModules />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:courseId/assignments"
            element={
              <RequireAuth>
                <CourseAssignments />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:courseId/assignments/:assignmentId"
            element={
              <RequireAuth>
                <CourseAssignment />
              </RequireAuth>
            }
          />
          <Route
            path="/groups"
            element={
              <RequireAuth>
                <Groups />
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <Calendar />
              </RequireAuth>
            }
          />
          <Route
            path="/inbox"
            element={
              <RequireAuth>
                <Inbox />
              </RequireAuth>
            }
          />
          <Route
            path="/search"
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequireAuth>
                <History />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/notifications"
            element={
              <RequireAuth>
                <NotificationSettings />
              </RequireAuth>
            }
          />
          <Route
            path="/files"
            element={
              <RequireAuth>
                <Files />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <UserSettings />
              </RequireAuth>
            }
          />
          <Route
            path="/eportfolios"
            element={
              <RequireAuth>
                <EPortfolios />
              </RequireAuth>
            }
          />
          <Route
            path="/announcements"
            element={
              <RequireAuth>
                <GlobalAnnouncements />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}
