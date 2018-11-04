import React from 'react'
import { get, isEmpty } from 'lodash-es'

import { TmdbMoviesGrid } from '#organisms'
import { NoMoviesInSelectedGenre } from './sections/NoMoviesInSelectedGenre'

export default class HomePage extends React.Component {

  state = {
    movies: [],
    moviesFiltered: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { 
      allMovies, 
      filteredMovies, 
      moviesFiltered 
    } = nextProps

    if (!moviesFiltered) {
      return {
        movies: allMovies,
        moviesFiltered
      }
    }

    if (moviesFiltered && !isEmpty(filteredMovies)) {
      return {
        movies: filteredMovies,
        moviesFiltered
      }
    }

    return {
      movies: []
    }
  }

  render() {
    const { movies } = this.state
    const { sections } = this.props

    const NoMoviesInSelectedGenreSection = 
      get(sections, 'NoMoviesInGenre.NoMoviesInGenreText')


    return !isEmpty(movies)
      ? (
        <TmdbMoviesGrid { ...this.props } movies={ movies } />
      )
      : <NoMoviesInSelectedGenre 
        { ...this.props } 
        section={ NoMoviesInSelectedGenreSection } />
  }
}