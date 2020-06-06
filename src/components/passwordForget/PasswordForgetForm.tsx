import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../firebase';

import * as MESSAGES from '../../constants/messages';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  error: (null as unknown) as { message: string },
};

const PasswordForgetForm: React.FC = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firebase) {
      setState({ ...state, error: { message: MESSAGES.MISSING_FIREBASE_CONTEXT } });
      return;
    }

    const { email } = state;

    firebase.doPasswordReset(email).then(() => {
      setState({ ...INITIAL_STATE });
    });
  };

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const { email, error } = state;
  const isInvalid = email === '';

  return (
    <form onSubmit={submitHandler}>
      <input name="email" value={email} onChange={changeHandler} type="text" placeholder="Email Address" />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default PasswordForgetForm;
