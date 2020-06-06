import { useState } from 'react';

const useAuthHandler = () => {
  const [authUser, setAuthUser] = useState<firebase.User | null>(null);

  const setAuthStatus = (user: firebase.User) => {
    if (authUser && authUser.uid === user.uid) {
      return;
    }
    setAuthUser(user);
  };

  const setUnauthStatus = () => {
    if (authUser === null) {
      return;
    }
    setAuthUser(null);
  };

  return {
    authUser,
    setAuthStatus,
    setUnauthStatus,
  };
};

export default useAuthHandler;
