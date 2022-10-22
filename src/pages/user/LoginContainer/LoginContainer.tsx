import { useState, Fragment, useContext, useEffect, FC } from 'react';
import useValidation from '../../../hooks/useValidation';
import Login from '../../../components/Login/Login';
import Signup from '../../../components/Signup/Signup';
import Alert from '../../../components/UI/Alert/Alert';
import Modal from '../../../components/UI/Modal/Modal';
import AuthContext from '../../../store/auth-context';
import {
  useLoginLazyQuery,
  useSignupMutation,
} from '../../../generated/graphql';
import { ISignupInput } from '../../../types';

type Props = {
  view: string;
  onClose: () => void;
};

const LoginContainer: FC<Props> = ({ view, onClose }) => {
  const [viewType, setViewType] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [displayLoginError, setDisplayLoginError] = useState<boolean>(false);
  const [closeOnSuccess, setCloseOnSuccess] = useState<boolean>(false);
  const [signupForm, setSignupForm] = useState<ISignupInput>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [validate] = useValidation(setErrorMsg);

  const [login, { error: loginError, data: loginData, loading: loginLoading }] =
    useLoginLazyQuery({
      fetchPolicy: 'cache-and-network',
    });
  const [
    signup,
    { error: signupError, data: signupData, loading: signupLoading, reset },
  ] = useSignupMutation();

  const { addAuth, getAuth } = useContext(AuthContext);

  useEffect(() => {
    const auth: any = loginData || signupData;
    const storedAuth = getAuth();

    if (auth && !storedAuth) {
      const { userId, token, tokenExpiration, username } =
        auth.login || auth.signup;

      addAuth({ userId, token, tokenExpiration, username });
      setCloseOnSuccess(true);
    }
  }, [addAuth, getAuth, loginData, signupData]);

  const handleSubmit = () => {
    const view = getViewType();
    const { username, password, confirmPassword } = signupForm;

    setDisplayLoginError(false);
    reset();
    setCloseOnSuccess(false);

    const isValid = validate(username, password, confirmPassword, view);

    if (isValid) {
      if (view === 'Signup') {
        setDisplayLoginError(false);
        signup({
          variables: { signup: { username, password, confirmPassword } },
        });
      } else {
        setDisplayLoginError(true);
        login({ variables: { login: { username, password } } });
      }
    }
  };

  const onReset = () => {
    reset();
    setErrorMsg('');
    setDisplayLoginError(false);
  };

  const handleUsernameChange = (username: string) => {
    onReset();
    setSignupForm({ ...signupForm, username });
  };

  const handlePasswordChange = (password: string) => {
    onReset();
    setSignupForm({ ...signupForm, password });
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    onReset();
    setSignupForm({ ...signupForm, confirmPassword });
  };

  const getViewType = (): string => {
    return viewType ? viewType : view;
  };

  const handleToggleView = (view: string) => {
    setErrorMsg('');
    setViewType(view);
    reset();
    setDisplayLoginError(false);
  };

  return (
    <Modal
      title={getViewType()}
      submitBtnName={getViewType()}
      closeOnSubmit={closeOnSuccess}
      disableSubmitBtn={false}
      isSubmitLoading={loginLoading || signupLoading}
      onClose={() => onClose()}
      onSubmit={handleSubmit}
      children={
        <Fragment>
          {errorMsg && (
            <Alert
              msg={errorMsg}
              type="warning"
              ariaLabel="Warning:"
              fillType="#exclamation-triangle-fill"
            />
          )}
          {displayLoginError && loginError && (
            <Alert
              msg={loginError.message}
              type="danger"
              ariaLabel="Danger:"
              fillType="#exclamation-triangle-fill"
            />
          )}
          {signupError && (
            <Alert
              msg={signupError.message}
              type="danger"
              ariaLabel="Danger:"
              fillType="#exclamation-triangle-fill"
            />
          )}

          {getViewType() === 'Login' ? (
            <Login
              onChangeUsername={handleUsernameChange}
              onChangePassword={handlePasswordChange}
              onToggleLogin={() => handleToggleView('Signup')}
            />
          ) : (
            <Signup
              onChangeUsername={handleUsernameChange}
              onChangePassword={handlePasswordChange}
              onChangeConfirmPassword={handleConfirmPasswordChange}
              onToggleSignup={() => handleToggleView('Login')}
            />
          )}
        </Fragment>
      }
    />
  );
};

export default LoginContainer;
