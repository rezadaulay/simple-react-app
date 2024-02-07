import { useState, FormEvent, memo } from 'react'
import { validateEmail } from '../helpers'
import ErrorValidation from '../interfaces/types/ErrorValidation'
import InputForm from './InputForm'
import { default as LoginFormTypes } from '../interfaces/types/LoginForm'

const LoginForm = ({
    onSubmit,
    currentLang
}: LoginFormTypes) => {
  console.log("LoginForm was rendered at", new Date().toLocaleTimeString());
  const [validationError, setValidationError] = useState<ErrorValidation | null>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const trans = {
    'en': {
        'pageTitle': 'Login Page',
        'email': {
          'label': 'Email',
          'required': 'Email is required',
          'invalid': 'Email is invalid',
          'placeholder': 'Please type your email',
        },
        'password': {
          'label': 'Password',
          'required': 'Password is required',
          'placeholder': 'Please type your password',
        },
        'loginButton': {
          'label': 'Sign in'
        }
    },
    'id': {
      'pageTitle': 'Halaman Login',
        'email': {
          'label': 'Email',
          'required': 'Email wajib diisi',
          'invalid': 'Email isian invalid',
          'placeholder': 'Silahkan ketikkan email',
        },
        'password': {
          'label': 'Kata sandi',
          'required': 'Password wajib diisi',
          'placeholder': 'Silahkan ketikkan password',
        },
        'loginButton': {
          'label': 'Masuk'
        }
    }
  }

  const getCurrentTrans = () => {
    return (trans as any)[currentLang]
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim()) {
      setValidationError({
        id: 'email',
        message: getCurrentTrans().email.required,
      })
    } else if (!validateEmail(email)) {
      setValidationError({
        id: 'email',
        message: getCurrentTrans().email.invalid,
      })
    } else if (!password.trim()) {
      setValidationError({
        id: 'password',
        message: getCurrentTrans().password.required,
      })
    } else {
      setValidationError(null);
      onSubmit({
        email,
        password,
      })
    }
  }

  return (
   <form onSubmit={handleSubmit}>
    <h1>{getCurrentTrans().pageTitle}</h1>
    <div className={`content`}>
      <InputForm
        label={getCurrentTrans().email.label}
        error={validationError?.id === 'email' ? validationError : null}
        name={`email`}
        type={`email`}
        onChange={event => setEmail(event.target.value)}
        placeholder={getCurrentTrans().email.placeholder}
      />
      <InputForm
        label={getCurrentTrans().password.label}
        error={validationError?.id === 'password'  ? validationError : null}
        name={`password`}
        type={`password`}
        onChange={event => setPassword(event.target.value)}
        placeholder={getCurrentTrans().password.placeholder}
      />
    </div>
    <div className={`action`}>
      <button>{getCurrentTrans().loginButton.label}</button>
    </div>
   </form>
  )
}

export default memo(LoginForm);