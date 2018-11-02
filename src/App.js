import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get } from 'lodash-es'


import { decorateClass } from '#utils'
import { TmdbRouter, Routes } from '@themoviedb/the-movie-db-react-routing'

import { routesConfig } from '#router/routes.config'

import { TmdbSpinner } from '#atoms'
import Template from '#containers/Template'

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

class App extends React.Component {

  static propTypes = {
    isTemplatesFetching: PropTypes.bool,
    isPagesFetching: PropTypes.bool,
    activeLocale: PropTypes.shape({
      code: PropTypes.string,
      default: PropTypes.bool,
      name: PropTypes.string,
      path: PropTypes.string
    }),
    allPages: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      paths: PropTypes.object,
      reference: PropTypes.string,
      sections: PropTypes.object
    })),
    templates: PropTypes.arrayOf(PropTypes.shape({
      sections: PropTypes.object
    })),
    fetchAllLocales: PropTypes.func,
    fetchAllTemplates: PropTypes.func,
    fetchAllPages: PropTypes.func
  }

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
      isTemplatesFetching,
      templates
    } = this.props

    const templateSections = get(templates, '[0].sections')

    return isTemplatesFetching || isPagesFetching 
      ? (
        <TmdbSpinner />
      ) 
      : (
        <TmdbRouter>
          <Template sections={ templateSections }>
            <Routes
              activeLocale={ activeLocale }
              pages={ allPages }
              routesConfig={ routesConfig } />
          </Template>
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