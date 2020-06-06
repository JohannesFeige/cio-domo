import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../firebase';

import * as MESSAGES from '../../constants/messages';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: (null as unknown) as { message: string },
};

const SignInForm: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const subnmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firebase) {
      setState({ ...state, error: { message: MESSAGES.MISSING_FIREBASE_CONTEXT } });
      return;
    }

    const { email, password } = state;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setState({ ...state, error });
      });
  };

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const { email, password, error } = state;
  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={subnmitHandler}>
      <input name="email" value={email} onChange={changeHandler} type="text" placeholder="email" />
      <input name="password" value={password} onChange={changeHandler} type="password" placeholder="password" />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignInForm;
