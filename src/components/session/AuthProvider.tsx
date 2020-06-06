import React from 'react';
import AuthContext, { useAuthHandler } from '.';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, setAuthStatus, setUnauthStatus } = useAuthHandler();

  return <AuthContext.Provider value={{ auth, setAuthStatus, setUnauthStatus }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
