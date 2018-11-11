import React from 'react'
import { camelCase, isFunction } from 'lodash-es'
import { NavLink } from 'react-router-dom'
import { 
  ListItemIcon, 
  ListItemText, 
  MenuItem
} from '@material-ui/core'
import * as Icons from '@material-ui/icons'
import classcat from 'classcat'

export default class TmdbMenuItem extends React.Component {

  closePortal = () => {
    const { closeMainMenuPortal } = this.props

    isFunction(closeMainMenuPortal) && closeMainMenuPortal()
  }

  handleClick = name => {
    const { 
      closeMainMenuPortal,
      onClick,
      setMovieCategory
    } = this.props

    isFunction(onClick) && onClick()
    isFunction(closeMainMenuPortal) && closeMainMenuPortal()
    isFunction(setMovieCategory) && setMovieCategory(camelCase(name[ 'en' ]))
  }

  renderIcon = () => {
    const { allLocales, section } = this.props

    const { icon } = section
    const defaultLocale = allLocales.find(locale => locale.default)
    const Icon = Icons[ icon[ defaultLocale.code ] ]

    return {
      Icon
    }
  }
  
  renderLinkMenuItem = () => {

    const { 
      activeLocale, 
      asLink, 
      section 
    } = this.props

    const { Icon } = this.renderIcon()

    const { 
      label, 
      path 
    } = section

    const classes = classcat([ 
      'tmdb-menu-item', 
      { 'tmdb-menu-item-as-link': asLink }
    ])

    return (
      <NavLink
        className={ classes } 
        exact 
        to={ path[ activeLocale.code ] }
        onClick={ this.closePortal }>
        <MenuItem>
          <ListItemIcon>
            <Icon className="tmdb-menu-item-icon"></Icon>
          </ListItemIcon>

          <ListItemText
            className="tmdb-menu-item-label" 
            inset 
            primary={ label[ activeLocale.code ] } />
        </MenuItem>
      </NavLink>
    )
  }

  renderMenuItem = () => {
    const { 
      activeLocale, 
      movieCategory,
      section 
    } = this.props

    const { name, label } = section
    const { Icon } = this.renderIcon()

    const classes = classcat([ 
      'tmdb-menu-item',
      {
        'tmdb-menu-item-active': movieCategory === camelCase(name[ 'en' ])
      }
    ])

    return (
      <MenuItem className={ classes } onClick={ () => this.handleClick(name) }>
        <ListItemIcon>
          <Icon className="tmdb-menu-item-icon"></Icon>
        </ListItemIcon>

        <ListItemText
          className="tmdb-menu-item-label" 
          inset 
          primary={ label[ activeLocale.code ] } />
      </MenuItem>
    )
  }

  render() {
    const { asLink } = this.props
    return asLink 
      ? (
        this.renderLinkMenuItem()
      )
      : this.renderMenuItem()
  }
}