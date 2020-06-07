import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../firebase';

import * as MESSAGES from '../../constants/messages';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: (null as unknown) as { message: string },
};

const SignUpForm: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firebase) {
      setState({ ...state, error: { message: MESSAGES.MISSING_FIREBASE_CONTEXT } });
      return;
    }

    const { username, email, passwordOne } = state;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => firebase.user(authUser.user?.uid ?? '').set({ username, email }))
      .then(() => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        if (error.code === MESSAGES.EMAIL_ALREADY_IN_USE.CODE) {
          error.message = MESSAGES.EMAIL_ALREADY_IN_USE.MESSAGE;
        }

        setState({ ...state, error });
      });
  };

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const { username, email, passwordOne, passwordTwo, error } = state;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

  return (
    <form onSubmit={submitHandler}>
      <input name="username" value={username} onChange={changeHandler} type="text" placeholder="Username" />
      <input name="email" value={email} onChange={changeHandler} type="text" placeholder="Email Address" />
      <input name="passwordOne" value={passwordOne} onChange={changeHandler} type="password" placeholder="Password" />
      <input name="passwordTwo" value={passwordTwo} onChange={changeHandler} type="password" placeholder="Confirm Password" />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignUpForm;
