import React from 'react'
import classcat from 'classcat'
import { TextField } from '@material-ui/core'

export default ({ 
  className,
  error,
  InputProps,
  label,
  name,
  onChange,
  placeholder,
  type
}) => {

  const classes = classcat([ 'tmdb-text-field', className ])

  return (
    <TextField
      className={ classes }
      error={ error }
      InputProps={ InputProps }
      label={ label }
      name={ name }
      onChange={ onChange }
      placeholder={ placeholder }
      type={ type } />
  )
}