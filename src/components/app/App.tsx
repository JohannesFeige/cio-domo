import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Navigation } from '../navigation';
import { Landing } from '../landing';
import { SignUpPage } from '../signUp';
import { SignInPage } from '../signIn';
import { PasswordForgetPage } from '../passwordForget';
import { Home } from '../home';
import { Account } from '../account';
import { Admin } from '../admin';

import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../firebase';
import { AuthContext } from '../session';

const App: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const authentication = useContext(AuthContext);
  useEffect(() => {
    const listener = firebase?.onAuthStateChange((authUser) => {
      authUser ? authentication.setAuthStatus(authUser) : authentication.setUnauthStatus();
    });
    return () => listener?.();
  });

  return (
    <Router>
      <div>
        <Navigation />
        <hr />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.ACCOUNT} component={Account} />
        <Route exact path={ROUTES.ADMIN} component={Admin} />
      </div>
    </Router>
  );
};

export default App;
