import { useEffect, useState } from 'react'
import GlobalNav from '../components/layout/GlobalNav'
import '../assets/dashboard/fonts-eb4a10fb18.css'
import '../assets/dashboard/variables-9dec371ad57e3dd0396f0b2eddb63479.css'
import '../assets/dashboard/common-7faef57a1a.css'
import '../assets/dashboard/um-canvas-css_2026-04-02.min.css'
import '../assets/search/external_tool_full_width.css'
import '../assets/search/search-overrides.css'

const BODY_CLASS =
  'full-width ic-no-flex-layout primary-nav-expanded context-account_1 responsive_student_grades_page ff no-touch search-page'

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12Z" />
    </svg>
  )
}

function IconTune() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 17v2h6v-2H3ZM3 5v2h10V5H3Zm10 16v-2h8v-2h-8v-2h-2v6h2ZM7 9v2H3v2h4v2h2V9H7Zm14 4v-2H11v2h10Zm-6-4h2V7h4V5h-4V3h-2v6Zm-2 0V5H9v2h4v2h-2Z" />
    </svg>
  )
}

export default function Search() {
  const [navExpanded, setNavExpanded] = useState(true)
  const [query, setQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [submitted, setSubmitted] = useState('')

  useEffect(() => {
    document.title = 'Search'
    const previous = document.body.className
    document.body.className = navExpanded
      ? BODY_CLASS
      : BODY_CLASS.replace('primary-nav-expanded', 'primary-nav-collapsed')
    return () => {
      document.body.className = previous
    }
  }, [navExpanded])

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(query.trim())
  }

  return (
    <div id="application" className="ic-app">
      <div id="flash_message_holder" />
      <div id="mobileContextNavContainer" />

      <GlobalNav
        active="search"
        mobileTitle="Search"
        onToggleNav={() => setNavExpanded((value) => !value)}
      />

      <div id="wrapper" className="ic-Layout-wrapper">
        <div id="main" className="ic-Layout-columns">
          <div className="ic-Layout-watermark" aria-hidden="true" />
          <div id="not_right_side" className="ic-app-main-content">
            <div id="content-wrapper" className="ic-Layout-contentWrapper">
              <div id="content" className="ic-Layout-contentMain" role="main">
                <div className="search-page-root">
                  <div className="aj-search-start" data-testid="search_start_screen">
                    <h1 className="aj-title">Search</h1>

                    <div className="aj-search-row">
                      <div className="aj-search--large">
                        <form role="search" className="aj-search__form" onSubmit={handleSubmit}>
                          <label htmlFor="search" className="screenreader-only">
                            Search
                          </label>
                          <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Canvas"
                            data-testid="home_search_field"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            autoComplete="off"
                          />
                          <button
                            type="button"
                            className={`aj-close-btn--large${query ? ' is-visible' : ''}`}
                            aria-label="Clear search"
                            onClick={() => {
                              setQuery('')
                              setSubmitted('')
                            }}
                          >
                            <IconClose />
                          </button>
                          <button
                            className="aj-search-btn--large"
                            type="submit"
                            value="Submit Search"
                            id="submit"
                            data-testid="home_search_field_submit_button"
                            aria-label="Submit Search"
                          >
                            <IconSearch />
                          </button>
                        </form>
                      </div>

                      <button
                        type="button"
                        aria-label="More options"
                        aria-expanded={filtersOpen}
                        className={`aj-search-controls-toggle${filtersOpen ? ' is-open' : ''}`}
                        onClick={() => setFiltersOpen((value) => !value)}
                      >
                        <IconTune />
                      </button>
                    </div>

                    {filtersOpen ? (
                      <div className="aj-search-controls" id="search-controls">
                        Filter options will appear here.
                      </div>
                    ) : null}

                    {submitted ? (
                      <div className="aj-search-results" role="status">
                        No results for “{submitted}”.
                      </div>
                    ) : null}
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
