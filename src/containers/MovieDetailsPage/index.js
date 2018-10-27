import React from 'react'

import { RootPage } from '#FAC'

export default class MovieDetailsPageContainer extends React.Component {
  render() {
    return (
      <RootPage>
        {
          ({ isMobile }) => {
            return 'this is from MovieDetails page container'
          }
        }
      </RootPage>
    )
  }
}