import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash-es'

import { decorateClass } from '#utils'
import { RootPage } from '#FAC'
import { TmdbSpinner } from '#atoms'

import HomePage from '#pages/HomePage'

import { 
  fetchAllMovies, 
  fetchGenres,
  getActiveLocale, 
  getAllGenres,
  getAllMovies,
  getFilteredMovies,
  getIsFiltering,
  getMoviesFetchingInprogress,
  getMovieCategory,
  setMovieCategory
} from '@themoviedb/the-movie-db-store'

class HomePageContainer extends React.Component {

  componentDidUpdate(prevProps) {
    const { 
      activeLocale, 
      fetchAllMovies,
      fetchGenres,
      movieCategory 
    } = this.props

    const isSameLocale = activeLocale.code === prevProps.activeLocale.code

    if (
      !isSameLocale
      ||
      movieCategory !== prevProps.movieCategory
    ) {
      fetchAllMovies(movieCategory, activeLocale.code)
    }

    if (!isSameLocale) {
      fetchGenres(activeLocale.code)
    }
  }

  async componentDidMount() {
    const { 
      activeLocale,
      fetchGenres,
      genres,
      movieCategory, 
      setMovieCategory 
    } = this.props

    if (isEmpty(movieCategory)) {
      await setMovieCategory('popular')
    }

    if (isEmpty(genres)) {
      await fetchGenres(activeLocale.code)
    }
  }

  render() {
    const { isMoviesFetching } = this.props

    return (
      <RootPage>
        {
          ({ isMobile, sections }) => {
            return isMoviesFetching
              ? (
                <TmdbSpinner />
              )
              : <HomePage
                { ...this.props }
                isMobile={ isMobile }
                sections={ sections } />
          }
        }
      </RootPage>
    )
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
  allMovies: getAllMovies(state),
  filteredMovies: getFilteredMovies(state),
  genres: getAllGenres(state),
  isMoviesFetching: getMoviesFetchingInprogress(state),
  movieCategory: getMovieCategory(state),
  moviesFiltered: getIsFiltering(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllMovies,
  fetchGenres,
  setMovieCategory
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps)
], HomePageContainer)

