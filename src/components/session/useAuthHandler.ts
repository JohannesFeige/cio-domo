import { useState } from 'react';

const useAuthHandler = () => {
  const [auth, setAuth] = useState<firebase.User | null>(null);

  const setAuthStatus = (user: firebase.User) => {
    if (auth && auth.uid === user.uid) {
      return;
    }
    console.log('---setAuthStatus---');
    setAuth(user);
  };

  const setUnauthStatus = () => {
    if (auth === null) {
      return;
    }
    console.log('---setUnauthStatus---');
    setAuth(null);
  };

  return {
    auth,
    setAuthStatus,
    setUnauthStatus,
  };
};

export default useAuthHandler;
