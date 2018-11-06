import React from 'react'
import { get, isEmpty } from 'lodash-es'

import { TmdbSpinner } from '#atoms'
import { TmdbMoviesGrid } from '#organisms'
import SearchForm from '#containers/SearchForm'
import { NoMoviesAvailable } from './sections/NoMoviesAvailable'

export default class HomePage extends React.Component {

  render() {
    const { 
      allMovies, 
      isFiltering,
      searchingInProgress,
      sections 
    } = this.props

    const renderNoMoviesAvailable = 
      (isFiltering && isEmpty(allMovies)) || 
      isEmpty(allMovies)

    const NoMoviesInSelectedGenreSection = 
      get(sections, 'NoMoviesInGenre.NoMoviesInGenreText')

    const NoMoviesWithQuerySection = 
    get(sections, 'NoMoviesWithQuery.NoMoviesWithQueryText')

    const NoMoviesAvailableSections = { 
      NoMoviesInSelectedGenreSection,
      NoMoviesWithQuerySection
    }

    return (
      <React.Fragment>

        <SearchForm { ...this.props } />

        {
          renderNoMoviesAvailable &&
          <NoMoviesAvailable 
            { ...this.props } 
            sections={ NoMoviesAvailableSections } />
        }

        { 
          searchingInProgress 
            ? <TmdbSpinner />
            : <TmdbMoviesGrid { ...this.props } />
        }

      </React.Fragment>
    )
  }
}