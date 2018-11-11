import React from 'react'
import { get, isEmpty } from 'lodash-es'
import { 
  Button, 
  Grid,
  Typography 
} from '@material-ui/core'
import { Movie } from '@material-ui/icons'

export default class NoMovieFound extends React.Component {
  
  render() {
    const { 
      activeLocale, 
      goBack,
      isMobile, 
      section 
    } = this.props

    const lineOne = get(section, 'lineOne')
    const lineTwo = get(section, 'lineTwo')

    const variant = isMobile 
      ? 'h4'
      : 'h2'

    return !isEmpty(section) 
      ? (
        <Grid 
          className="tmdb-no-movie-found-section"
          direction="column"
          alignItems="center"
          container>

          <Grid item>
            <Movie className="tmdb-no-movie-icon" fontSize="large" />
            
            <Typography 
              className="tmdb-no-movie-found-text"
              variant={ variant }
              align="center">
              { lineOne[ activeLocale.code ] }
            </Typography>

            <Button 
              className="tmdb-go-back-button"
              onClick={ goBack }
              size="large"
              variant="outlined">
              { lineTwo[ activeLocale.code ] }
            </Button>
          </Grid>

        </Grid>
      )
      : null
  }
}