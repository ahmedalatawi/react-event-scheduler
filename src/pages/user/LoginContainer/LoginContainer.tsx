import { useState, useRef, Fragment, useContext, useEffect, FC } from 'react';
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

type LoginContainerProps = {
  view: string;
  onClose: () => void;
  onSuccess: () => void;
};

const LoginContainer: FC<LoginContainerProps> = ({
  view,
  onClose,
  onSuccess,
}) => {
  const [viewType, setViewType] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [displayLoginError, setDisplayLoginError] = useState<boolean>(false);
  const [closeOnSuccess, setCloseOnSuccess] = useState<boolean>(false);

  const usernameRef = useRef<any>({});
  const passwordRef = useRef<any>({});
  const confirmPasswordRef = useRef<any>({});

  const [validate] = useValidation(setErrorMsg);

  const [login, { error: loginError, data: loginData, loading: loginLoading }] =
    useLoginLazyQuery({
      fetchPolicy: 'cache-and-network',
    });
  const [
    signup,
    { error: signupError, data: signupData, loading: signupLoading, reset },
  ] = useSignupMutation();

  const authCtx = useContext(AuthContext);

  const { addAuth, getAuth } = authCtx;

  useEffect(() => {
    const auth: any = loginData || signupData;
    const storedAuth = getAuth();

    if (auth && !storedAuth) {
      const { userId, token, tokenExpiration, username } =
        auth.login || auth.signup;

      addAuth({ userId, token, tokenExpiration, username });
      setCloseOnSuccess(true);
      onSuccess();
    }
  }, [addAuth, getAuth, loginData, onSuccess, signupData]);

  const handleSubmit = () => {
    const view = getViewType();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

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

  const handleUsernameChange = (username: string) => {
    usernameRef.current.value = username;
    reset();
    setErrorMsg('');
    setDisplayLoginError(false);
  };

  const handlePasswordChange = (password: string) => {
    passwordRef.current.value = password;
    reset();
    setErrorMsg('');
    setDisplayLoginError(false);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    confirmPasswordRef.current.value = confirmPassword;
    reset();
    setErrorMsg('');
    setDisplayLoginError(false);
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
