import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../firebase';

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, email, passwordOne } = state;

    if (!firebase) {
      setState({ ...state, error: { message: 'missing firebase context' } });
      return;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setState({ ...state, error });
      });
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [event.currentTarget.name]: event.currentTarget.value });
  };

  const { username, email, passwordOne, passwordTwo, error } = state;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
  return (
    <form onSubmit={onSubmit}>
      <input name='username' value={username} onChange={onChange} type='text' placeholder='Username' />
      <input name='email' value={email} onChange={onChange} type='text' placeholder='Email Address' />
      <input name='passwordOne' value={passwordOne} onChange={onChange} type='password' placeholder='Password' />
      <input name='passwordTwo' value={passwordTwo} onChange={onChange} type='password' placeholder='Confirm Password' />
      <button disabled={isInvalid} type='submit'>
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignUpForm;
