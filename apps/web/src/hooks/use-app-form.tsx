import { createFormHook } from '@tanstack/react-form'
import {
  BigCheckboxField,
  PasswordField,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  TextFieldGroup,
} from './form-components'

import { fieldContext, formContext } from './form-context'

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
    TextAreaField,
    TextFieldGroup,
    SelectField,
    BigCheckboxField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
