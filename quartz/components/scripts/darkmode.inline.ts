type Theme = 'light' | 'dark'

const PREFERENCE_STORAGE_KEY = 'theme-preference'
const LEGACY_STORAGE_KEY = 'theme'

const isTheme = (value: string | null): value is Theme => value === 'light' || value === 'dark'

const nextTheme = (theme: Theme): Theme => (theme === 'light' ? 'dark' : 'light')

const emitThemeChangeEvent = (theme: Theme) => {
  const event: CustomEventMap['themechange'] = new CustomEvent('themechange', { detail: { theme } })
  document.dispatchEvent(event)
}

const readStoredTheme = (): Theme => {
  const stored = localStorage.getItem(PREFERENCE_STORAGE_KEY)
  if (isTheme(stored)) return stored
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
  if (isTheme(legacy)) return legacy
  return 'light'
}

let activeTheme: Theme = readStoredTheme()

let toggleElement: HTMLElement | null = null

const showThemeToast = (theme: Theme) => {
  const event: CustomEventMap['toast'] = new CustomEvent('toast', {
    detail: { message: `current theme: ${theme}`, containerId: 'theme-toast-container' },
  })
  document.dispatchEvent(event)
}

const updateTogglePresentation = (theme: Theme) => {
  if (!toggleElement) return
  toggleElement.setAttribute('aria-label', `Theme: ${theme}`)
  toggleElement.setAttribute('title', `Switch to ${nextTheme(theme)} theme`)
  toggleElement.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false')
  toggleElement.dataset.theme = theme
}

const applyTheme = (theme: Theme, options: { persist?: boolean; emit?: boolean } = {}) => {
  activeTheme = theme
  document.documentElement.setAttribute('saved-theme', theme)
  document.documentElement.setAttribute('data-theme-mode', theme)
  localStorage.setItem(LEGACY_STORAGE_KEY, theme)
  if (options.persist !== false) {
    localStorage.setItem(PREFERENCE_STORAGE_KEY, theme)
  }
  updateTogglePresentation(theme)
  if (options.emit !== false) {
    emitThemeChangeEvent(theme)
  }
  return theme
}

applyTheme(activeTheme, { emit: false })

document.addEventListener('nav', () => {
  const themeButton = document.querySelector('#light-toggle') as HTMLElement | null
  if (themeButton) {
    toggleElement = themeButton
    updateTogglePresentation(activeTheme)

    const activateButton = (ev: Event) => {
      ev.preventDefault()
      const next = nextTheme(activeTheme)
      applyTheme(next)
      if (ev instanceof KeyboardEvent) showThemeToast(next)
    }

    const keyActivate = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') activateButton(ev)
    }

    themeButton.addEventListener('click', activateButton)
    themeButton.addEventListener('keydown', keyActivate)

    window.addCleanup(() => {
      themeButton.removeEventListener('click', activateButton)
      themeButton.removeEventListener('keydown', keyActivate)
      toggleElement = null
    })
  }

  const shouldIgnoreTarget = (el: EventTarget | null) => {
    if (!el || !(el instanceof Element)) return false
    const tag = el.tagName.toLowerCase()
    const headingsModal = document.querySelector('.headings-modal-container') as HTMLElement
    const isHeadingsModalOpen = headingsModal && headingsModal.style.display === 'flex'
    return (
      tag === 'input' ||
      tag === 'textarea' ||
      (el as HTMLElement).isContentEditable ||
      el.closest('.search .search-container') !== null ||
      isHeadingsModalOpen
    )
  }

  const keyToggle = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (shouldIgnoreTarget(e.target)) return
    if (e.key === 'D') {
      e.preventDefault()
      const next = nextTheme(activeTheme)
      applyTheme(next)
      showThemeToast(next)
    }
  }

  document.addEventListener('keydown', keyToggle)
  window.addCleanup(() => document.removeEventListener('keydown', keyToggle))
})
