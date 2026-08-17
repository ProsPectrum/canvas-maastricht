import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountSideNav from '../components/layout/AccountSideNav'
import GlobalNav from '../components/layout/GlobalNav'
import { useUser } from '../context/UserContext'
import avatar from '../assets/profile/avatar-50.png'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/profile/profile_show-f0a8fc8323.css'
import '../assets/profile/profile-overrides.css'
import '../assets/notifications/notification-overrides.css'

export default function UserProfile() {
  const { user } = useUser()
  const [navExpanded, setNavExpanded] = useState(true)
  const [editing, setEditing] = useState(false)
  const [menuOpen, setMenuOpen] = useState(true)

  const displayName = user?.displayName || 'User'
  const profileTitle = `${displayName}'s profile`
  const avatarUrl = `url(${avatar})`

  useEffect(() => {
    document.title = 'User Profile'
    const previous = document.body.className
    const editingClass = editing ? 'editing' : 'not-editing'
    const navClass = navExpanded ? 'primary-nav-expanded' : 'primary-nav-collapsed'
    const menuClass = menuOpen ? 'course-menu-expanded' : 'course-menu-collapsed'
    document.body.className = `${editingClass} with-left-side ${menuClass} profile ${navClass} full-width context-user_130653 responsive_student_grades_page ff no-touch`
    return () => {
      document.body.className = previous
    }
  }, [editing, navExpanded, menuOpen])

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="account"
        mobileTitle="Account"
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div className="ic-app-nav-toggle-and-crumbs no-print">
          <button
            type="button"
            id="courseMenuToggle"
            className="Button Button--link ic-app-course-nav-toggle"
            aria-live="polite"
            aria-label={menuOpen ? 'Hide account navigation menu' : 'Show account navigation menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <i className="icon-hamburger" aria-hidden="true" />
          </button>

          <div className="ic-app-crumbs">
            <nav id="breadcrumbs" role="navigation" aria-label="breadcrumbs">
              <ol>
                <li className="home">
                  <Link to="/dashboard">
                    <span className="ellipsible">
                      <i className="icon-home" title="My dashboard">
                        <span className="screenreader-only">My dashboard</span>
                      </i>
                    </span>
                  </Link>
                </li>
                <li aria-current="page">
                  <span className="ellipsible">{profileTitle}</span>
                </li>
              </ol>
            </nav>
          </div>

          <div id="nutrition_facts_container" />
          <div className="right-of-crumbs right-of-crumbs-no-reverse">
            <div id="ai-information-mount" />
          </div>
        </div>

        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />
          <AccountSideNav activeId="profile-link" menuOpen={menuOpen} />

          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <div className="ic-Profile-layout">
                  <h1>User Profile</h1>

                  <div className="ic-Profile-layout__Primary">
                    <div className="header-block legacy">
                      <div className="account-info-block">
                        <div className="image-block-image profile-avatar-wrapper">
                          <span
                            className="fs-exclude avatar profile_pic_link"
                            style={{
                              backgroundImage: avatarUrl,
                              width: 128,
                              height: 128,
                            }}
                          >
                            <span className="screenreader-only">{displayName}</span>
                            <i className="icon-edit" />
                          </span>
                          <button
                            id="profile-edit-link"
                            type="button"
                            className="btn btn-small profile-edit-link"
                            aria-label={`Click to change profile picture for ${displayName}`}
                          >
                            Edit Profile Picture
                          </button>
                          <div id="avatar-modal-mount" />
                        </div>

                        <form
                          id="edit_profile_form"
                          className="ic-Form-control"
                          noValidate
                          onSubmit={(event) => {
                            event.preventDefault()
                            setEditing(false)
                          }}
                        >
                          <div className="content-block">
                            <div className="profileContent__Block">
                              <h2 className="hide-if-editing">{displayName} </h2>
                              <h2 className="show-if-editing">{displayName} </h2>

                              <label htmlFor="pronouns" className="show-if-editing ic-Label">
                                Pronouns
                              </label>
                              <select
                                name="pronouns"
                                id="pronouns"
                                className="show-if-editing"
                                defaultValue=""
                              >
                                <option value="">None</option>
                                <option value="She/Her">She/Her</option>
                                <option value="He/Him">He/Him</option>
                                <option value="They/Them">They/Them</option>
                                <option value="She & He">She &amp; He</option>
                                <option value="She & They">She &amp; They</option>
                                <option value="He & They">He &amp; They</option>
                                <option value="She & He & They">She &amp; He &amp; They</option>
                                <option value="Any pronoun">Any pronoun</option>
                              </select>

                              <div className="profileDetails">
                                <span className="hide-if-editing" />
                                <span className="show-if-editing" />
                              </div>

                              <div className="show-if-editing edit-contact-methods">
                                <h3 className="profileHeader">Contact</h3>
                                <p>
                                  No registered services. You can add some on the{' '}
                                  <a href="#settings">settings</a> page.
                                </p>
                              </div>

                              <div className="hide-if-editing">
                                <h3 className="profileHeader">Contact</h3>
                                <p>
                                  No registered services. You can add some on the{' '}
                                  <a href="#settings">settings</a> page.
                                </p>
                              </div>

                              <div>
                                <div className="hide-if-editing">
                                  <h3 id="profile_bio_label" className="profileHeader">
                                    Biography
                                  </h3>
                                  <p id="biography_empty_message">No biography has been added</p>
                                </div>
                                <div className="show-if-editing">
                                  <label className="ic-Label">
                                    Biography
                                    <textarea
                                      className="ic-Input labeled-error"
                                      id="profile_bio"
                                      name="user_profile[bio]"
                                      aria-labelledby="profile_bio_label"
                                    />
                                  </label>
                                </div>
                              </div>

                              <div className="profile_links">
                                <h3 className="profileHeader">Links</h3>
                                <div className="hide-if-editing">
                                  <p id="links_empty_message">No links have been added</p>
                                </div>

                                <input type="hidden" name="delete_links" value="1" />
                                <div className="show-if-editing">
                                  <table id="edit_links_table">
                                    <thead>
                                      <tr>
                                        <th scope="col">Title</th>
                                        <th />
                                        <th scope="col">URL</th>
                                      </tr>
                                    </thead>
                                    <tbody id="profile_link_fields" />
                                  </table>
                                  <button
                                    type="button"
                                    data-event="addLinkField"
                                    className="btn btn-small"
                                  >
                                    Add another link
                                  </button>
                                </div>
                              </div>

                              <div className="form-actions no-margin-bottom show-if-editing">
                                <button
                                  type="button"
                                  data-event="cancelEditProfile"
                                  className="btn"
                                  onClick={() => setEditing(false)}
                                >
                                  Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                  Save profile
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="button-area-block">
                        <button
                          type="button"
                          data-event="editProfile"
                          className="hide-if-editing Button"
                          onClick={() => setEditing(true)}
                        >
                          <i className="icon-edit" /> Edit Profile
                        </button>
                        <button
                          type="button"
                          data-event="cancelEditProfile"
                          className="show-if-editing Button"
                          onClick={() => setEditing(false)}
                        >
                          <i className="icon-edit" />
                          Cancel editing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="right-side-wrapper" className="ic-app-main-content__secondary">
            <aside id="right-side" />
          </div>
        </div>
      </div>

      <footer role="contentinfo" id="footer" className="ic-app-footer">
        <a
          href="http://www.instructure.com/"
          className="footer-logo ic-app-footer__logo-link"
          target="_blank"
          rel="noreferrer"
        >
          <span className="screenreader-only">By Instructure</span>
        </a>
        <div id="footer-links" className="ic-app-footer__links">
          <a
            href="https://library.maastrichtuniversity.nl/maastricht-university-canvas-privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.instructure.com/policies/canvas-lms-cookie-notice"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookie Notice
          </a>
          <a
            href="https://www.instructure.com/policies/acceptable-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acceptable Use Policy
          </a>
        </div>
      </footer>
    </div>
  )
}
