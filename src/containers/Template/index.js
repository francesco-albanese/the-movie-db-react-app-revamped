import React from 'react'
import { bindActionCreators } from 'redux'
import withWidth from '@material-ui/core/withWidth'
import { connect } from 'react-redux'
import { isEmpty, isEqual } from 'lodash-es'

import { getActivePage } from '@themoviedb/the-movie-db-store'

import { decorateClass, getIsMobile } from '#utils'

import Main from '#templates/Main'

class TemplateContainer extends React.Component {

  state = {
    isDynamicPage: true,
    activePage: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activePage } = nextProps

    if (!isEqual(activePage, prevState.activePage)) {
      const isDynamicPage = isEmpty(activePage) 
        ? false 
        : activePage.reference.includes('four-oh-four')
        || activePage.reference.includes('movie-details')

      return {
        activePage,
        isDynamicPage
      }
    }

    return null
  }
  

  render() {

    const { width } = this.props
    const isMobile = getIsMobile(width)
    const { isDynamicPage } = this.state

    return (
      <Main { ...this.props } 
        isDynamicPage={ isDynamicPage }
        isMobile={ isMobile } />
    )
  }
}

const mapStateToProps = state => ({
  activePage: getActivePage(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default decorateClass([
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps)
], TemplateContainer)