// @flow
import React from 'react'
import classNames from 'classnames'

type Props = {
  className: ?string,
  font: ?boolean,
  id: string,
  presentation: ?boolean,
}

/**
 * Use the icon component with an svg imported from `/media/icons` to create an icon
 * font.
 */
export default ({
  presentation = false,
  id,
  className = '',
  font = true,
  ...rest
}: Props) => (
  <svg
    role={presentation ? 'presentation' : 'img'}
    className={classNames('icon', id, className, { font })}
    {...rest}
  >
    <use xlinkHref={`#${id}`} href={`#${id}`} />
  </svg>
)
