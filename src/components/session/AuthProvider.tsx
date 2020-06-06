import React from 'react';
import AuthContext, { useAuthHandler } from '.';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authUser, setAuthStatus, setUnauthStatus } = useAuthHandler();

  return <AuthContext.Provider value={{ authUser, setAuthStatus, setUnauthStatus }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
