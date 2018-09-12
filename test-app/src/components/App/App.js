import React from 'react'
import { hot } from 'react-hot-loader'
import * as Componentry from 'componentry'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Application
import ScrollToTop from 'components/universal/ScrollToTop/ScrollToTop'
import logger from 'lib/logger'

import MagicImg from 'media/karly-santiago.jpg'

// Screens
import HomeScreen from '../HomeScreen/HomeScreen'
import FourOhFourScreen from '../FourOhFourScreen/FourOhFourScreen'

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

/**
 * Application class component:
 *
 * 1. Creates the application React Router router instance
 * 2. Sets up application level routing and components
 */
const App = () => {
  logger('Test application initialized 🎉')

  return (
    <BrowserRouter>
      <Componentry.ThemeProvider theme={theme}>
        {/* Restores scroll position to page top on route change */}
        <ScrollToTop />
        <header className="mb-5" />
        <div className="container">
          <div className="d-flex">
            <div className="w-25">
              <img src={MagicImg} className="img-fluid" alt="In pursuit of magic" />
            </div>
            <div className="w-75 ml-3">
              <Switch>
                <Route to="/" exact component={HomeScreen} />
                <Route component={FourOhFourScreen} />
              </Switch>
            </div>
          </div>
        </div>
      </Componentry.ThemeProvider>
    </BrowserRouter>
  )
}

export default hot(module)(App) // eslint-disable-line
