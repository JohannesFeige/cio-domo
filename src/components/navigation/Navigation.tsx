import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../signOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthContext } from '../session';
import { User } from '../firebase/models';

const Navigation: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  return <div>{authUser ? <NavigationAuth user={authUser} /> : <NavigationNonAuth />}</div>;
};

type NavigationAuthPros = {
  user: User;
};
const NavigationAuth: React.FC<NavigationAuthPros> = ({ user }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {!!user.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth: React.FC = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
