import React from 'react'
import { Typography } from '@material-ui/core'
import { LocalMovies } from '@material-ui/icons' 
import { get, isEmpty } from 'lodash-es'
 

export const NoMoviesAvailable = ({ 
  activeLocale, 
  isFiltering,
  isMobile,
  sections 
}) => {

  const noGenresLineOne = get(sections, 'NoMoviesInSelectedGenreSection.lineOne')
  const noSearchResultsLineOne = get(sections, 'NoMoviesWithQuerySection.lineOne')
  const text = isFiltering
    ? noGenresLineOne[ activeLocale.code ]
    : noSearchResultsLineOne[ activeLocale.code ]
  
  const variant = isMobile
    ? 'h3'
    : 'h2'

  return !isEmpty(sections) 
    ? (
      <div className="tmdb-no-movies-available">
        <Typography className="tmdb-no-movies-available-heading" variant={ variant }>
          <LocalMovies 
            className="tmdb-no-movies-available-icon" />   
          { text }
        </Typography>
      </div>
    )
    : null
}