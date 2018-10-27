import React from 'react'

import { RootPage } from '#FAC'

export default class FourOhFourPageContainer extends React.Component {
  render() {
    return (
      <RootPage>
        {
          ({ isMobile }) => {
            return 'this is from 404 page but within RootPage'
          }
        }
      </RootPage>
    )
  }
}