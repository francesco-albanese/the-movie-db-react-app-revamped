import React from 'react'
import { isEmpty, isEqual } from 'lodash-es'
import { Portal } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decorateClass } from '#utils'

import {
  fetchAllportals,
  getActiveLocale,
  getAllPortals
} from '@themoviedb/the-movie-db-store'

import { portalsConfig } from './portals.config'

class TmdbPortal extends React.Component {

  constructor() {
    super()
    this.portalNode = document.createElement('div')
    this.portalNode.classList.add('tmdb-portal')
  }

  state = {
    activePortal: {},
    portal: null
  }

  async componentDidMount() {
    const { allPortals, fetchAllportals } = this.props

    if (isEmpty(allPortals)) {
      await fetchAllportals()
    }

    document.body.append(this.portalNode)
  }

  componentWillUnmount() {
    document.body.contains(this.portalNode) && 
    document.body.removeChild(this.portalNode)
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    const { allPortals } = nextProps

    const activePortal = allPortals.find(portal => portal && portal.active)

    if (isEqual(activePortal, prevState.activePortal)) {
      return null
    }

    const portal = isEmpty(activePortal)
      ? {}
      : portalsConfig
        .find(({ name }) => activePortal.name === name)
        .component

    return {
      activePortal,
      portal
    }
  }
  

  render() {
    const { portal } = this.state

    return !isEmpty(portal)
      ? (
        <Portal container={ this.portalNode }>
          { React.createElement(portal) }
        </Portal>
      )
      : null
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
  allPortals: getAllPortals(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllportals
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps)
], TmdbPortal)