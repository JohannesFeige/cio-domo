import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';

import { MenuAppBar } from '../menuAppBar';
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
    const listener = firebase?.onAuthListener(
      (user) => {
        authentication.setAuthStatus(user);
      },
      () => authentication.setUnauthStatus()
    );
    return () => listener?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <CssBaseline />
      <MenuAppBar />
      <Container>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.ADMIN} component={Admin} />
      </Container>
    </Router>
  );
};

export default App;
