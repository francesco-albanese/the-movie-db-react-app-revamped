import React from 'react'
import { 
  Button, 
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { get, isFunction } from 'lodash-es'

export class TmdbLanguageSelector extends React.Component {

  state = {
    open: false,
    language: this.props.activeLocale.code
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = event => {
    const { allLocales, setActiveLocale } = this.props

    this.setState({ [ event.target.name ]: event.target.value }, () => {
      if (isFunction(setActiveLocale)) {
        const locale = allLocales.find(locale => 
          locale.code.includes(event.target.value)
        )
        setActiveLocale(locale)
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
    const lineTwo = get(section, 'lineTwo')

    return (
      <InputLabel htmlFor="controlled-open-select">
        { lineTwo[ activeLocale.code ] }
      </InputLabel>
    )
  }

  renderSelect = () => {
    const { open, language } = this.state

    return (
      <Select
        open={ open }
        onClose={ this.handleClose }
        onOpen={ this.handleOpen }
        value={ language }
        onChange={ this.handleChange }
        inputProps={{
          name: 'language',
          id: 'controlled-open-select'
        }}>
        { this.renderMenuItems() }
      </Select>
    )
  }

  renderMenuItems = () => {
    const { allLocales } = this.props

    return allLocales.map(({ code }) => {
      
      const label = code.includes('en')
        ? `🇬🇧 ${ code.toUpperCase() }`
        : `🇮🇹 ${ code.toUpperCase() }`

      return (
        <MenuItem key={ code } value={ code }>
          { label }
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