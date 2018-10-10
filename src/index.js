import React from 'react'
import { render } from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

import { theme } from '#styles/theme'
import { store } from '#store'

import App from '#/App'

import registerServiceWorker from '#/registerServiceWorker'

import '#styles/main.scss'

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
