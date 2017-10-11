import React from 'react'
import { bool, shape, string } from 'prop-types'
import classNames from 'classnames'

Icon.propTypes = {
  className: string,
  font: bool,
  icon: shape({
    id: string.isRequired,
  }).isRequired,
  title: string,
  presentation: bool,
}

Icon.defaultProps = {
  className: '',
  font: true,
  presentation: false,
  title: null,
}

/**
 * Use the icon component with an svg imported from `/media/icons` to create an icon
 * font.
 */
export default function Icon({ className, font, icon, presentation, title }) {
  return (
    <svg
      aria-label={title}
      role={presentation ? 'presentation' : 'img'}
      className={classNames('icon', icon.id, className, { font })}
    >
      <use xlinkHref={`#${icon.id}`} href={`#${icon.id}`} />
    </svg>
  )
}
