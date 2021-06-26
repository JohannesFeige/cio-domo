import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext<Firebase>(null as unknown as Firebase);

export default FirebaseContext;
