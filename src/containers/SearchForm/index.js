import React from 'react'
import { get, isEmpty } from 'lodash-es'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decorateClass } from '#utils'

import { RootForm } from '#hoc'
import { TmdbForm } from '#atoms'

import { 
  fetchMoviesByQuery, 
  getActiveLocale,
  getAllPages
} from '@themoviedb/the-movie-db-store'

class SearchFormContainer extends React.Component {

  getFormFields = () => {
    const { activeLocale, allPages } = this.props

    const HomePage = allPages.find(({ reference }) => reference.includes('home'))
    const sections = get(HomePage, 'sections')
    
    const label = 
      get(sections, 'SearchMovies.SearchMoviesText.lineOne', '')

    return [
      {
        name: 'search',
        label: label[ activeLocale.code ],
        type: 'search',
        onChange: this.onChange
      }
    ]
  }

  onChange = ({ target: { value }}) => {
    const { activeLocale, fetchMoviesByQuery } = this.props
    
    fetchMoviesByQuery(activeLocale.code, value)
  }

  componentDidMount() {
    const { renderReduxFields } = this.props

    renderReduxFields && renderReduxFields(this.getFormFields())
  }

  render() {
    const { fields } = this.props

    return !isEmpty(fields)
      ? (
        <TmdbForm className="tmdb-serch-form-container"  { ...this.props }>
          { fields }
        </TmdbForm>
      )
      : null
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
  allPages: getAllPages(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMoviesByQuery
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps),
  RootForm
], SearchFormContainer)