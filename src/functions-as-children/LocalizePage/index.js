import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { decorateClass } from '#utils'

import store, { 
  getActivePage, 
  getActiveLocale,
  NAMESPACE,
  setActiveLocale
} from '@themoviedb/the-movie-db-store'

class LocalizePage extends React.Component {

  static propTypes = {
    children: PropTypes.func.isRequired
  }

  dispatchActiveLocale = payload => {
    const { 
      activeLocale,
      activePage,
      history,
      location,
      setActiveLocale
    } = this.props

    const isMovieDetailsPage = activePage.paths[ activeLocale.code ].includes(':')
    const movieid = location.pathname.match(/\d/g)

    setActiveLocale(payload)

    const newActiveLocale = store.getState()[ NAMESPACE ].activeLocale

    if (isMovieDetailsPage) {
      const path = movieid && activePage.paths[ newActiveLocale.code ]
        .replace(/:\w+/g, movieid)
      movieid && history.replace(path)
    } else {
      history.replace(activePage.paths[ newActiveLocale.code ])
    }
  }

  render() {
    return this.props.children({
      setActiveLocale: payload => this.dispatchActiveLocale(payload)
    })
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
  activePage: getActivePage(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveLocale
}, dispatch)

export default decorateClass([
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
], LocalizePage)