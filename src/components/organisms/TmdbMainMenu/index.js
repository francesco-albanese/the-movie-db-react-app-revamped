import { get, isEmpty } from 'lodash-es'
import React from 'react'
import { TmdbAvatar } from '#atoms'
import { MenuList } from '@material-ui/core'
import classcat from 'classcat'

import { TmdbMenuItem } from '#molecules'
import { TmdbLanguageSelector } from '#organisms'

import logoDesktop from '#assets/logo-desktop.svg'
import logoMobile from '#assets/logo-mobile.svg'

export const TmdbMainMenu = ({ sections, ...otherProps }) => {

  const { 
    activePage, 
    allLocales, 
    isMobile 
  } = otherProps
  
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

  const renderLogo = () => {

    const logo = isMobile 
      ? logoMobile
      : logoDesktop

    const alt = isMobile 
      ? 'Mobile'
      : 'Desktop'

    const classes = classcat({
      'tmdb-avatar-desktop': !isMobile,
      'tmdb-avatar-mobile': isMobile
    })

    return (
      <TmdbAvatar 
        alt={ `TMDB Logo ${ alt }` } 
        src={ logo }
        className={ classes } />
    )
  }

  const HomeSection = get(sections, 'HomeLink.Home')
  const FavouriteSection = get(sections, 'FavouritesLink.Favourites')
  const LanguageSelectorSection = get(sections, 'LanguageSelector.LanguageSelectorText')

  const isHomePage = activePage && 
    activePage.reference && 
    activePage.reference.includes('home')
    
  const isFavouritePage = activePage && 
    activePage.reference &&
    activePage.reference.includes('favourites')

  return !isEmpty(sections) && !isEmpty(activePage)
    ? (
      <div className="tmdb-main-menu">
        
        { renderLogo() }

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

        <TmdbLanguageSelector 
          section={ LanguageSelectorSection } 
          { ...otherProps } />
      </div>
    )
    : null
}