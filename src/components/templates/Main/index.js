import React from 'react'
import { TmdbMainMenu } from '#organisms'
import { TmdbPortal } from '#portals' 
import Grid from '@material-ui/core/Grid'

import Header from './sections/Header'

export default ({ children, isMobile, ...otherProps }) => {
  const { isDynamicPage } = otherProps
  const articleGridSize = isDynamicPage
    ? 12
    : 9

  return (
    <main className="tmdb-app-template-container">
      <Grid container spacing={ 16 }>
        { 
          !isMobile && 
          !isDynamicPage &&
            <Grid item md={ 3 }>
              <TmdbMainMenu { ...otherProps } isMobile={ isMobile } />
            </Grid> 
        }

        {
          isMobile &&
          <Grid item xs={ 12 }>
            <Header { ...otherProps } />
          </Grid>
        }

        {
          <TmdbPortal />
        }

        <Grid item xs={ 12 } md={ articleGridSize }>
          <article className="tmdb-page">{ children }</article>
        </Grid>
      </Grid>
    </main>
  )
}
