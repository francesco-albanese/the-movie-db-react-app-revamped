import React, { Component } from 'react'
import withWidth from '@material-ui/core/withWidth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash-es'

import { decorateClass, getIsMobile } from '#utils'

import { fetchAllLocales, getAllLocales } from '@themoviedb/the-movie-db-store'

class App extends Component {

  componentDidMount() {
    const { allLocales, fetchAllLocales } = this.props

    if (isEmpty(allLocales)) {
      fetchAllLocales()
    }

  }

  render() {
    const { width } = this.props
    const isMobile = getIsMobile(width)

    return (
      <div>
        Test { isMobile }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allLocales: getAllLocales(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllLocales
}, dispatch)

export default decorateClass([
  withWidth({ withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
], App)
