export const BREAKPOINTS = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl'
}

export const getIsMobile = width => {
  return width === BREAKPOINTS.xs || width === BREAKPOINTS.sm
}