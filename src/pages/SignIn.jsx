import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { parseStudentEmail } from '../utils/userProfile'
import logo from '../assets/sign-in/logo.png'
import '../assets/sign-in/style.css'

const ERRORS = {
  userNameFormatError:
    'Enter your email as name.surname@student.maastrichtuniversity.nl',
}

const PLACEHOLDERS = {
  en: {
    userNameInput: 'E-mailaddress or username',
    passwordInput: 'Password',
  },
  nl: {
    userNameInput: 'E-mailadres of gebruikersnaam',
    passwordInput: 'Wachtwoord',
  },
  de: {
    userNameInput: 'E-mail-Adresse oder Benutzername',
    passwordInput: 'Kennwort',
  },
}

function getLocalizedPlaceholders() {
  const languageAndCountry =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    'en'
  const language = languageAndCountry.slice(0, 2).toLowerCase()
  return PLACEHOLDERS[language] || PLACEHOLDERS.en
}

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useUser()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errorFor, setErrorFor] = useState('')
  const [placeholders] = useState(getLocalizedPlaceholders)
  const userNameRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    document.title = 'Sign In'
    userNameRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!error) return
    if (errorFor === 'userNameInput') {
      userNameRef.current?.focus()
    } else if (errorFor === 'passwordInput') {
      passwordRef.current?.focus()
    }
  }, [error, errorFor])

  function showError(fieldId, message) {
    setError(message)
    setErrorFor(fieldId)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const profile = parseStudentEmail(userName)
    if (!profile) {
      showError('userNameInput', ERRORS.userNameFormatError)
      return
    }

    setError('')
    setErrorFor('')
    signIn(profile)
    navigate('/dashboard', { replace: true })
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSubmit(event)
    }
  }

  return (
    <div className="sign-in-page">
    <div className="body" dir="ltr">
      <div id="fullPage">
        <div id="brandingWrapper" className="float">
          <div id="branding" />
        </div>
        <div id="contentWrapper" className="float">
          <div id="content">
            <div id="header">
              <img
                className="logoImage"
                id="companyLogo"
                src={logo}
                alt="Maastricht University"
              />
            </div>
            <main>
              <div id="workArea">
                <div id="authArea" className="groupMargin">
                  <div id="loginArea">
                    <div id="loginMessage" className="groupMargin" />

                    <form
                      method="post"
                      id="loginForm"
                      autoComplete="off"
                      noValidate
                      onSubmit={handleSubmit}
                      onKeyDown={handleKeyDown}
                    >
                      <div
                        id="error"
                        className="fieldMargin error smallText"
                        style={{ display: error ? '' : 'none' }}
                      >
                        <span
                          id="errorText"
                          aria-live="assertive"
                          role="alert"
                        >
                          {error}
                        </span>
                      </div>

                      <div id="formsAuthenticationArea">
                        <div id="userNameArea">
                          <label
                            id="userNameInputLabel"
                            htmlFor="userNameInput"
                            className="hidden"
                          >
                            User Account
                          </label>
                          <input
                            ref={userNameRef}
                            id="userNameInput"
                            name="UserName"
                            type="email"
                            value={userName}
                            tabIndex={1}
                            className="text fullWidth"
                            spellCheck={false}
                            placeholder={placeholders.userNameInput}
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>

                        <div id="passwordArea">
                          <label
                            id="passwordInputLabel"
                            htmlFor="passwordInput"
                            className="hidden"
                          >
                            Password
                          </label>
                          <input
                            ref={passwordRef}
                            id="passwordInput"
                            name="Password"
                            type="password"
                            value={password}
                            tabIndex={2}
                            className="text fullWidth"
                            placeholder={placeholders.passwordInput}
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div id="kmsiArea" style={{ display: 'none' }}>
                          <input
                            type="checkbox"
                            name="Kmsi"
                            id="kmsiInput"
                            value="true"
                            tabIndex={3}
                          />
                          <label htmlFor="kmsiInput">Keep me signed in</label>
                        </div>

                        <div id="submissionArea" className="submitMargin">
                          <button
                            type="submit"
                            id="submitButton"
                            className="submit"
                            tabIndex={4}
                          >
                            Sign in
                          </button>
                        </div>
                      </div>
                    </form>

                    <div id="introduction" className="groupMargin">
                      <p
                        align="center"
                        style={{
                          fontFamily: 'TheSans, Verdana, sans-serif',
                          fontSize: '10pt',
                        }}
                      >
                        <font face="sans-serif">
                          Multi Factor Authentication (MFA) is required during
                          login.
                          <br />
                          For more information on MFA, check{' '}
                          <a
                            href="https://www.maastrichtuniversity.nl/mfa"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://www.maastrichtuniversity.nl/mfa
                          </a>
                        </font>
                      </p>
                      <br />
                      <p
                        align="center"
                        style={{
                          fontFamily: 'TheSans, Verdana, sans-serif',
                          fontSize: '10pt',
                        }}
                      >
                        <font face="sans-serif" size="1">
                          Need help? Go to{' '}
                          <a
                            href="https://myaccount.maastrichtuniversity.nl/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            password recovery
                          </a>{' '}
                          or{' '}
                          <a
                            href="http://www.maastrichtuniversity.nl/icts"
                            target="_blank"
                            rel="noreferrer"
                          >
                            general support
                          </a>
                          .
                          <br />
                          <br />
                          <i>
                            Be safe: only log in if the URL starts with
                            https://login.maastrichtuniversity.nl
                          </i>
                        </font>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <div id="footerPlaceholder" />
          </div>
          <footer id="footer">
            <div id="footerLinks" className="floatReverse">
              <div>
                <span id="copyright">© 2018 Microsoft</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
    </div>
  )
}
