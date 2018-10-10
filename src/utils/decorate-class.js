import { flowRight } from 'lodash-es'

/**
 * @param decorators {Array}  - Function decorators 
 * @param component {Class}   - React component to decorate
 */

export const decorateClass = (decorators = [], component) => {
  const decoratedComponent = flowRight(...decorators)

  return decoratedComponent(component)
}