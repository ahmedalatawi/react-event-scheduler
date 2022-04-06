import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { IAuth } from '../interfaces/types';

import AuthContext from './auth-context';

const AuthProvider: React.FC = (props) => {
  const [auth, setAuth] = useState<IAuth | null>(null);

  const { getAuth, addAuth, removeAuth } = useAuth();

  useEffect(() => {
    const storedAuth = getAuth();
    setAuth(storedAuth)
  }, [getAuth]);

  const addAuthHandler = (auth: IAuth) => {
    addAuth(auth);
    setAuth(auth);
  };

  const removeAuthHandler = () => {
    removeAuth();
    setAuth(null);
  }

  const authContext = {
    auth,
    addAuth: addAuthHandler,
    getAuth,
    removeAuth: removeAuthHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
