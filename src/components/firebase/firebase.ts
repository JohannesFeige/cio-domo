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
  private auth: firebase.auth.Auth;
  private db: firebase.database.Database;

  onAuthStateChange: (
    nextOrObserver: firebase.Observer<any> | ((a: firebase.User | null) => any),
    error?: (a: firebase.auth.Error) => any,
    completed?: firebase.Unsubscribe
  ) => firebase.Unsubscribe;

  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.database();

    this.onAuthStateChange = this.auth.onAuthStateChanged.bind(this.auth);
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => this.auth.currentUser?.updatePassword(password);

  // *** User API ***

  user = (uid: string) => this.db.ref(`${REFS.users}/${uid}`);

  users = () => this.db.ref(REFS.users);
}

export default Firebase;
