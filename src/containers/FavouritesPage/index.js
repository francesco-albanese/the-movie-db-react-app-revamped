import React from 'react'
import { RootPage } from '#FAC' 
import { Typography } from '@material-ui/core'
import { Timelapse } from '@material-ui/icons'

export default class FavouritesPageContainer extends React.Component {
  render() {
    /**
     * TODO: KILL ME once the page is implemented.
     */

    const styles = {
      div: {
        height: '100vh',
        backgroundColor: '#21374c',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      h2: {
        color: '#fff'
      },
      icon: {
        color: '#fff',
        fontSize: '8em'
      }
    }

    return (
      <RootPage>
        {
          ({ isMobile }) => {
            return (
              <div style={{ ...styles.div }}>
                <Timelapse style={{ ...styles.icon }} />
                <Typography style={{ ...styles.h2 }} variant="h2">
                  Coming soon
                </Typography>
              </div>
            )
          }
        }
      </RootPage>
    )
  }
}