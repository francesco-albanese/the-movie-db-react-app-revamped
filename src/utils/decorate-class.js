import { flowRight } from 'lodash-es'

/**
 * @param Array of Functions decorators 
 */

export const decorateClass = (decorators = [], component) => {
  const decoratedComponent = flowRight(...decorators)

  return decoratedComponent(component)
}