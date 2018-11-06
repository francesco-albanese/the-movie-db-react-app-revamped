import React from 'react'
import classcat from 'classcat'

export default ({  children, className }) => {

  const classes = classcat([ 'tmdb-form', className ])

  return (
    <form 
      className={ classes }
      noValidate 
      autoComplete="off">
      
      { children }

    </form>
  )
}