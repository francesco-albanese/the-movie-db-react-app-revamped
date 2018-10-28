import React from 'react'
import { MainMenu } from '#organisms'
import Grid from '@material-ui/core/Grid'

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
              <MainMenu { ...otherProps } />
            </Grid> 
        }

        <Grid item xs={ 12 } md={ articleGridSize }>
          <article className="tmdb-article">{ children }</article>
        </Grid>
      </Grid>
    </main>
  )
}
