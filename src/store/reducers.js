import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import { NAMESPACE as FORM_NAMESPACE } from './forms'

export default combineReducers({
  [ FORM_NAMESPACE ] : reduxFormReducer
})