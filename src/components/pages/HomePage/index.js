import React from 'react'
import { get, isEmpty } from 'lodash-es'
import { Grid } from '@material-ui/core'

import { TmdbSpinner } from '#atoms'
import { TmdbMoviesGrid, TmdbGenreSelector } from '#organisms'
import SearchForm from '#containers/SearchForm'
import { NoMoviesAvailable } from './sections/NoMoviesAvailable'

export default class HomePage extends React.Component {

  render() {
    const { 
      allMovies, 
      isFiltering,
      isMobile,
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

    const FilterByGenreSelectorSection = 
      get(sections, 'FilterByGenreSelector.FilterByGenreText')

    const NoMoviesAvailableSections = { 
      NoMoviesInSelectedGenreSection,
      NoMoviesWithQuerySection
    }

    return (
      <React.Fragment>
        <Grid className="tmdb-home-page-forms-container" container>

          <Grid 
            item 
            xs={ 12 }
            sm={ 6 }>
            <SearchForm { ...this.props } />
          </Grid>

          <Grid 
            item 
            xs={ 12 }
            sm={ 6 }>
            <TmdbGenreSelector 
              { ...this.props }
              section={ FilterByGenreSelectorSection } />
          </Grid>

        </Grid>

        {
          renderNoMoviesAvailable &&
          <NoMoviesAvailable 
            { ...this.props }
            isMobile={ isMobile } 
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