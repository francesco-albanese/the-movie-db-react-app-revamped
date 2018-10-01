import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import Enzyme, {
  shallow,
  render,
  mount
} from 'enzyme'

/**
 * Create React 16 Enzyme adapter.
 */
Enzyme.configure({ adapter: new Adapter() })

/**
 * Make react and react-renderer available in all test files w/o importing.
 */
global.React = React
global.renderer = renderer

/**
 * Make Enzyme functions available in all test files w/o importing.
 */
global.shallow = shallow
global.render = render
global.mount = mount
