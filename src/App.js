import React, { Component } from 'react'
import withWidth from '@material-ui/core/withWidth'
import { connect } from 'react-redux'

import { decorateClass, getIsMobile } from '#utils'

class App extends Component {
  render() {
    const { width } = this.props
    const isMobile = getIsMobile(width)
    console.log(process.env)

    return (
      <div>
        Test { isMobile }
      </div>
    )
  }
}

export default decorateClass([
  withWidth({ withTheme: true }),
  connect()
], App)
