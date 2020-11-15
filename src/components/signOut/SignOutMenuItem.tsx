import React, { useContext } from 'react';
import { MenuItem } from '@material-ui/core';

import { FirebaseContext } from '../firebase';

import * as MESSAGES from '../../constants/messages';

const SignOutMenuItem: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const handleClick = () => {
    if (!firebase) {
      console.error(MESSAGES.MISSING_FIREBASE_CONTEXT);
      return;
    }

    firebase.doSignOut();
  };

  return <MenuItem onClick={handleClick}>Sign Out</MenuItem>;
};

export default SignOutMenuItem;
