import Loadable from 'react-loadable'

import { reactLoadableDefaults } from '#router/routes.config'

export const portalNames = {
  mainMenu: 'MainMenu'
}

export const portalsConfig = [
  {
    name: portalNames.mainMenu,
    component: Loadable({
      loader: () => import('#portals/MainMenu'),
      ...reactLoadableDefaults
    })
  }
]