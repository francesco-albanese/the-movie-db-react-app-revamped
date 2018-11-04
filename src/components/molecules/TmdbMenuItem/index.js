import React from 'react'
import { camelCase, isFunction } from 'lodash-es'
import { NavLink } from 'react-router-dom'
import { 
  ListItemIcon, 
  ListItemText, 
  MenuItem
} from '@material-ui/core'
import * as Icons from '@material-ui/icons'

export const TmdbMenuItem = ({ 
  activeLocale, 
  allLocales, 
  asLink,
  closeMainMenuPortal,
  onClick, 
  section,
  setMovieCategory 
}) => {

  const { 
    name,
    icon, 
    label, 
    path 
  } = section
  
  const defaultLocale = allLocales.find(locale => locale.default)
  const Icon = Icons[ icon[ defaultLocale.code ] ]

  const closePortal = () => {
    isFunction(closeMainMenuPortal) && closeMainMenuPortal()
  }

  const handleClick = () => {
    isFunction(onClick) && onClick()
    isFunction(closeMainMenuPortal) && closeMainMenuPortal()
    isFunction(setMovieCategory) && setMovieCategory(camelCase(name[ 'en' ]))
  }

  return asLink 
    ? (
      <NavLink 
        exact 
        to={ path[ activeLocale.code ] }
        onClick={ closePortal }>
        <MenuItem>
          <ListItemIcon>
            <Icon></Icon>
          </ListItemIcon>

          <ListItemText inset primary={ label[ activeLocale.code ] } />
        </MenuItem>
      </NavLink>
    )
    : (
      <MenuItem onClick={ handleClick }>
        <ListItemIcon>
          <Icon></Icon>
        </ListItemIcon>

        <ListItemText inset primary={ label[ activeLocale.code ] } />
      </MenuItem>
    )
}