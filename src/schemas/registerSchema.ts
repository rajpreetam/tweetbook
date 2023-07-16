import * as Yup from 'yup';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const registerValidationSchema = Yup.object({
    email: Yup.string()
        .matches(emailRegex, 'Please enter valid email')
        .required('Email is required!'),
    username: Yup.string()
        .required('Username is required!'),
    password: Yup.string()
        .required('Password is Required!')
        .min(8, 'Password must be 8 characters long!'),
    confirm_password: Yup.string()
        .required('Please confirm your password!')
        .oneOf([Yup.ref('password')], 'Password did not matched!')
});