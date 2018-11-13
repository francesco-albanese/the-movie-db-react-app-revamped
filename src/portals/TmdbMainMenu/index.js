import React from 'react'
import { bindActionCreators } from 'redux'
import withWidth from '@material-ui/core/withWidth'
import { connect } from 'react-redux'

import { decorateClass, getIsMobile } from '#utils'

import { 
  closePortal, 
  filterMoviesById,
  getActiveLocale,
  getActivePage,
  getActivePortal,
  getAllGenres,
  getAllLocales,
  getMovieCategory,
  setMovieCategory
} from '@themoviedb/the-movie-db-store'

import { portalNames } from '#portals/TmdbPortal/portals.config'
import { TmdbMainMenuPortal } from '#organisms'
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
              <TmdbMainMenuPortal 
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
  currentPortal: getActivePortal(state)(portalNames.mainMenu),
  genres: getAllGenres(state),
  movieCategory: getMovieCategory(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  closeMainMenuPortal: () => closePortal(portalNames.mainMenu),
  filterMoviesById,
  setMovieCategory
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps),
  withWidth({ withTheme: true })
], MainMenuPortalContainer)