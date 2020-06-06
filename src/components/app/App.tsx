import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../navigation';
import Landing from '../landing';
import SignUpPage from '../signUp';
import SignIn from '../signIn';
import PasswordForget from '../passwordForget';
import Home from '../home';
import Account from '../account';
import Admin from '../admin';

import * as ROUTES from '../../constants/routes';

const App: React.FC = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.ACCOUNT} component={Account} />
      <Route exact path={ROUTES.ADMIN} component={Admin} />
    </div>
  </Router>
);

export default App;
