import React, { useState, useContext } from 'react';

import { FirebaseContext } from '../firebase';

import * as MESSAGES from '../../constants/messages';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: (null as unknown) as { message: string },
};

const PasswordChangeForm: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firebase) {
      setState({ ...state, error: { message: MESSAGES.MISSING_FIREBASE_CONTEXT } });
      return;
    }

    if (!firebase.doPasswordUpdate) {
      setState({ ...state, error: { message: MESSAGES.MISSING_AUTH_USER } });
      return;
    }

    const { passwordOne } = state;

    firebase
      .doPasswordUpdate(passwordOne)
      ?.then(() => {
        setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        setState({ ...INITIAL_STATE, error });
      });
  };

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const { passwordOne, passwordTwo, error } = state;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form onSubmit={submitHandler}>
      <input name="passwordOne" value={passwordOne} onChange={changeHandler} type="password" placeholder="New Password" />
      <input name="passwordTwo" value={passwordTwo} onChange={changeHandler} type="password" placeholder="Confirm New Password" />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default PasswordChangeForm;
