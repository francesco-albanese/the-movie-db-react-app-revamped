import React from 'react'
import { 
  Card,
  CardMedia, 
  Grid 
} from '@material-ui/core' 

export const TmdbMoviesGrid = ({ movies = []}) => {

  const renderGridItems = () => {

    return movies.map(movie => {

      const { 
        id, 
        image,
        title 
      } = movie

      return (
        <Grid 
          item 
          key={ id }
          xs={ 12 }
          md={ 3 }
          lg={ 2 }>
          <Card>
            <CardMedia
              alt={ title }
              style={{ height: 220 }}
              image={ image }
              title={ title } />
          </Card>
        </Grid>
      )
    })
  }

  return (
    <Grid container spacing={ 16 }>
      { renderGridItems() }
    </Grid>
  )
}