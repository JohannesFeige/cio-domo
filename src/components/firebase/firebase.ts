import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const REFS = {
  users: 'users',
};

class Firebase {
  auth: firebase.auth.Auth;
  googleProvider: firebase.auth.GoogleAuthProvider;

  private db: firebase.database.Database;

  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.database();

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);

  doSendEmailVerification = () =>
    this.auth.currentUser?.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT as string,
    });

  doSignInWithEmailAndPassword = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  doSignInwithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => this.auth.currentUser?.updatePassword(password);

  getEmailCredential = (email: string, password: string) => firebase.auth.EmailAuthProvider.credential(email, password);

  // *** User API ***

  user = (uid: string) => this.db.ref(`${REFS.users}/${uid}`);

  users = () => this.db.ref(REFS.users);
}

export default Firebase;
