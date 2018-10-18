import React, { Component } from 'react'
import withWidth from '@material-ui/core/withWidth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decorateClass, getIsMobile } from '#utils'

import { 
  fetchAllLocales, 
  fetchAllTemplates,
  getAllLocales,
  getAllTemplates
} from '@themoviedb/the-movie-db-store'

class App extends Component {

  async componentDidMount() {
    const { fetchAllLocales, fetchAllTemplates } = this.props
    
    await Promise.all([
      fetchAllLocales(),
      fetchAllTemplates()
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
  fetchAllTemplates
}, dispatch)

export default decorateClass([
  withWidth({ withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
], App)
