import React from 'react';
import { useAuthHandler } from '.';

type AuthContextType = ReturnType<typeof useAuthHandler>;

export const AuthContext = React.createContext<AuthContextType>({
  auth: null,
  setAuthStatus: () => {},
  setUnauthStatus: () => {},
});

export default AuthContext;
