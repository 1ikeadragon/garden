import { QuartzComponent, QuartzComponentConstructor } from '../types/component'
// @ts-ignore
import script from './scripts/matuschak.inline'
import style from './styles/matuschak.scss'

export default (() => {
  const StackedNotes: QuartzComponent = () => {
    return (
      <div class="stacked-buttons">
        <span
          id="stacked-note-toggle"
          title="Toggle stacked notes"
          aria-label="Toggle stacked notes"
          role="switch"
          // @ts-ignore
          type="button"
          aria-checked="false"
        >
          <div class="tile-stack">
            <div class="tile" />
          </div>
        </span>
      </div>
    )
  }

  StackedNotes.css = style
  StackedNotes.afterDOMLoaded = script

  return StackedNotes
}) satisfies QuartzComponentConstructor
