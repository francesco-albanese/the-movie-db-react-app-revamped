import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { decorateClass, getLocaleFromURL } from '#utils'

import { 
  getActivePage, 
  getActiveLocale,
  getAllLocales,
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

    if (isMovieDetailsPage) {
      const path = movieid && activePage.paths[ payload.code ]
        .replace(/:\w+/g, movieid)
      movieid && history.push(path)
    } else {
      history.push(activePage.paths[ payload.code ])
    }
  }

  listenHistory = ({ pathname }, action) => {
    const { activeLocale, allLocales } = this.props

    if (action === 'POP') {
      const localeFromURL = getLocaleFromURL({
        allLocales,
        activeLocale,
        pathname
      })

      if (localeFromURL) {
        return this.dispatchActiveLocale(localeFromURL)
      }
    }
  }

  componentDidMount() {
    const { history } = this.props

    this.unlisten = history.listen(this.listenHistory)
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return this.props.children({
      setActiveLocale: payload => this.dispatchActiveLocale(payload)
    })
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
  activePage: getActivePage(state),
  allLocales: getAllLocales(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveLocale
}, dispatch)

export default decorateClass([
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
], LocalizePage)