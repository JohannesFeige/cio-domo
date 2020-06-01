import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../navigation/Navigation';
import Landing from '../landing/Landing';
import SignUp from '../singUp/SignUp';
import SignIn from '../signIn/SignIn';
import PasswordForget from '../passwordForget/PasswordForget';
import Home from '../home/home';
import Account from '../account/Account';
import Admin from '../admin/Admin';

import * as ROUTES from '../../constants/routes';

const App: React.FC = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
      <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.ACCOUNT} component={Account} />
      <Route exact path={ROUTES.ADMIN} component={Admin} />
    </div>
  </Router>
);

export default App;
