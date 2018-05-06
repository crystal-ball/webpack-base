import React, { Component } from 'react'
import { object } from 'prop-types'
import { hot } from 'react-hot-loader'
import * as Componentry from 'componentry'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

// Application
import registry from 'registry'
import ScrollToTop from 'components/universal/ScrollToTop'
import logger from 'lib/logger'

import HoodImg from 'media/Hood-dan-hawk.jpg'

// Screens
import MagicMarkdownScreen from 'GUIDES/Magic Markdown.md'
import InspireScriptScreen from 'GUIDES/InspireScript.md'
import ToolchainScreen from 'GUIDES/Project Toolchain.md'
import ApplicationScreen from 'GUIDES/Project Application.md'
import StylesScreen from 'GUIDES/application/Styles.md'
import FourOhFourScreen from '../FourOhFourScreen'

// ========================================================
// Componentry Theme Customization
// ========================================================

// Componentry configuration defaults can be updated using the ThemeProvider
// component and passing a theme configuration object
const theme = {
  transitionDuration: 350,
  Button: {
    // Default all buttons to primary theme color
    color: 'primary',
  },
}

// ========================================================
// Magic Markdown Registry Setup
// ========================================================

// Register all Componentry components for convenience
Object.keys(Componentry).forEach(component => {
  if (component === 'ThemeProvider') return // Application only component
  registry.register(Componentry[component], component)
})

// Registry React Router <Link /> for convenience
registry.register(Link, 'Link')

/**
 * Application class component:
 *
 * 1. Adds the Magic Markdown registry to React's context
 * 2. Creates the application React Router router instance
 * 3. Sets up application level routing and components
 */
class App extends Component {
  static childContextTypes = { REGISTRY: object }

  getChildContext() {
    return { REGISTRY: registry.getRegistry() }
  }

  render() {
    logger('app render')
    return (
      <BrowserRouter>
        <Componentry.ThemeProvider theme={theme}>
          {/* Restores scroll position to page top on route change */}
          <ScrollToTop />
          <header className="mb-5" />
          <div className="container">
            <div className="d-flex">
              <div className="w-25">
                <img
                  src={HoodImg}
                  className="img-fluid"
                  alt="Mount Hood at night by Dan Hawk"
                />
              </div>
              <div className="w-75 ml-3">
                <Switch>
                  <Route path="/" exact component={InspireScriptScreen} />
                  <Route
                    path="/magic-markdown"
                    exact
                    component={MagicMarkdownScreen}
                  />
                  <Route path="/application" exact component={ApplicationScreen} />
                  <Route path="/application/styles" component={StylesScreen} />
                  <Route path="/toolchain" component={ToolchainScreen} />
                  <Route component={FourOhFourScreen} />
                </Switch>
              </div>
            </div>
          </div>
        </Componentry.ThemeProvider>
      </BrowserRouter>
    )
  }
}

export default hot(module)(App) // eslint-disable-line
