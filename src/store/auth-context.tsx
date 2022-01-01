import React from 'react';
import { IAuthContext } from '../interfaces/types';

const AuthContext = React.createContext<IAuthContext>({
    auth: null,
    addAuth: () => null,
    getAuth: () => null,
    removeAuth: () => null
});

export default AuthContext;