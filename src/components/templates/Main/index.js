import React from 'react'
import { TmdbMainMenu } from '#organisms'
import { TmdbPortal } from '#portals' 
import Grid from '@material-ui/core/Grid'

import { TmdbAppBar } from '#organisms'

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
          !isDynamicPage &&
          <Grid item xs={ 12 }>
            <TmdbAppBar 
              isMobile={ isMobile }
              withBurgerMenu 
              { ...otherProps } />
          </Grid>
        }
        
        <TmdbPortal />

        <Grid
          className="tmdb-page-container" 
          item 
          xs={ 12 } 
          md={ articleGridSize }>
          <article className="tmdb-page">{ children }</article>
        </Grid>
      </Grid>
    </main>
  )
}
