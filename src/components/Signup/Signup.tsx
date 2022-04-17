/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChangeEvent, FC } from 'react';

type SignupProps = {
  onChangeUsername: (username: string) => void;
  onChangePassword: (password: string) => void;
  onChangeConfirmPassword: (confirmPassword: string) => void;
  onToggleSignup: () => void;
};

const Signup: FC<SignupProps> = ({
  onChangeUsername,
  onChangePassword,
  onChangeConfirmPassword,
  onToggleSignup,
}) => {
  return (
    <div className="row g-3">
      <div className="col-12 required">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          className="form-control"
          placeholder="Username"
          maxLength={20}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeUsername(e.target.value.trim())
          }
        />
      </div>
      <div className="col-12 required">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          maxLength={20}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangePassword(e.target.value.trim())
          }
        />
        <div id="passwordHelp" className="form-text">
          Must be at least 6 characters, including a symbol, upper and lower
          case letter and a number
        </div>
      </div>
      <div className="col-12 required">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          className="form-control"
          placeholder="Confirm password"
          maxLength={20}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeConfirmPassword(e.target.value.trim())
          }
        />
      </div>
      <div className="col-12">
        <p className="mb-0">
          Already have an account?{' '}
          <a onClick={onToggleSignup} href="#">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
