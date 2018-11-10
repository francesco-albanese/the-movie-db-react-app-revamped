import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash-es'

import { decorateClass } from '#utils'
import { RootPage } from '#FAC'

import { 
  fetchMovieById,
  getActiveLocale,
  getMovieDetails,
  getMoviesFetchingInprogress
} from '@themoviedb/the-movie-db-store'

import MovieDetailsPage from '#pages/MovieDetailsPage'

class MovieDetailsPageContainer extends React.Component {

  async componentDidMount() {
    const { 
      activeLocale,
      fetchMovieById,
      match
    } = this.props

    const { movieid } = match.params

    if (!isEmpty(movieid)) {
      await fetchMovieById(movieid, activeLocale.code)
    }
  }

  render() {    
    return (
      <RootPage>
        {
          ({ isMobile, sections }) => {
            return (
              <MovieDetailsPage
                { ...this.props }
                isMobile={ isMobile }
                sections={ sections } />
            )
          }
        }
      </RootPage>
    )
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state),
  isMoviesFetching: getMoviesFetchingInprogress(state),
  movieDetails: getMovieDetails(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMovieById
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps)
], MovieDetailsPageContainer)