import { ChangeEvent, FC } from 'react'

export type LoginOrSignupFormProps = 'username' | 'password' | 'confirmPassword'

type Props = {
  onChangeValue: (prop: LoginOrSignupFormProps, value: string) => void
  onToggleSignup: () => void
}

const Signup: FC<Props> = ({ onChangeValue, onToggleSignup }) => (
  <div className='row g-3'>
    <div className='col-12 required'>
      <label htmlFor='username' className='form-label'>
        Username
      </label>
      <input
        id='username'
        type='text'
        name='username'
        className='form-control'
        placeholder='Username'
        maxLength={20}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChangeValue('username', e.target.value.trim())
        }
      />
    </div>
    <div className='col-12 required'>
      <label htmlFor='password' className='form-label'>
        Password
      </label>
      <input
        id='password'
        type='password'
        name='password'
        className='form-control'
        placeholder='Password'
        maxLength={20}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChangeValue('password', e.target.value.trim())
        }
      />
      <div id='passwordHelp' className='form-text'>
        Must be at least 6 characters, including a symbol, upper and lower case
        letter and a number
      </div>
    </div>
    <div className='col-12 required'>
      <label htmlFor='confirmPassword' className='form-label'>
        Confirm password
      </label>
      <input
        id='confirmPassword'
        type='password'
        name='confirmPassword'
        className='form-control'
        placeholder='Confirm password'
        maxLength={20}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChangeValue('confirmPassword', e.target.value.trim())
        }
      />
    </div>
    <div className='col-12'>
      <p className='mb-0'>
        Already have an account?{' '}
        <a onClick={onToggleSignup} href='#'>
          Login
        </a>
      </p>
    </div>
  </div>
)

export default Signup
