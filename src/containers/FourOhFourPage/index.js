import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash-es'

import { decorateClass } from '#utils'
import { RootPage } from '#FAC'
import { TmdbSpinner } from '#atoms'

import FourOhFourPage from '#pages/FourOhFourPage'

import { getActiveLocale } from '@themoviedb/the-movie-db-store'

class FourOhFourPageContainer extends React.Component {

  render() {
    return (
      <RootPage>
        {
          ({ isMobile, sections }) => {
            return isEmpty(sections)
              ? <TmdbSpinner />
              : <FourOhFourPage 
                { ...this.props } 
                isMobile={ isMobile }
                sections={ sections } />
          }
        }
      </RootPage>
    )
  }
}

const mapStateToProps = state => ({
  activeLocale: getActiveLocale(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps)
], FourOhFourPageContainer)