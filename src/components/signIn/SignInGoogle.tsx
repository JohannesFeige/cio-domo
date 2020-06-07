import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../firebase';

import * as MESSAGES from '../../constants/messages';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  error: (null as unknown) as { message: string },
};

const SignInGoogle: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firebase) {
      setState({ ...state, error: { message: MESSAGES.MISSING_FIREBASE_CONTEXT } });
      return;
    }

    firebase
      .doSignInwithGoogle()
      .then((socialAuthUser) => {
        if (!socialAuthUser.user) {
          return null;
        }
        return firebase?.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
        });
      })
      .then((foo) => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setState({ ...state, error });
      });
  };

  const { error } = state;

  return (
    <form onSubmit={submitHandler}>
      <button type="submit">Sign in with Google</button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignInGoogle;
