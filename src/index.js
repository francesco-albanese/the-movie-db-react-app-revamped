import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { CssBaseline } from '@material-ui/core'
import registerServiceWorker from './registerServiceWorker'

import './main.scss'

const app = (
  <React.Fragment>
    <CssBaseline />
    <App />
  </React.Fragment>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
