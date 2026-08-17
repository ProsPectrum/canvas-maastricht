import { Link } from 'react-router-dom'
import { ACCOUNT_TABS } from '../../data/accountTabs'

export default function AccountSideNav({ activeId, menuOpen = true }) {
  return (
    <div
      id="left-side"
      className="ic-app-course-menu ic-sticky-on list-view"
      style={{ display: menuOpen ? 'block' : 'none' }}
    >
      <div id="sticky-container" className="ic-sticky-frame">
        <nav role="navigation" aria-label="Account navigation menu">
          <ul id="section-tabs">
            {ACCOUNT_TABS.map((tab) => {
              const isActive = tab.id === activeId
              const className = [tab.className, isActive ? 'active' : '']
                .filter(Boolean)
                .join(' ')

              return (
                <li key={tab.id} className="section">
                  {tab.to ? (
                    <Link
                      id={tab.id}
                      to={tab.to}
                      aria-current={isActive ? 'page' : undefined}
                      className={className}
                      tabIndex={0}
                    >
                      {tab.label}
                    </Link>
                  ) : (
                    <a id={tab.id} href={tab.href} className={className} tabIndex={0}>
                      {tab.label}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
