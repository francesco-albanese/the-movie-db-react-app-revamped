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
  allPages = [],
  width
}) => {

  console.log(width)

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
          className="tmdb-movies-grid-item"
          item 
          key={ id }
          xs={ 6 }
          sm={ 4 }
          md={ 3 }
          lg={ 2 }
          xl={ 2 }>

          <Link to={ to }>
            <Card className="tmdb-movies-grid-item-card">
              <CardMedia
                alt={ title }
                className="tmdb-movies-grid-item-poster"
                image={ image }
                title={ title } />

              <Typography 
                className="tmdb-movie-title" 
                variant="body1"
                noWrap>
                { title }
              </Typography>
            </Card>
          </Link>

        </Grid>
      )
    })
  }

  const spacing = width === 'xs' || width === 'sm'
    ? 8
    : 32

  return !isEmpty(allMovies)
    ? (
      <div className="tmdb-movies-grid-container">
        <Grid container spacing={ spacing }>
          { renderGridItems() }
        </Grid>
      </div>
    )
    : null
}