import React from 'react'
import { 
  Card,
  CardMedia, 
  Grid,
  Typography 
} from '@material-ui/core' 
import { isEmpty } from 'lodash-es'
import { Link } from 'react-router-dom'

export const TmdbMoviesGrid = ({ 
  allMovies = [], 
  activeLocale = {}, 
  allPages = []
}) => {

  const movieDetailsPage = allPages.find(({ reference }) => reference.includes('movie-details-page'))
  const path = movieDetailsPage.paths[ activeLocale.code ]

  const renderGridItems = () => {

    return allMovies.map(movie => {

      const { 
        id, 
        image,
        title 
      } = movie 

      const to = path.replace(':movieid', id)

      return (
        <Grid 
          className="tmdb-movies-grid"
          item 
          key={ id }
          xs={ 3 }
          md={ 3 }
          lg={ 2 }>

          <Link to={ to }>
            <Card>
              <CardMedia
                alt={ title }
                style={{ height: 220 }}
                image={ image }
                title={ title } />

              <Typography 
                className="tmdb-movie-title" 
                component="p"
                noWrap>
                { title }
              </Typography>
            </Card>
          </Link>

        </Grid>
      )
    })
  }

  return !isEmpty(allMovies)
    ? (
      <Grid container spacing={ 16 }>
        { renderGridItems() }
      </Grid>
    )
    : null
}