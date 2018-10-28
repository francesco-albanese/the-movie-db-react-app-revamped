import React from 'react'
import { isEmpty } from 'lodash-es'
import classcat from 'classcat'
import Avatar from '@material-ui/core/Avatar'

export const TmdbAvatar = (({ className, src, alt }) => {
  const classes = classcat([ 'tmdb-avatar', className ])

  return !isEmpty(src) 
    ? (
      <Avatar 
        alt={ alt } 
        src={ src }
        className={ classes } />
    )
    : null
})