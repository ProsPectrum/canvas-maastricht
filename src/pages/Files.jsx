import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalNav from '../components/layout/GlobalNav'
import {
  courseFolders,
  myFilesChildren,
  myFilesItems,
} from '../data/filesPage'
import { useUser } from '../context/UserContext'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/files/react_files-ba639294c5.css'
import '../assets/files/TreeBrowser-b5d5bef953.css'
import '../assets/files/files-overrides.css'

function FileRow({ item, displayName }) {
  const mimeClass = `media-object ef-big-icon FilesystemObjectThumbnail mimeClass-${item.mime}`

  return (
    <div className="ef-item-row" role="row" aria-selected="false">
      <div className="ef-select-col" role="gridcell">
        <label className="screenreader-only multiselectable-toggler">
          <input type="checkbox" className="screenreader-only multiselectable-toggler" />
          <span>Select {item.name}</span>
        </label>
      </div>
      <div className="ef-name-col" role="rowheader">
        <a href={`#files/${item.id}`} className="ef-name-col__link" role="button">
          <span className="ef-big-icon-container">
            <i className={mimeClass} />
          </span>
          <span className="ef-name-col__text">{item.name}</span>
        </a>
      </div>
      <div className="ef-date-created-col" role="gridcell">
        <span className="visible-desktop">{item.created}</span>
      </div>
      <div className="ef-date-modified-col" role="gridcell">
        <span className="visible-desktop">{item.modified || ''}</span>
      </div>
      <div className="ef-modified-by-col ellipsis" role="gridcell">
        {item.modifiedBy ? (
          <Link to="/profile" className="ef-plain-link">
            {displayName}
          </Link>
        ) : null}
      </div>
      <div className="ef-size-col" role="gridcell">
        {item.size}
      </div>
      <div className="ef-links-col" role="gridcell">
        {item.published ? (
          <button
            type="button"
            className="btn-link published-status published"
            title="Published"
            aria-label={`${item.name} is Published`}
          >
            <i className="icon-publish icon-Solid" />
          </button>
        ) : null}
        <button type="button" className="al-trigger al-trigger-gray btn btn-link" aria-label="Actions">
          <i className="icon-more" />
        </button>
      </div>
    </div>
  )
}

export default function Files() {
  const { user } = useUser()
  const [navExpanded, setNavExpanded] = useState(true)
  const [myFilesOpen, setMyFilesOpen] = useState(true)

  const displayName = user?.displayName || 'User'

  useEffect(() => {
    document.title = 'Files'
    const previous = document.body.className
    const navClass = navExpanded ? 'primary-nav-expanded' : 'primary-nav-collapsed'
    document.body.className = `full-width padless-content files ${navClass} context-user_130653 responsive_student_grades_page ff no-touch`
    return () => {
      document.body.className = previous
    }
  }, [navExpanded])

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="account"
        mobileTitle="Files"
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div id="main" className="ic-Layout-columns">
          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <header>
                  <h1 className="screenreader-only">Files</h1>
                </header>

                <div className="ic-app-nav-toggle-and-crumbs ic-app-nav-toggle-and-crumbs--files no-print">
                  <button
                    className="Button Button--link ic-app-course-nav-toggle"
                    type="button"
                    id="courseMenuToggle"
                    aria-label="Show and hide courses menu"
                    aria-hidden="true"
                  >
                    <i className="icon-hamburger" aria-hidden="true" />
                  </button>
                  <div className="ic-app-crumbs">
                    <nav aria-label="breadcrumbs" id="breadcrumbs">
                      <ol>
                        <li className="home">
                          <Link to="/dashboard">
                            <i className="icon-home standalone-icon" title="My dashboard">
                              <span className="screenreader-only">My dashboard</span>
                            </i>
                          </Link>
                        </li>
                        <li>
                          <Link to="/profile">
                            <span className="ellipsible">{displayName}</span>
                          </Link>
                        </li>
                        <li aria-current="page">
                          <span className="ellipsis">Files</span>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>

                <header className="ef-header" role="region" aria-label="Files toolbar">
                  <form
                    className="ic-Input-group ef-search-form"
                    onSubmit={(event) => event.preventDefault()}
                  >
                    <input
                      placeholder="Search for files"
                      aria-label="Search for files"
                      type="search"
                      className="ic-Input"
                    />
                    <button className="Button" type="submit">
                      <i className="icon-search" />
                      <span className="screenreader-only">Search for files</span>
                    </button>
                  </form>

                  <div className="ef-header__secondary">
                    <span className="ef-selected-count hidden-tablet hidden-phone">
                      0 items selected
                    </span>
                    <div className="ef-actions">
                      <button type="button" className="btn btn-switch-to-new-files-page">
                        Switch to New Files Page
                      </button>
                      <button type="button" className="btn btn-add-folder" aria-label="Add folder">
                        <i className="icon-plus" />
                        <span>Folder</span>
                      </button>
                      <button type="button" className="btn btn-primary btn-upload" aria-label="Upload">
                        <i className="icon-upload" />
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>
                </header>

                <div className="ef-main">
                  <aside
                    className="visible-desktop ef-folder-content"
                    role="region"
                    aria-label="Folder Browsing Tree"
                  >
                    <div className="ef-folder-list">
                      <ul role="tree" tabIndex={0} className="tree" aria-label="Folder Browsing Tree">
                        <li
                          role="treeitem"
                          aria-expanded={myFilesOpen}
                          aria-label="My Files"
                          aria-level={1}
                        >
                          <a
                            className={`treeLabel expanded selected`}
                            role="presentation"
                            tabIndex={-1}
                            href="#my-files"
                            onClick={(event) => {
                              event.preventDefault()
                              setMyFilesOpen((value) => !value)
                            }}
                          >
                            <i className="icon-mini-arrow-right" />
                            <i className="icon-folder" />
                            <span>My Files</span>
                          </a>
                          {myFilesOpen ? (
                            <ul role="group" className="treeContents">
                              <li className="subtrees">
                                <ul className="collectionViewItems">
                                  {myFilesChildren.map((folder) => (
                                    <li
                                      key={folder.id}
                                      role="treeitem"
                                      aria-expanded="false"
                                      aria-label={folder.name}
                                      aria-level={2}
                                    >
                                      <a
                                        className="treeLabel"
                                        role="presentation"
                                        tabIndex={-1}
                                        href={`#files/${folder.id}`}
                                      >
                                        <i className="icon-mini-arrow-right" style={{ visibility: 'hidden' }} />
                                        <i
                                          className={
                                            folder.locked ? 'icon-folder-locked' : 'icon-folder'
                                          }
                                        />
                                        <span>{folder.name}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            </ul>
                          ) : null}
                        </li>

                        {courseFolders.map((name) => (
                          <li
                            key={name}
                            role="treeitem"
                            aria-expanded="false"
                            aria-label={name}
                            aria-level={1}
                          >
                            <a
                              className="treeLabel"
                              role="presentation"
                              tabIndex={-1}
                              href={`#files/course/${encodeURIComponent(name)}`}
                            >
                              <i className="icon-mini-arrow-right" />
                              <i className="icon-folder" />
                              <span>{name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="ef-folder-quota" data-testid="files-usage">
                      <div
                        className="progress-bar__bar-container"
                        aria-hidden="true"
                        data-testid="progress-container"
                      >
                        <div
                          className="progress-bar__bar"
                          style={{ width: '0%' }}
                          data-testid="progress-bar"
                        />
                      </div>
                      <div className="ef-quota-text" data-testid="usage-text">
                        0% of 1 GB used
                      </div>
                      <div className="screenreader-only" data-testid="sr-usage-text">
                        Files quota: 0% of 1 GB used
                      </div>
                    </div>
                  </aside>

                  <div className="ef-directory" role="region" aria-label="File List">
                    <div role="grid">
                      <header className="ef-directory-header" role="row">
                        <div className="ef-select-col" role="columnheader">
                          <span className="screenreader-only">Select</span>
                        </div>
                        <div className="current-filter ef-name-col" role="columnheader" aria-sort="ascending">
                          <a className="ef-plain-link" href="#sort-name">
                            <span>Name</span>
                            <i className="icon-mini-arrow-up">
                              <span className="screenreader-only">Sorted ascending</span>
                            </i>
                          </a>
                        </div>
                        <div className="ef-date-created-col" role="columnheader">
                          <a className="ef-plain-link" href="#sort-created">
                            <span className="visible-desktop">Date Created</span>
                          </a>
                        </div>
                        <div className="ef-date-modified-col" role="columnheader">
                          <a className="ef-plain-link" href="#sort-modified">
                            <span className="visible-desktop">Date Modified</span>
                          </a>
                        </div>
                        <div className="ef-modified-by-col" role="columnheader">
                          <a className="ef-plain-link" href="#sort-user">
                            <span>Modified By</span>
                          </a>
                        </div>
                        <div className="ef-size-col" role="columnheader">
                          <a className="ef-plain-link" href="#sort-size">
                            <span>Size</span>
                          </a>
                        </div>
                        <div className="ef-links-col" role="columnheader">
                          <span className="screenreader-only">Actions</span>
                        </div>
                      </header>

                      {myFilesItems.map((item) => (
                        <FileRow key={item.id} item={item} displayName={displayName} />
                      ))}
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
    </div>
  )
}
