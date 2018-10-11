import React from 'react'
import { render } from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import store from '@themoviedb/the-movie-db-store'

import registerServiceWorker from '#/registerServiceWorker'

import { theme } from '#styles/theme'
import '#styles/main.scss'

import App from '#/App'

const app = (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={ theme }>
      <Provider store={ store }>
        <App />
      </Provider>
    </MuiThemeProvider>
  </React.Fragment>
)

render(app, document.getElementById('root'))
registerServiceWorker()
