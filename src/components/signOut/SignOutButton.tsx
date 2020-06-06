import React, { useContext } from 'react';

import { FirebaseContext } from '../firebase';

import * as MESSAGES from '../../constants/messages';

const SignOutButton: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const clickHandler = () => {
    if (!firebase) {
      console.error(MESSAGES.MISSING_FIREBASE_CONTEXT);
      return;
    }

    firebase.doSignOut();
  };

  return (
    <button type="button" onClick={clickHandler}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
