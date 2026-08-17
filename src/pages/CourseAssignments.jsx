import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import CourseShell from '../components/course/CourseShell'
import {
  courseAssignmentGroups,
  courseAssignments,
} from '../data/courseAssignments'
import '../assets/course/new_assignments-86234000f9.css'
import '../assets/course/AssignmentGroupListItem-b349f31f5e.css'
import '../assets/course/assignments-overrides.css'

function SearchIcon() {
  return (
    <svg viewBox="0 0 1920 1920" width="1em" height="1em" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
      />
    </svg>
  )
}

export default function CourseAssignments() {
  const { courseId } = useParams()
  const basePath = `/courses/${courseId}`
  const [query, setQuery] = useState('')
  const [showBy, setShowBy] = useState('date')

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filteredAssignments = needle
      ? courseAssignments.filter((item) =>
          String(item.title || '')
            .toLowerCase()
            .includes(needle),
        )
      : courseAssignments

    if (courseAssignmentGroups.length === 0) {
      return []
    }

    return courseAssignmentGroups
      .map((group) => ({
        ...group,
        assignments: filteredAssignments.filter(
          (item) => item.groupId === group.id,
        ),
      }))
      .filter((group) => group.assignments.length > 0 || !needle)
  }, [query])

  const isEmpty = courseAssignments.length === 0

  return (
    <CourseShell
      courseId={courseId}
      activeNav="assignments"
      documentTitle="Assignments"
      bodyExtraClass="with_item_groups padless-content assignments"
      crumbLabel="Assignments"
      showImmersiveReader={false}
    >
      <div className="course-assignments-page">
        <h1 className="screenreader-only">Assignments</h1>

        <div className="header-bar course-assignments-header">
          <div className="header-bar-left ic-Form-control assignment-search">
            <div className="ic-Multi-input course-assignments-search">
              <label className="screenreader-only" htmlFor="assignment-search-input">
                Search for Assignment
              </label>
              <SearchIcon />
              <input
                id="assignment-search-input"
                data-testid="assignment-search-input"
                type="search"
                placeholder="Search..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          <div className="header-bar-right course-assignments-show-by">
            <fieldset className="course-assignments-show-by__fieldset">
              <legend className="screenreader-only">Show by</legend>
              <label className="course-assignments-show-by__option">
                <input
                  type="radio"
                  name="show_by"
                  value="date"
                  checked={showBy === 'date'}
                  onChange={() => setShowBy('date')}
                />
                <span>Show by date</span>
              </label>
              <label className="course-assignments-show-by__option">
                <input
                  type="radio"
                  name="show_by"
                  value="type"
                  checked={showBy === 'type'}
                  onChange={() => setShowBy('type')}
                />
                <span>Show by Type</span>
              </label>
            </fieldset>
          </div>
        </div>

        <div
          data-view="assignmentGroups"
          className="item-group-container"
          id="ag-list"
        >
          {isEmpty ? (
            <div className="course-assignments-empty">
              <p>No assignments yet.</p>
              <p>Content will be added here later.</p>
            </div>
          ) : (
            <ul className="collectionViewItems ig-list" role="presentation">
              {groups.map((group) => (
                <li key={group.id} className="item-group-condensed">
                  <div
                    id={`assignment_group_${group.id}`}
                    data-id={group.id}
                    className="assignment_group"
                  >
                    <div className="ig-header">
                      <h2 className="ig-header-title">
                        <button
                          type="button"
                          className="element_toggler accessible-toggler"
                          aria-expanded="true"
                          tabIndex={0}
                        >
                          <i className="icon-mini-arrow-down" aria-hidden="true" />
                          {group.title}
                        </button>
                      </h2>
                      <div className="ag-header-controls" />
                    </div>

                    <div
                      id={`assignment_group_${group.id}_assignments`}
                      className="assignment-list"
                    >
                      <ul
                        className="collectionViewItems ig-list draggable"
                        role="presentation"
                      >
                        {group.assignments.map((item) => (
                          <li
                            key={item.id}
                            className="assignment sort-disabled search_show"
                          >
                            <div
                              id={`assignment_${item.id}`}
                              className="ig-row"
                              data-item-id={item.id}
                            >
                              <div className="ig-row__layout">
                                <div className="ig-type-icon">
                                  <i
                                    aria-hidden="true"
                                    className="icon-assignment"
                                  />
                                  <span className="screenreader-only">
                                    Assignment
                                  </span>
                                </div>
                                <div className="ig-info">
                                  <Link
                                    to={`${basePath}/assignments/${item.id}`}
                                    className="ig-title"
                                  >
                                    {item.title}
                                  </Link>
                                  <div className="ig-details rendered">
                                    {item.dueLabel ? (
                                      <div className="ig-details__item assignment-date-due">
                                        <span>Due</span> {item.dueLabel}
                                      </div>
                                    ) : null}
                                    {item.pointsLabel ? (
                                      <span className="js-score">
                                        <span
                                          className="score-display"
                                          title={item.scoreTitle || undefined}
                                        >
                                          {item.pointsLabel}
                                        </span>
                                        {item.gradeLabel ? (
                                          <>
                                            {' '}
                                            |{' '}
                                            <span className="grade-display">
                                              {item.gradeLabel}
                                            </span>
                                          </>
                                        ) : null}
                                        {item.statusText ? (
                                          <span className="screenreader-only">
                                            {item.statusText}
                                          </span>
                                        ) : null}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </CourseShell>
  )
}
