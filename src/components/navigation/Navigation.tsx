import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Button, Toolbar, makeStyles } from '@material-ui/core';

import SignOutButton from '../signOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthContext } from '../session';
import { User } from '../firebase/models';

import styles from './Navigation.module.scss';

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
  },
}));

const Navigation: React.FC = () => {
  const { authUser } = useContext(AuthContext);

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>{authUser ? <NavigationAuth user={authUser} /> : <NavigationNonAuth />}</Toolbar>
    </AppBar>
  );
};

// const ResponsiveNavigation: React.FC = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   function handleDrawerToggle() {
//     setMobileOpen(!mobileOpen);
//   }
// };

type NavigationItem = {
  to: string;
  text: string;
};
const NavigationItem: React.FC<NavigationItem> = ({ to, text }) => (
  <Button variant="contained" color="primary" disableElevation>
    <Link className={styles.NavigationItem} to={to}>
      {text}
    </Link>
  </Button>
);

type NavigationAuthPros = {
  user: User;
};
const NavigationAuth: React.FC<NavigationAuthPros> = ({ user }) => (
  <React.Fragment>
    <div style={{ flex: 1 }}>
      <NavigationItem to={ROUTES.LANDING} text="Landing" />
      <NavigationItem to={ROUTES.HOME} text="Home" />
      <NavigationItem to={ROUTES.ACCOUNT} text="Account" />

      {!!user.roles[ROLES.ADMIN] && <NavigationItem to={ROUTES.ADMIN} text="Admin" />}
    </div>
    <SignOutButton />
  </React.Fragment>
);

const NavigationNonAuth: React.FC = () => (
  <div style={{ flex: 1 }}>
    <NavigationItem to={ROUTES.LANDING} text="Landing" />
    <NavigationItem to={ROUTES.SIGN_IN} text="Sign In" />
  </div>
);

export default Navigation;
