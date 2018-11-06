import React from 'react'
import { 
  getFormValues, 
  reduxForm, 
  Field 
} from 'redux-form'
import { isEmpty } from 'lodash-es'
import { connect } from 'react-redux'

import { decorateClass } from '#utils'

import { TmdbTextField } from '#atoms'

const RootForm = WrappedForm => {
  class Form extends WrappedForm {
  
    state = {
      fields: []
    }
  
    renderField = ({
      input, 
      label, 
      meta, 
      type
  
    }) => {
  
      return (
        <TmdbTextField
          { ...input }
          label={ label }
          type={ type }
          error={ meta.error } />
      )
    }
  
    renderReduxFields = fields => {
      if (isEmpty(fields)) {
        return []
      }
  
      const fieldsToRender = fields.map((field, index) => {
        return (
          <Field
            name={ field.name }
            component={ this.renderField }
            key={ index }
            label={ field.label }
            onChange={ field.onChange }
            type={ field.type } />
        )
      })
  
      this.setState({ fields: fieldsToRender })
    }
  
    render() {
      const { formValues } = this.props
      const { fields } = this.state

      return (
        <WrappedForm 
          { ...this.props }
          fields={ fields } 
          formValues={ formValues }
          renderReduxFields={ this.renderReduxFields } />
      )
    }
  }
  
  return decorateClass([
    reduxForm({ form: WrappedForm.name }),
    connect(state => ({
      formValues: getFormValues(WrappedForm.name)(state)
    }))
  ], Form)
}

export default RootForm