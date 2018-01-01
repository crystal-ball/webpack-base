import React, { Component } from 'react'
import { object } from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'componentry'

// App Components
import ScrollToTop from 'UNIVERSAL/ScrollToTop'
import componentRegistry from 'utils/component-registry'

// Screens
import InspireScriptScreen from 'GUIDES/InspireScript.md'
import ToolchainScreen from 'GUIDES/Project Toolchain.md'
import ApplicationScreen from 'GUIDES/Project Application.md'
import StylesScreen from 'GUIDES/application/Styles.md'
import FourOhFourScreen from '../FourOhFourScreen'

// Componentry configuration defaults can be updated using the ThemeProvider
// component and passing a theme configuration object
const theme = {
  defaultButtonColor: 'primary',
}

export default class App extends Component {
  static childContextTypes = {
    REGISTRY: object,
  }

  getChildContext() {
    return { REGISTRY: componentRegistry }
  }

  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* Restores scroll position to page top on route change */}
          <ScrollToTop />
          <header className="mb-5" />
          <div className="container">
            <Switch>
              <Route path="/" exact component={InspireScriptScreen} />
              <Route path="/application" exact component={ApplicationScreen} />
              <Route path="/application/styles" component={StylesScreen} />
              <Route path="/toolchain" component={ToolchainScreen} />
              <Route component={FourOhFourScreen} />
            </Switch>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}
