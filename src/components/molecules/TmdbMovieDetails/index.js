import React from 'react'
import { 
  Card, 
  CardContent,
  Typography 
} from '@material-ui/core'

export const TmdbMovieDetails = ({ 
  title, 
  description 
}) => {
  return (
    <Card className="tmdb-movie-details-card">
      <CardContent>
        <Typography 
          className="tmdb-movie-details-title"
          variant="h5" 
          gutterBottom>
          { title }
        </Typography>

        <Typography
          className="tmdb-movie-details-description"
          variant="subtitle1">
          { description }
        </Typography>
      </CardContent>
    </Card>
  )
}