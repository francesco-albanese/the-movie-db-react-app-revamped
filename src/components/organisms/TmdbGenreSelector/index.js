import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { 
  get, 
  isEmpty,
  isNumber,
  isFunction 
} from 'lodash-es'

import { TmdbForm } from '#atoms'

export default class TmdbGenreSelector extends React.Component {

  state = {
    open: false,
    genre: ''
  }
  
  componentDidUpdate(prevProps) {
    const { movieCategory } = this.props

    if (
      movieCategory !== prevProps.movieCategory
      &&
      !isEmpty(movieCategory)
    ) {
      this.setState({ genre: '' })
    }
  }
  

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = event => {
    const { 
      closeMainMenuPortal, 
      filterMoviesById, 
      onSelectChange 
    } = this.props

    this.setState({ [ event.target.name ]: event.target.value }, () => {
      if (isFunction(filterMoviesById)) {
        filterMoviesById(event.target.value)
      }
      if (isFunction(onSelectChange)) {
        onSelectChange()
      }

      if (isFunction(closeMainMenuPortal)) {
        closeMainMenuPortal()
      }
    })
  }

  renderInputLabel = () => {
    const { activeLocale, section } = this.props
    const { genre } = this.state

    const lineOne = get(section, 'lineOne', '')
    const lineTwo = get(section, 'lineTwo', '')

    const label = !isNumber(genre)
      ? lineOne[ activeLocale.code ]
      : lineTwo[ activeLocale.code ]

    return (
      <InputLabel 
        className="tmdb-genre-selector-input-label"
        htmlFor="controlled-open-select">
        { label }
      </InputLabel>
    )
  }

  renderSelect = () => {
    const { open, genre } = this.state

    return (
      <Select
        className="tmdb-genre-selector-select"
        open={ open }
        onClose={ this.handleClose }
        onOpen={ this.handleOpen }
        value={ genre }
        onChange={ this.handleChange }
        inputProps={{
          name: 'genre',
          id: 'controlled-open-select'
        }}>
        { this.renderMenuItems() }
      </Select>
    )
  }

  renderMenuItems = () => {
    const { genres } = this.props

    return genres.map(({ id, name }) => {

      return (
        <MenuItem 
          className="tmdb-genre-selector-menu-item"
          key={ id } 
          value={ id }>
          { name }
        </MenuItem>
      )
    })
  }

  renderFormControl = () => {
    return (
      <FormControl>
        { this.renderInputLabel() }
        { this.renderSelect() }
      </FormControl>
    )
  }

  render() {

    return (
      <TmdbForm className="tmdb-genre-selector-container">
        <FormControl className="tmdb-genre-selector-form-control">
          { this.renderFormControl() }
        </FormControl>
      </TmdbForm>
    )
  }
}