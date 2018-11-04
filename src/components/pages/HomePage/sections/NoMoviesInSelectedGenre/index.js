import React from 'react'
import { Typography } from '@material-ui/core'
import { LocalMovies } from '@material-ui/icons' 
import { get, isEmpty } from 'lodash-es'
 

export const NoMoviesInSelectedGenre = ({ activeLocale, section }) => {

  const lineOne = get(section, 'lineOne')

  return !isEmpty(section) 
    ? (
      <Typography variant="h2">
        <LocalMovies />  
        { lineOne[ activeLocale.code ] }
      </Typography>
    )
    : null
}