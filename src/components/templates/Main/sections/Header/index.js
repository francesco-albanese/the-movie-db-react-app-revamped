import React from 'react'
import { 
  AppBar, 
  IconButton,
  InputBase,
  Toolbar
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

export default class Header extends React.Component {

  renderIconButton = () => {
    const { openMainMenuPortal } = this.props

    return (
      <IconButton 
        onClick={ openMainMenuPortal } 
        color="inherit" 
        aria-label="Open drawer">
        <MenuIcon />
      </IconButton>
    )
  }

  renderInput = () => {
    return (
      <div className="tmdb-input-search-container">
        <SearchIcon />
        <InputBase placeholder="To be coming from contentful" />
      </div>
    )
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          { this.renderIconButton() }
          { this.renderInput() }
        </Toolbar>
      </AppBar>
    )
  }
}