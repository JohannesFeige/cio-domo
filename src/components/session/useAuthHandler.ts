import { useState } from 'react';
import { User } from '../firebase/models';

const LOCAL_STORAGE_AUTH_USER = 'authUser';

const useAuthHandler = () => {
  const getLocalStorageAuthUser = () => {
    const item = localStorage.getItem(LOCAL_STORAGE_AUTH_USER);

    return item != null ? (JSON.parse(item) as User) : item;
  };

  const [authUser, setAuthUser] = useState<User | null>(getLocalStorageAuthUser());

  const setAuthStatus = (user: User) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(user));
    setAuthUser(user);
  };

  const setUnauthStatus = () => {
    if (authUser === null) {
      return;
    }

    localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
    setAuthUser(null);
  };

  return {
    authUser,
    setAuthStatus,
    setUnauthStatus,
  };
};

export default useAuthHandler;
