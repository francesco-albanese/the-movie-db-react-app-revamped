import React from 'react'
import classcat from 'classcat'
import { 
  AppBar, 
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'
import { ArrowBack, Menu } from '@material-ui/icons'
import { get, startCase } from 'lodash-es' 

export default class TmdbAppBar extends React.Component {

  goBack = () => {
    const { activeLocale, history } = this.props

    history.push(activeLocale.path)
  }

  renderArrowBack = () => {
    return (
      <ArrowBack
        fontSize="large"
        onClick={ this.goBack } />
    )
  }

  renderIconButton = () => {
    const { openMainMenuPortal } = this.props

    return (
      <IconButton 
        onClick={ openMainMenuPortal } 
        color="inherit" 
        aria-label="Open drawer">
        <Menu />
      </IconButton>
    )
  }

  renderHeaderText = () => {
    const { 
      activeLocale,
      content,
      isDynamicPage, 
      isMobile, 
      movieCategory,
      sections 
    } = this.props

    const MainMenu = get(sections, 'MainMenu')
    const category = startCase(movieCategory).replace(/\s+/g, '')
    const label = get(MainMenu, `${ category }.label`, '')

    const typographyContent = isDynamicPage 
      ? content[ activeLocale.code ]
      : label[ activeLocale.code ]

    return isMobile 
      ? (
        <Typography 
          align="center"
          className="tmdb-appbar-text" 
          variant="h6" 
          color="inherit"
          noWrap>
          { typographyContent }
        </Typography>
      )
      : null
  }

  render() {
    const { className, withBurgerMenu } = this.props

    const classes = classcat([ 'tmdb-appbar', className ])

    return (
      <AppBar 
        className={ classes } 
        color="default" 
        position="static">
        <Toolbar>
          { withBurgerMenu && this.renderIconButton() }
          { !withBurgerMenu && this.renderArrowBack() }
          { this.renderHeaderText() }
        </Toolbar>
      </AppBar>
    )
  }
}