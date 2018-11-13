import React from 'react'
import { 
  Button, 
  Grid, 
  Typography 
} from '@material-ui/core'
import { Error } from '@material-ui/icons'
import { get } from 'lodash-es'

export default ({ 
  activeLocale = {}, 
  history,
  isMobile,
  sections = {}
}) => {

  const code = get(activeLocale, 'code')
  const path = get(activeLocale, 'path')

  const lineOne = get(sections, 'FourOhFour.FourOhFourText.lineOne')
  const lineTwo = get(sections, 'FourOhFour.FourOhFourText.lineTwo')

  const variant = isMobile 
    ? 'h4'
    : 'h2'

  return (
    <Grid 
      alignItems="center"
      className="tmdb-four-oh-four-container"
      container 
      direction="column">

      <Grid item xs={ 12 }>
        <Error className="tmdb-four-oh-four-icon" />

        <Typography 
          align="center"
          className="tmdb-four-oh-four-text"
          variant="h1">
          404
        </Typography>

        <Typography
          align="center"
          className="tmdb-four-oh-four-text" 
          variant={ variant }>
          { lineOne[ code ] }
        </Typography>

        <Button 
          className="tmdb-four-oh-four-button"
          onClick={ () => history.push(path)  }>
          { lineTwo[ code ] }
        </Button>
      </Grid>

    </Grid>
  )

}