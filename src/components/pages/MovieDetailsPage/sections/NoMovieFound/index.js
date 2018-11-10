import React from 'react'
import { get, isEmpty } from 'lodash-es'
import { 
  Button, 
  Grid, 
  Paper,
  Typography 
} from '@material-ui/core'
import { Movie } from '@material-ui/icons'

export default class NoMovieFound extends React.Component {

  goBack = () => {
    const { history, activeLocale } = this.props

    history.push(activeLocale.path)
  }
  
  render() {
    const { activeLocale, section } = this.props
    const lineOne = get(section, 'lineOne')
    const lineTwo = get(section, 'lineTwo')

    return !isEmpty(section) 
      ? (
        <Grid 
          className="tmdb-no-movie-found-section"
          direction="column"
          alignItems="center"
          justify="center"
          container>

          <Grid item>
            <Paper>
              <Movie fontSize="large" />
              
              <Typography variant="h2">
                { lineOne[ activeLocale.code ] }
              </Typography>

              <Button onClick={ this.goBack }>
                { lineTwo[ activeLocale.code ] }
              </Button>
            </Paper>
          </Grid>

        </Grid>
      )
      : null
  }
}