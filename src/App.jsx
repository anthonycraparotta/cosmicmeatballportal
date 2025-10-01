import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TARGET_URL = 'https://robotsgamedemo-production.up.railway.app/'
const API_URL = import.meta.env.VITE_API_URL || '' // Use relative path for production

const initialFormState = {
  name: '',
  email: '',
  referral: '',
}

function App() {
  const [formData, setFormData] = useState(initialFormState)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState(null)
  const [windowOpen, setWindowOpen] = useState(true)
  const [folderOpen, setFolderOpen] = useState(false)
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [iconPosition, setIconPosition] = useState({ x: 44, y: 164 })
  const [folderIconPosition, setFolderIconPosition] = useState({ x: 44, y: 84 })
  const [isMuted, setIsMuted] = useState(false)
  const [audioStarted, setAudioStarted] = useState(false)
  const timeoutsRef = useRef([])
  const iconRef = useRef(null)
  const folderIconRef = useRef(null)
  const audioRef = useRef(null)

  const errors = useMemo(() => {
    const currentErrors = {}
    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()

    if (!trimmedName) {
      currentErrors.name = "What's your name?"
    }

    if (!trimmedEmail) {
      currentErrors.email = 'Email required'
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      currentErrors.email = 'Email required'
    }

    return currentErrors
  }, [formData])

  const isFormValid = Object.keys(errors).length === 0

  useEffect(() => {
    // Try to start audio on any user interaction
    const startAudio = () => {
      if (audioRef.current && !audioStarted) {
        audioRef.current.play().then(() => {
          setAudioStarted(true)
        }).catch(error => {
          console.log('Audio play failed:', error)
        })
      }
    }

    // Listen for any click on the document
    document.addEventListener('click', startAudio)

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      document.removeEventListener('click', startAudio)
    }
  }, [audioStarted])

  useEffect(() => {
    // Update audio mute state
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const registerTimeout = (timeoutId) => {
    timeoutsRef.current.push(timeoutId)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }))
  }

  const handleCloseWindow = () => {
    setWindowOpen(false)
  }

  const handleOpenWindow = (event) => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect()
      setIconPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    }
    setWindowOpen(true)
  }

  const handleOpenFolder = () => {
    if (folderIconRef.current) {
      const rect = folderIconRef.current.getBoundingClientRect()
      setFolderIconPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    }
    setFolderOpen(true)
  }

  const handleCloseFolder = () => {
    setFolderOpen(false)
  }

  const handleOpenImage = (imageSrc) => {
    setCurrentImage(imageSrc)
    setImageViewerOpen(true)
  }

  const handleCloseImageViewer = () => {
    setImageViewerOpen(false)
    setCurrentImage(null)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setTouched({ name: true, email: true, referral: true })

    if (!isFormValid) {
      return
    }

    setStatus('loading')
    setSubmitError(null)

    try {
      const response = await fetch(`${API_URL}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          referral: formData.referral.trim() || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      // Success - show granted state
      const loadingTimeout = setTimeout(() => {
        setStatus('granted')

        const redirectTimeout = setTimeout(() => {
          window.location.href = TARGET_URL
        }, 2400)

        registerTimeout(redirectTimeout)
      }, 1500)

      registerTimeout(loadingTimeout)
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError(error.message || 'TRANSMISSION FAILED - TRY AGAIN')
      setStatus('idle')
    }
  }

  return (
    <div className={`app-shell status-${status}`}>
      <audio ref={audioRef} src="/src/assets/audio/hacker.mp3" loop />
      <div className="crt-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="desktop-icons">
        <div className="desktop-icon" onClick={handleOpenWindow} ref={iconRef}>
          <img src="/src/assets/images/gameportal.png" alt="Game Portal" />
          <span>Game Portal</span>
        </div>
        <div className="desktop-icon" onClick={handleOpenFolder} ref={folderIconRef}>
          <img src="/src/assets/images/myfiles.png" alt="My Files" />
          <span>My Files</span>
        </div>
        <div className="desktop-icon" onClick={toggleMute}>
          <img src="/src/assets/images/music.png" alt="Music" />
          <span>Music</span>
        </div>
        <div className="desktop-icon" onClick={() => window.open('http://instagram.com/thecosmicmeatball', '_blank')}>
          <img src="/src/assets/images/network.png" alt="Network" />
          <span>Network</span>
        </div>
      </div>

      <div className="cosmic-logo">
        <img src="/src/assets/images/cosmiclogo.png" alt="Cosmic Meatball Logo" />
      </div>

      <main
        className={`terminal-card ${windowOpen ? 'window-open' : 'window-closed'}`}
        role="main"
        style={{
          '--icon-x': `${iconPosition.x}px`,
          '--icon-y': `${iconPosition.y}px`
        }}
      >
        <header className="terminal-header">
          <div className="window-titlebar">
            <span className="window-title-text">Cosmic Meatball Portal</span>
            <div className="window-controls">
              <button className="window-button" aria-label="Minimize">_</button>
              <button className="window-button" aria-label="Maximize">□</button>
              <button className="window-button" aria-label="Close" onClick={handleCloseWindow}>×</button>
            </div>
          </div>
          <div className="window-menu">
            <span className="menu-item">File</span>
            <span className="menu-item">Options</span>
            <span className="menu-item">Save</span>
            <span className="menu-item">Open</span>
          </div>
        </header>

        <div style={{background: '#ffffff', padding: '0.5rem 1rem 1rem 1rem'}}>
          <p className="terminal-badge">https://cosmicmeatball.com // ACCESS NODE</p>
          <h1 className="terminal-title">Enter Game Portal</h1>
          <p className="terminal-subtitle">
            Testing platform for Cosmic Meatball Games
          </p>
        </div>

        {status === 'idle' && (
          <form className="hacker-form" onSubmit={handleSubmit} noValidate>
            {submitError && (
              <div className="submit-error">
                <p className="error-message">{submitError}</p>
              </div>
            )}

            <div className={`field ${touched.name && errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name">NAME</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Agent Nova"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
                autoFocus
                required
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {touched.name && errors.name && (
                <p className="error-message" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className={`field ${touched.email && errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="agent@signal.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                required
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {touched.email && errors.email && (
                <p className="error-message" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="referral">HOW DID YOU HEAR ABOUT THE GAME?</label>
              <input
                id="referral"
                name="referral"
                type="text"
                placeholder="Valuable Intel"
                value={formData.referral}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </div>

            <button type="submit" disabled={!isFormValid || status !== 'idle'}>
              Initiate Access
            </button>
          </form>
        )}

        {status === 'loading' && (
          <section className="status-panel" aria-live="polite">
            <div className="loading-sequence" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="status-message">Decrypting access nodes...</p>
            <p className="status-submessage">Stand by while we sync with the simulation.</p>
          </section>
        )}

        {status === 'granted' && (
          <section className="status-panel granted" aria-live="assertive">
            <p className="access-granted">
              ACCESS GRANTED
            </p>
            <p className="status-submessage">Routing to Robots Game demo...</p>
          </section>
        )}

        <footer className="terminal-footer">
          <span className="indicator online" aria-hidden="true" />
          <p>Network link secure • Welcome to The Cosmic Meatball</p>
        </footer>
      </main>

      {/* My Files Folder */}
      <div
        className={`folder-window ${folderOpen ? 'window-open' : 'window-closed'}`}
        style={{
          '--icon-x': `${folderIconPosition.x}px`,
          '--icon-y': `${folderIconPosition.y}px`
        }}
      >
        <header className="terminal-header">
          <div className="window-titlebar">
            <span className="window-title-text">My Files</span>
            <div className="window-controls">
              <button className="window-button" aria-label="Minimize">_</button>
              <button className="window-button" aria-label="Maximize">□</button>
              <button className="window-button" aria-label="Close" onClick={handleCloseFolder}>×</button>
            </div>
          </div>
          <div className="window-menu">
            <span className="menu-item">File</span>
            <span className="menu-item">Edit</span>
            <span className="menu-item">View</span>
            <span className="menu-item">Help</span>
          </div>
        </header>
        <div className="folder-content">
          <div className="folder-thumbnails">
            <div className="thumbnail" onClick={() => handleOpenImage('/src/assets/images/gamethumbnail1.png')}>
              <img src="/src/assets/images/gamethumbnail1.png" alt="Game Thumbnail 1" />
              <span>gamethumbnail1.png</span>
            </div>
            <div className="thumbnail" onClick={() => handleOpenImage('/src/assets/images/gamethumbnail2.png')}>
              <img src="/src/assets/images/gamethumbnail2.png" alt="Game Thumbnail 2" />
              <span>gamethumbnail2.png</span>
            </div>
            <div className="thumbnail" onClick={() => handleOpenImage('/src/assets/images/gamethumbnail3.png')}>
              <img src="/src/assets/images/gamethumbnail3.png" alt="Game Thumbnail 3" />
              <span>gamethumbnail3.png</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Viewer */}
      {imageViewerOpen && (
        <div className="image-viewer window-open">
          <header className="terminal-header">
            <div className="window-titlebar">
              <span className="window-title-text">Image Viewer</span>
              <div className="window-controls">
                <button className="window-button" aria-label="Minimize">_</button>
                <button className="window-button" aria-label="Maximize">□</button>
                <button className="window-button" aria-label="Close" onClick={handleCloseImageViewer}>×</button>
              </div>
            </div>
            <div className="window-menu">
              <span className="menu-item">File</span>
              <span className="menu-item">View</span>
              <span className="menu-item">Help</span>
            </div>
          </header>
          <div className="image-viewer-content">
            {currentImage && <img src={currentImage} alt="Viewing" />}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <button className="start-button">
          <span className="start-icon">⊞</span>
          Start
        </button>
        <div className="taskbar-spacer"></div>
        <div className="system-tray">
          <button className="tray-icon" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
            <img
              src={isMuted ? "/src/assets/images/speakermute.png" : "/src/assets/images/speakeron.png"}
              alt={isMuted ? "Muted" : "Sound On"}
            />
          </button>
          <div className="clock">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
