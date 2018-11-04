import React from 'react'
import { 
  Button, 
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { 
  get, 
  isNumber,
  isFunction 
} from 'lodash-es'

export default class TmdbGenreSelector extends React.Component {

  state = {
    open: false,
    genre: ''
  }
  
  componentDidUpdate(prevProps) {
    const { clearSelectedFilter } = this.props

    if (
      clearSelectedFilter !== prevProps.clearSelectedFilter
      &&
      clearSelectedFilter
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

  renderButton = () => {
    const { activeLocale, section } = this.props

    const lineOne = get(section, 'lineOne')

    return (
      <Button onClick={ this.handleOpen }>
        { lineOne[ activeLocale.code ] }
      </Button>
    )
  }

  renderInputLabel = () => {
    const { activeLocale, section } = this.props
    const { genre } = this.state

    const lineOne = get(section, 'lineOne')
    const lineTwo = get(section, 'lineTwo')

    const label = !isNumber(genre)
      ? lineOne[ activeLocale.code ]
      : lineTwo[ activeLocale.code ]

    return (
      <InputLabel htmlFor="controlled-open-select">
        { label }
      </InputLabel>
    )
  }

  renderSelect = () => {
    const { open, genre } = this.state

    return (
      <Select
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
        <MenuItem key={ id } value={ id }>
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
      <form autoComplete="off">
        <FormControl>
          { this.renderButton() }
          { this.renderFormControl() }
        </FormControl>
      </form>
    )
  }
}