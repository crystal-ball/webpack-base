import { Component } from 'react'
import { node, shape, string } from 'prop-types'
import { withRouter } from 'react-router-dom'

/**
 * Component that should be included only once per app. It restores scroll position
 * to the top of the page anytime the location changes.
 * See: https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
class ScrollToTop extends Component {
  static propTypes = {
    children: node,
    location: shape({
      pathname: string.isRequired,
    }).isRequired,
  }

  static defaultProps = { children: null }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children || null
  }
}

export default withRouter(ScrollToTop)
