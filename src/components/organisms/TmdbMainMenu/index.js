import { get, isEmpty } from 'lodash-es'
import React from 'react'
import { TmdbAvatar } from '#atoms'
import { MenuList } from '@material-ui/core'
import classcat from 'classcat'

import { TmdbMenuItem } from '#molecules'
import { TmdbLanguageSelector } from '#organisms'

import logoDesktop from '#assets/logo-desktop.svg'
import logoMobile from '#assets/logo-mobile.svg'

export default class TmdbMainMenu extends React.Component {

  renderHomeMenuItem = () => {

    const { sections } = this.props
    const HomeSection = get(sections, 'HomeLink.Home') 

    return (
      <TmdbMenuItem 
        { ...this.props } 
        asLink 
        section={ HomeSection } />
    )
  }

  renderLogo = () => {

    const { isMobile } = this.props

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

  renderMenuItems = () => {

    const { allLocales, sections } = this.props
    const mainMenuSection = get(sections, 'MainMenu', {})
    const defaultLocale = allLocales.find(locale => locale.default)

    const mainMenuSections = Object.values(mainMenuSection)

    return mainMenuSections.map(section => {
      
      const key = section.name[ defaultLocale.code ]

      return (
        <TmdbMenuItem 
          { ...this.props } 
          key={ key }
          section={ section } />
      )
    })
  }

  renderFavouritesMenuItem = () => {

    const { sections } = this.props
    const FavouriteSection = get(sections, 'FavouritesLink.Favourites')

    return (
      <TmdbMenuItem 
        { ...this.props } 
        asLink 
        section={ FavouriteSection } />
    )
  }

  renderLanguageSelector = () => {
    const { sections } = this.props
    const LanguageSelectorSection = get(sections, 'LanguageSelector.LanguageSelectorText')

    return (
      <TmdbLanguageSelector 
        { ...this.props } 
        section={ LanguageSelectorSection } />
    )
  }

  render() {

    const { 
      props, 
      renderFavouritesMenuItem,
      renderHomeMenuItem,
      renderLanguageSelector,
      renderLogo,
      renderMenuItems 
    } = this

    const { activePage, sections } = props

    const isHomePage = activePage && 
    activePage.reference && 
    activePage.reference.includes('home')
    
    const isFavouritePage = activePage && 
      activePage.reference &&
      activePage.reference.includes('favourites')

    return !isEmpty(sections) && !isEmpty(activePage)
      ? (
        <div className="tmdb-main-menu">

          <MenuList>
            {
              !isHomePage &&
              renderHomeMenuItem()
            }

            { 
              !isFavouritePage &&
              renderMenuItems() 
            }

            {
              !isFavouritePage &&
              renderFavouritesMenuItem()
            }
          </MenuList>

          { renderLanguageSelector() }

          { renderLogo() }
        </div>
      )
      : null
  }
}