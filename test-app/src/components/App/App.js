import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Flex, ThemeProvider } from 'componentry'
import styled from 'styled-components'

// Application
import { ScrollToTop } from 'components/universal'
import Footer from './Footer'
import logger from 'lib/logger'

import 'lib/require-icons' // webpack require.context to import all sprite icons

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

const AppContainer = styled(Flex)`
  height: 100vh;
`

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
      <ThemeProvider.Provider value={theme}>
        {/* Restores scroll position to page top on route change */}
        <ScrollToTop />
        <AppContainer direction="column">
          <header className="mb-5" />
          <Flex className="flex-grow-1">
            <Switch>
              <Route to="/" exact component={HomeScreen} />
              <Route component={FourOhFourScreen} />
            </Switch>
          </Flex>
          <Footer />
        </AppContainer>
      </ThemeProvider.Provider>
    </BrowserRouter>
  )
}

export default hot(module)(App) // eslint-disable-line
