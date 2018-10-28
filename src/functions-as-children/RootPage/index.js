import React from 'react'
import withWidth from '@material-ui/core/withWidth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'lodash-es'
import PropTypes from 'prop-types'

import { decorateClass, getIsMobile } from '#utils'

import {
  getAllPages,
  getActiveLocale,
  getActivePage,
  setActivePage
} from '@themoviedb/the-movie-db-store'

class RootPage extends React.Component {

  static propTypes = {
    children: PropTypes.func.isRequired
  }

  state = {
    location: {}
  }

  get404page = () => {
    const { allPages } = this.props

    const page404 = allPages.find(page => page.reference.includes('four-oh-four-page'))

    return page404
  }

  componentDidMount() {

    const { 
      activeLocale,
      allPages,
      history, 
      location, 
      match,
      setActivePage 
    } = this.props

    if (location.pathname === '/') {
      /**
       * this is to prevent 404 page
       * from being set by default
       * if url is visited without
       * valid locale (en|it)
       */
      history.push(activeLocale.path)
    }

    const pagePath = isEmpty(match.params) 
      ? location.pathname
      : match.path

    const page = allPages.find(page => page.paths[ activeLocale.code ] === pagePath)

    if (page) {
      setActivePage(page)
    } else {
      setActivePage(this.get404page())
    }
  }


  render() {
    const { 
      activePage, 
      children, 
      width 
    } = this.props
    
    const isMobile = getIsMobile(width)
    const sections = isEmpty(activePage) 
      ? {}
      : activePage.sections

    return children({
      isMobile,
      sections,
      ...this.props
    })
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
  activePage: getActivePage(state),
  allPages: getAllPages(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setActivePage
}, dispatch)

export default decorateClass([
  withWidth({ withTheme: true }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
], RootPage)