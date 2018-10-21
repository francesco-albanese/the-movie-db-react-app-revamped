import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export const TmdbSpinner = ({ className, size }) => {
  return (
    <div className={ className }>
      <CircularProgress size={ size } />
    </div>
  )
}