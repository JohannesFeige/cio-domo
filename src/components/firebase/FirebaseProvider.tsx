import React from 'react';
import { Firebase, FirebaseContext } from '.';

const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FirebaseContext.Provider value={new Firebase()}>{children}</FirebaseContext.Provider>
);

export default FirebaseProvider;
