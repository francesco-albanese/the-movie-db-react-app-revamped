import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { get, isFunction } from 'lodash-es'
import classcat from 'classcat'

export default class TmdbLanguageSelector extends React.Component {

  state = {
    activeLocale: {},
    language: this.props.activeLocale.code
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeLocale } = nextProps

    if (activeLocale.code !== prevState.activeLocale.code) {
      return {
        activeLocale,
        language: activeLocale.code
      }
    }

    return null
  }

  handleClick = code => {
    const { 
      allLocales, 
      closeMainMenuPortal, 
      setActiveLocale 
    } = this.props

    if (isFunction(setActiveLocale)) {
      const locale = allLocales.find(locale => 
        locale.code.includes(code)
      )
      setActiveLocale(locale)
    }

    if (isFunction(closeMainMenuPortal)) {
      closeMainMenuPortal()
    }
  }

  renderItems = () => {
    const { allLocales } = this.props
    const { language } = this.state

    return allLocales.map(({ code }) => {
      
      const label = code.includes('en')
        ? `🇬🇧`
        : `🇮🇹`

      const classes = classcat([ 
        'tmdb-language-button', 
        { 
          'tmdb-language-button-active': language === code
        } 
      ])

      return (
        <Grid 
          item
          key={ code }>
          <Button 
            className={ classes } 
            onClick={ () => this.handleClick(code) }
            size="small">
            { label }
          </Button>
        </Grid>
      )
    })
  }

  render() {

    return (
      <Grid 
        className="tmdb-language-selector-container"
        justify="center" 
        container>

        { this.renderItems() }

      </Grid>
    )
  }
}