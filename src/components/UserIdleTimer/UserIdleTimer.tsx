import { FC, Fragment, useContext, useRef, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import AuthContext from '../../store/auth-context';
import Timer from '../Timer/Timer';
import Modal from '../UI/Modal/Modal';

type UserIdleTimerProps = {
  onLogout: () => void;
};

const UserIdleTimer: FC<UserIdleTimerProps> = ({ onLogout }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [closeOnStayLoggedIn, setCloseOnStayLoggedIn] =
    useState<boolean>(false);
  const resetTimerRef = useRef<any>({});

  const authCtx = useContext(AuthContext);

  const handleOnIdle = () => {
    resetTimerRef.current = false;
    const auth = authCtx.getAuth();
    auth ? setDisplayModal(true) : onLogout();
  };

  const handleOnLogout = () => {
    !resetTimerRef.current && onLogout();
    setDisplayModal(false);
    setCloseOnStayLoggedIn(false);
  };

  const handleOnStayLoggedIn = () => {
    resetTimerRef.current = true;
    reset();
    setCloseOnStayLoggedIn(true);
  };

  const handleOnTimeout = () => {
    onLogout();
    setCloseOnStayLoggedIn(true);
  };

  const { reset } = useIdleTimer({
    timeout: 180000, // 3 minutes
    onIdle: handleOnIdle,
    debounce: 500,
    crossTab: {
      emitOnAllTabs: true,
    },
  });

  return (
    <Fragment>
      {displayModal && (
        <Modal
          title={'Session Expiry Warning'}
          closeOnSubmit={closeOnStayLoggedIn}
          submitBtnName={'Stay logged in'}
          closeBtnName={'Logout'}
          disableSubmitBtn={false}
          isSubmitLoading={false}
          children={<Timer seconds={90} onTimeout={handleOnTimeout} />}
          onClose={handleOnLogout}
          onSubmit={handleOnStayLoggedIn}
        />
      )}
    </Fragment>
  );
};

export default UserIdleTimer;
