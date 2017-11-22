import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'componentry'

// App Components
import ScrollToTop from 'components/universal/ScrollToTop'
// Screens
import HomeScreen from '../HomeScreen'
import ToolchainScreen from '../ToolchainScreen'
import FourOhFourScreen from '../FourOhFourScreen'

// Componentry configuration defaults can be updated using the ThemeProvider
// component and passing a theme configuration object
const theme = {
  defaultButtonColor: 'primary',
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* Restores scroll position to page top on route change */}
        <ScrollToTop />
        <header className="mb-5" />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/getting-started" component={ToolchainScreen} />
            <Route component={FourOhFourScreen} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}
