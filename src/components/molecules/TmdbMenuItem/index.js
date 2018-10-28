import React from 'react'
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
  section 
}) => {

  const { 
    icon, 
    label, 
    path 
  } = section
  
  const defaultLocale = allLocales.find(locale => locale.default)
  const Icon = Icons[ icon[ defaultLocale.code ] ]

  return asLink 
    ? (
      <NavLink exact to={ path[ activeLocale.code ] }>
        <MenuItem>
          <ListItemIcon>
            <Icon></Icon>
          </ListItemIcon>

          <ListItemText inset primary={ label[ activeLocale.code ] } />
        </MenuItem>
      </NavLink>
    )
    : (
      <MenuItem>
        <ListItemIcon>
          <Icon></Icon>
        </ListItemIcon>

        <ListItemText inset primary={ label[ activeLocale.code ] } />
      </MenuItem>
    )
}