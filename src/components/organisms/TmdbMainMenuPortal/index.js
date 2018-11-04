import React from 'react'
import { isEmpty } from 'lodash-es'

import { TmdbDrawer } from '#atoms'
import { TmdbMainMenu } from '#organisms'


export default class TmdbMainMenuPortal extends React.Component {
  render() {
    const { 
      closeMainMenuPortal,
      isMobile,
      isOpen, 
      sections 
    } = this.props

    return !isEmpty(sections)
      ? (
        <TmdbDrawer isOpen={ isOpen } onClose={ closeMainMenuPortal }>
          <TmdbMainMenu { ...this.props } isMobile={ isMobile } />
        </TmdbDrawer>
      )
      : null
  }
}