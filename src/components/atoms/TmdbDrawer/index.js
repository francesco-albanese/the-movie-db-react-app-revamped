import React from 'react'
import { Drawer } from '@material-ui/core'

export const TmdbDrawer = ({
  isOpen,
  onClose,
  children
}) => {
  return (
    <Drawer open={ isOpen } onClose={ onClose }>
      { children }
    </Drawer>
  )
}