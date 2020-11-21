import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import User from './models/user';
import DbUser from './models/dbUser';

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
  USERS: 'users',
  AUTHENTICATIONS: 'authentications',
  GROCERY_CATEGORIES: 'groceryCategogies',
  GROCERIES: 'groceries',
};

class Firebase {
  private auth: firebase.auth.Auth;
  private db: firebase.database.Database;

  googleProvider: firebase.auth.GoogleAuthProvider;
  currentUser: firebase.User | null;

  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
    this.db = firebase.database();

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.currentUser = firebase.auth().currentUser;
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

  fetchSignInMethodsForEmail = (email: string) => this.auth.fetchSignInMethodsForEmail(email);

  // *** User API ***
  user = (uid: string) => this.db.ref(`${REFS.USERS}/${uid}`);

  users = () => this.db.ref(REFS.USERS);

  // *** Authentication API ***
  authentication = (uid: string) => this.db.ref(`${REFS.AUTHENTICATIONS}/${uid}`);

  authentications = () => this.db.ref(REFS.AUTHENTICATIONS);

  // *** Merge Authentication and DB User API ***

  onAuthListener = (next: (user: User) => void, fallback: () => void) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const userPromise = this.user(authUser.uid).once('value');
        const authenticationPromise = this.authentication(authUser.uid)
          .once('value')
          .catch((error) => {
            console.log(error);
            return null;
          });
        Promise.all([userPromise, authenticationPromise]).then(([userSnapshot, authenticationSnapshot]) => {
          const dbUser = userSnapshot?.val() as DbUser;
          const authentication = authenticationSnapshot?.val();

          const user: User = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            roles: authentication?.roles || [],
            ...dbUser,
          };

          next(user);
        });
      } else {
        fallback();
      }
    });

  /// *** GroceryList API ***

  groceryCategories = () => this.db.ref(REFS.GROCERY_CATEGORIES);

  groceryList = () => this.db.ref(REFS.GROCERIES);
}

export default Firebase;
