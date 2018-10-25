import Loadable from 'react-loadable'

import { TmdbSpinner } from '#atoms'

const reactLoadableDefaults = {
  delay: 300,
  loading: TmdbSpinner,
  timeout: 5000
}

export const routesConfig = [
  {
    reference: 'home-page',
    exact: true,
    component: Loadable({
      loader: () => import('#containers/HomePage'),
      ...reactLoadableDefaults
    })
  },
  {
    reference: 'favourites-page',
    exact: true,
    component: Loadable({
      loader: () => import('#containers/FavouritesPage'),
      ...reactLoadableDefaults
    })
  },
  {
    reference: 'movie-details-page',
    exact: true,
    component: Loadable({
      loader: () => import('#containers/MovieDetailsPage'),
      ...reactLoadableDefaults
    })
  }
]