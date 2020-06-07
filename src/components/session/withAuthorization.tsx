import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../firebase';
import { AuthContext } from '.';

import * as ROUTES from '../../constants/routes';

const withAuthorization = (condition: (authUser: firebase.User | null) => boolean) => <P extends {}>(WrappedComponent: React.FC<P>) => {
  return (props: P) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const { authUser } = useContext(AuthContext);

    useEffect(() => {
      const listener = firebase?.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          history.push(ROUTES.SIGN_IN);
        }
      });
      return () => {
        listener?.();
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return condition(authUser) ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuthorization;
