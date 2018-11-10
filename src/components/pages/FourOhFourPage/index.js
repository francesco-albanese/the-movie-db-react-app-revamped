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
  sections = {}
}) => {

  const code = get(activeLocale, 'code')
  const path = get(activeLocale, 'path')

  const lineOne = get(sections, 'FourOhFour.FourOhFourText.lineOne')
  const lineTwo = get(sections, 'FourOhFour.FourOhFourText.lineTwo')

  return (
    <Grid 
      alignItems="center"
      container 
      justify="center">
      <Grid item xs={ 12 }>
        <Typography variant="h1">
          <Error /> 404
        </Typography>
        <Typography>
          { lineOne[ code ] }
        </Typography>
        <Button onClick={ () => history.push(path)  }>
          { lineTwo[ code ] }
        </Button>
      </Grid>
    </Grid>
  )

}