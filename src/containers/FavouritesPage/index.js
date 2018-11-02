import React from 'react'
import { RootPage } from '#FAC'

export default class FavouritesPageContainer extends React.Component {
  render() {
    return (
      <RootPage>
        {
          ({ isMobile }) => {
            return 'this is from Favourites page but within RootPage'
          }
        }
      </RootPage>
    )
  }
}