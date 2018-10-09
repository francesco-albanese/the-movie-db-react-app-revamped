import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'

import { theme } from '#/styles/theme'

import App from '#/App'

import registerServiceWorker from '#/registerServiceWorker'

import '#/styles/main.scss'

const app = (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={ theme }>
      <App />
    </MuiThemeProvider>
  </React.Fragment>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
