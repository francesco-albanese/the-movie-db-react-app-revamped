import React from 'react'
import { 
  get, 
  isEmpty, 
  isFunction 
} from 'lodash-es'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decorateClass } from '#utils'

import { RootForm } from '#hoc'
import { TmdbForm } from '#molecules'

import { fetchMoviesByQuery, getActiveLocale } from '@themoviedb/the-movie-db-store'

class SearchFormContainer extends React.Component {

  getFormFields = () => {
    const { activeLocale, sections } = this.props
    const label = 
      get(sections, 'SearchMovies.SearchMoviesText.lineOne')

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
        <TmdbForm  { ...this.props }>
          { fields }
        </TmdbForm>
      )
      : null
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMoviesByQuery
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps),
  RootForm
], SearchFormContainer)