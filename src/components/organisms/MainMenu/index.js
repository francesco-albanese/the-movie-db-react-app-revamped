import { get, isEmpty } from 'lodash-es'
import React from 'react'
import { TmdbAvatar } from '#atoms'
import { MenuList } from '@material-ui/core'

import { TmdbMenuItem } from '#molecules'

import logoDesktop from '#assets/logo-desktop.svg'

export const MainMenu = ({ sections, ...otherProps }) => {

  const { activePage, allLocales } = otherProps
  const defaultLocale = allLocales.find(locale => locale.default)

  const renderMenuItems = () => {
    const mainMenuSections = Object.values(sections.MainMenu)

    return mainMenuSections.map(section => {
      const key = section.name[ defaultLocale.code ]
      return (
        <TmdbMenuItem 
          { ...otherProps } 
          key={ key } 
          section={ section } />
      )
    })
  }

  const HomeSection = get(sections, 'HomeLink.Home')
  const FavouriteSection = get(sections, 'FavouritesLink.Favourites')
  const isHomePage = activePage.reference.includes('home')
  const isFavouritePage = activePage.reference.includes('favourites')

  return !isEmpty(sections) 
    ? (
      <div className="tmdb-main-menu">
        <TmdbAvatar 
          alt="TMDB Logo Desktop" 
          src={ logoDesktop }
          className="tmdb-avatar-desktop" />

        <MenuList>
          {
            !isHomePage &&
            <TmdbMenuItem 
              { ...otherProps } 
              asLink 
              section={ HomeSection } />
          }

          { renderMenuItems() }

          {
            !isFavouritePage &&
            <TmdbMenuItem 
              { ...otherProps } 
              asLink 
              section={ FavouriteSection } />
          }
        </MenuList>
      </div>
    )
    : null
}