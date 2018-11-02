import React from 'react'
import classcat from 'classcat'
import CircularProgress from '@material-ui/core/CircularProgress'

export const TmdbSpinner = ({ className, size = 70 }) => {

  const classes = classcat([ 'tmdb-app-spinner', className ])

  return (
    <div className={ classes }>
      <CircularProgress size={ size } />
    </div>
  )
}