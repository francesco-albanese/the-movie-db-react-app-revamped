import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { decorateClass } from '#utils'
import { RootPage } from '#FAC'

class HomePageContainer extends React.Component {
  render() {
    return (
      <RootPage>
        {
          ({ isMobile, sections }) => {
            return 'this is from home page but within RootPage'
          }
        }
      </RootPage>
    )
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default decorateClass([
  connect(mapStateToProps, mapDispatchToProps)
], HomePageContainer)

