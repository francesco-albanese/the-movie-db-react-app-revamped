import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decorateClass } from '#utils'
import { TmdbRouter, Routes } from '@themoviedb/the-movie-db-react-routing'

import { routesConfig } from '#router/routes.config'

import { TmdbSpinner } from '#atoms'

import { 
  fetchAllLocales, 
  fetchAllPages,
  fetchAllTemplates,
  getAllLocales,
  getAllPages,
  getActiveLocale,
  getAllTemplates,
  getPagesFetchingInprogress,
  getTemplatesFetchingInprogress
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
    const { 
      activeLocale,
      allPages,
      isPagesFetching,
      isTemplatesFetching
    } = this.props

    return isTemplatesFetching || isPagesFetching 
      ? (
        <TmdbSpinner size={ 70 } />
      ) 
      : (
        <TmdbRouter>
          <Routes
            activeLocale={ activeLocale }
            pages={ allPages }
            routesConfig={ routesConfig } />
        </TmdbRouter>
      )
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
  allLocales: getAllLocales(state),
  allPages: getAllPages(state),
  isPagesFetching: getPagesFetchingInprogress(state),
  isTemplatesFetching: getTemplatesFetchingInprogress(state),
  templates: getAllTemplates(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllLocales,
  fetchAllPages,
  fetchAllTemplates
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps)
], App)
