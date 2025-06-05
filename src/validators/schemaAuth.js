import * as Yup from 'yup'

export const schemaLogin = Yup.object({
  username : Yup.string().max(20).min(6).required('Please enter your username.'),
  password : Yup.string().max(20).min(6).required('Please enter your password.'),
  confirmPassword : Yup.string().oneOf([Yup.ref("password", "Your password doesn't matched")])
})