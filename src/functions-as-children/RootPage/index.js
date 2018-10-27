import React from 'react'
import withWidth from '@material-ui/core/withWidth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { decorateClass, getIsMobile } from '#utils'

import {
  getAllPages,
  getActiveLocale,
  setActivePage
} from '@themoviedb/the-movie-db-store'

class RootPage extends React.Component {

  state = {
    
  }

  static propTypes = {
    children: PropTypes.func.isRequired
  }

  render() {
    const { children, width } = this.props
    const isMobile = getIsMobile(width)

    return children({
      isMobile
    })
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
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