import React from 'react'
import { Typography } from '@material-ui/core'
import { LocalMovies } from '@material-ui/icons' 
import { get, isEmpty } from 'lodash-es'
 

export const NoMoviesAvailable = ({ 
  activeLocale, 
  isFiltering,
  sections 
}) => {

  const noGenresLineOne = get(sections, 'NoMoviesInSelectedGenreSection.lineOne')
  const noSearchResultsLineOne = get(sections, 'NoMoviesWithQuerySection.lineOne')
  const text = isFiltering
    ? noGenresLineOne[ activeLocale.code ]
    : noSearchResultsLineOne[ activeLocale.code ]

  return !isEmpty(sections) 
    ? (
      <Typography variant="h2">
        <LocalMovies />  
        { text }
      </Typography>
    )
    : null
}