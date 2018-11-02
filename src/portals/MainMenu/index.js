import React from 'react'
import { bindActionCreators } from 'redux'
import withWidth from '@material-ui/core/withWidth'
import { connect } from 'react-redux'

import { decorateClass, getIsMobile } from '#utils'

import { 
  closePortal, 
  getActiveLocale,
  getActivePage,
  getActivePortal,
  getAllLocales
} from '@themoviedb/the-movie-db-store'

import { portalNames } from '#portals/TmdbPortal/portals.config'
import { MainMenuPortal } from '#organisms'
import { LocalizePage } from '#FAC'

class MainMenuPortalContainer extends React.Component {

  render() {
    const { currentPortal, width } = this.props

    const isMobile = getIsMobile(width)

    return (

      <LocalizePage>
        { 
          ({ setActiveLocale }) => {
            return (
              <MainMenuPortal 
                { ...this.props }
                isMobile={ isMobile }
                isOpen={ currentPortal.active }
                sections={ currentPortal.sections }
                setActiveLocale={ setActiveLocale } />
            )
          } 
        }
      </LocalizePage>
    )
  }
}

const mapStateToProps = state => ({
  activePage: getActivePage(state),
  activeLocale: getActiveLocale(state),
  allLocales: getAllLocales(state),
  currentPortal: getActivePortal(state)(portalNames.mainMenu)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  closeMainMenuPortal: () => closePortal(portalNames.mainMenu)
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps),
  withWidth({ withTheme: true })
], MainMenuPortalContainer)