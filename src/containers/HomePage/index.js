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
  getAllMovies,
  getAllPages,
  getIsFiltering,
  getIsSearching,
  getSearchingInProgress,
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
      if (!isEmpty(movieCategory)) {
        fetchAllMovies(movieCategory, activeLocale.code)
      }
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

    if (isEmpty(genres)) {
      await fetchGenres(activeLocale.code)
    }

    if (isEmpty(movieCategory)) {
      await setMovieCategory('popular')
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
  allPages: getAllPages(state),
  allMovies: getAllMovies(state),
  isFiltering: getIsFiltering(state),
  isMoviesFetching: getMoviesFetchingInprogress(state),
  isSearching: getIsSearching(state),
  searchingInProgress: getSearchingInProgress(state),
  movieCategory: getMovieCategory(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllMovies,
  fetchGenres,
  setMovieCategory
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps)
], HomePageContainer)

