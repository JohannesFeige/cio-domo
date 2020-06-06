import React from 'react';
import FirebaseContext from './context';
import Firebase from './firebase';

const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FirebaseContext.Provider value={new Firebase()}>{children}</FirebaseContext.Provider>
);

export default FirebaseProvider;
