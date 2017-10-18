import React, { Component } from 'react'
import { bool, string } from 'prop-types'
import classNames from 'classnames'

/**
 * Use the icon component with an svg imported from `/media/icons` to create an icon
 * font.
 */
export default class Icon extends Component {
  static propTypes = {
    className: string,
    font: bool,
    id: string.isRequired,
    title: string,
    presentation: bool,
  }

  static defaultProps = {
    className: '',
    font: true,
    presentation: false,
    title: null,
  }

  constructor(props) {
    super(props)
    import(/* webpackMode: "eager", webpackChunkName: "icons" */ `media/icons/${props.id}.svg`)
  }

  render() {
    const { title, presentation, id, className, font } = this.props

    return (
      <svg
        aria-label={title}
        role={presentation ? 'presentation' : 'img'}
        className={classNames('icon', id, className, { font })}
      >
        <use xlinkHref={`#${id}`} href={`#${id}`} />
      </svg>
    )
  }
}
