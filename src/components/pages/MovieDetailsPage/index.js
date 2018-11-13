import React from 'react'
import { get, isEmpty } from 'lodash-es'
import { 
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography 
} from '@material-ui/core'

import NoMovieFound from './sections/NoMovieFound'

import { TmdbSpinner } from '#atoms'
import { TmdbMovieDetails } from '#molecules'
import { TmdbAppBar } from '#organisms'

export default class MovieDetailsPage extends React.Component {

  static renderGenresList = genresList => {
    return !isEmpty(genresList)
      ? genresList.map(genre => {
        return (
          <Typography 
            className="tmdb-movie-details-description"
            variant="subtitle1" 
            key={ genre }>
            { genre }
          </Typography>
        )
      })
      : null
  }

  static convertMinsToHrsMins = (mins, localeCode) => {
    const hours = Math.floor(mins / 60)
    const minutes = mins % 60

    const isDefaultLocale = localeCode === 'en'

    const hoursText = `${ isDefaultLocale ? hours > 1 ? 'hours' : 'hour' : !isDefaultLocale ? hours > 1 ? 'ore' : 'ora' : null }`
    const minutesText = `${ isDefaultLocale ? minutes > 1 ? 'minutes' : 'minute' : !isDefaultLocale ? minutes > 1 ? 'minuti' : 'minuto' : null }`


    return hours < 1 
      ? `${ minutes } ${ minutesText }`
      : `${ hours } ${ hoursText } ${ minutes } ${ minutesText }`
  }

  goBack = () => {
    const { activeLocale, history } = this.props

    history.push(activeLocale.path)
  }

  renderAppBar = () => {
    const { sections } = this.props 
    
    const lineOne = get(sections, 'MovieDetails.MovieDetailsText.lineOne', '')

    return (
      <Grid 
        className="tmdb-movie-details-page__header"
        item 
        xs={ 12 }>
        <TmdbAppBar 
          { ...this.props }
          isDynamicPage 
          content={ lineOne } />
      </Grid>
    )
  }

  renderTitle = () => {
    const { 
      activeLocale, 
      movieDetails, 
      sections 
    } = this.props

    const title = get(sections, 'MovieDetails.Title.lineOne')

    return (
      <TmdbMovieDetails 
        title={ title[ activeLocale.code ] } 
        description={ movieDetails.title } />
    )
  }

  renderReleaseDate = () => {
    const { 
      activeLocale, 
      movieDetails, 
      sections 
    } = this.props

    const releaseDate = get(sections, 'MovieDetails.ReleaseDate.lineOne')
    const date = (new Date(movieDetails.release_date)).toLocaleDateString()

    return (
      <TmdbMovieDetails 
        title={ releaseDate[ activeLocale.code ] } 
        description={ date } />
    )
  }

  renderRating = () => {
    const { 
      activeLocale, 
      movieDetails, 
      sections 
    } = this.props

    const rating = get(sections, 'MovieDetails.Rating.lineOne')

    return (
      <TmdbMovieDetails 
        title={ rating[ activeLocale.code ] } 
        description={ movieDetails.rating } />
    )
  }

  renderDescription = () => {
    const { 
      activeLocale, 
      movieDetails, 
      sections 
    } = this.props

    const overview = get(sections, 'MovieDetails.Overview.lineOne')

    return (
      <TmdbMovieDetails 
        title={ overview[ activeLocale.code ] } 
        description={ movieDetails.description } />
    )
  }

  renderGenres = () => {
    const { 
      activeLocale, 
      movieDetails, 
      sections 
    } = this.props

    const genre = get(sections, 'MovieDetails.GenreText.lineOne')

    return !isEmpty(movieDetails.genres) 
      ? (
        <Card className="tmdb-movie-details-card">
          <CardContent>
            <Typography 
              className="tmdb-movie-details-title"
              variant="h5" 
              gutterBottom>
              { genre[ activeLocale.code ] }
            </Typography>

            { MovieDetailsPage.renderGenresList(movieDetails.genres) }
          </CardContent>
        </Card>
      )
      : null
  }

  renderCard = () => {
    const { movieDetails } = this.props
    const title = get(movieDetails, 'title')
    const image = get(movieDetails, 'poster')

    return (
      <Card className="tmdb-movie-details-card-image-container">
        <CardMedia
          className="tmdb-movie-details-card-image"
          alt={ title }
          image={ image }
          title={ title } />
      </Card>
    )
  }

  renderRuntime = () => {
    const { 
      activeLocale, 
      movieDetails, 
      sections 
    } = this.props

    const runtime = get(sections, 'MovieDetails.Runtime.lineOne')

    return Number.isInteger(movieDetails.runtime)
      ? (
        <TmdbMovieDetails 
          title={ runtime[ activeLocale.code ] } 
          description={ 
            MovieDetailsPage
              .convertMinsToHrsMins(
                movieDetails.runtime, 
                activeLocale.code
              ) 
          } />
      )
      : null
  }

  renderUiDesktop = () => {
    return (
      <Grid 
        container 
        className="tmdb-movie-details-content-container"
        wrap="nowrap">
        <Grid item lg={ 6 }>
          { this.renderTitle() }
          { this.renderReleaseDate() }
          { this.renderRating() }
          { this.renderRuntime() }
          { this.renderDescription() }
          { this.renderGenres() }
        </Grid>

        <Grid item lg={ 6 }>
          { this.renderCard() }
        </Grid>
      </Grid>
    )
  }

  renderUiMobile = () => {
    const { movieDetails } = this.props
    const background = get(movieDetails, 'background')

    return (
      <Grid 
        container 
        className="tmdb-movie-details-content-container--mobile"
        direction="column"
        wrap="nowrap">

        <Grid 
          container 
          className="tmdb-movie-details-with-background"
          style={{ backgroundImage: `url(${ background })` }}
          alignItems="center">
          
          <Grid 
            item 
            xs={ 12 } 
            sm={ 4 }>
            { this.renderCard() }
          </Grid>

          <Grid 
            item
            sm={ 8 } 
            xs={ 12 }>
            <Grid 
              container
              justify="center">

              <Grid 
                item 
                sm={ 6 }
                xs={ 6 }>
                { this.renderTitle() }
              </Grid>

              <Grid 
                item 
                sm={ 6 }
                xs={ 6 }>
                { this.renderReleaseDate() }
              </Grid>

            </Grid>

            <Grid 
              container
              justify="center" 
              wrap="nowrap">

              <Grid 
                item 
                sm={ 6 }
                xs={ 6 }>
                { this.renderRating() }
              </Grid>

              <Grid 
                item 
                sm={ 6 }
                xs={ 6 }>
                { this.renderRuntime() }
              </Grid>

            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid 
            className="tmdb-movie-details-mobile-overview-container"
            item 
            xs>
            { this.renderDescription() }
            { this.renderGenres() }
          </Grid>        
        </Grid>
      
      </Grid>
    )
  }

  render() {

    const {
      isMobile,
      isMoviesFetching,
      movieDetails,
      sections
    } = this.props

    const NoMovieFoundText = get(sections, 'MovieDetails.NoMovieFoundText')

    return (
      <Grid 
        container
        className="tmdb-movie-details-page">
      
        { this.renderAppBar() }
        
        {
          isMoviesFetching 
            ? <TmdbSpinner /> 
            : !isEmpty(movieDetails)
              ? (
                <React.Fragment>
                  { !isMobile && this.renderUiDesktop() }
                  { isMobile && this.renderUiMobile() }
                </React.Fragment>
              )
              : <NoMovieFound 
                { ...this.props }
                goBack={ this.goBack }
                isMobile={ isMobile }
                section={ NoMovieFoundText } />

        }
      </Grid>
    )
  }
}