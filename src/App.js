import React, { Component } from 'react'
import withWidth from '@material-ui/core/withWidth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decorateClass, getIsMobile } from '#utils'

import { 
  fetchAllLocales, 
  fetchAllPages,
  fetchAllTemplates,
  getAllLocales,
  getAllTemplates
} from '@themoviedb/the-movie-db-store'

class App extends Component {

  async componentDidMount() {
    const { 
      fetchAllLocales, 
      fetchAllPages,
      fetchAllTemplates 
    } = this.props

    await fetchAllLocales()
    
    await Promise.all([
      fetchAllTemplates(),
      fetchAllPages()
    ])
  }

  render() {
    const { width } = this.props
    const isMobile = getIsMobile(width)

    return (
      <div>
        Test { isMobile ? 'true' : 'false' }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allLocales: getAllLocales(state),
  templates: getAllTemplates(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllLocales,
  fetchAllPages,
  fetchAllTemplates
}, dispatch)

export default decorateClass([
  withWidth({ withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
], App)
