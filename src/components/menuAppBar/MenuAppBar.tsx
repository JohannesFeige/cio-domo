import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Button, IconButton, Toolbar, makeStyles, Menu, MenuItem } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import SignOutMenuItem from '../signOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthContext } from '../session';
import { User } from '../firebase/models';

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
  },
}));

const MenuAppBar: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>{authUser ? <MenuAppBarAuth user={authUser} /> : <MenuAppBarNonAuth />}</Toolbar>
    </AppBar>
  );
};

type NavigationItemProps = {
  to: string;
  text: string;
};
const NavigationItem: React.FC<NavigationItemProps> = ({ to, text }) => (
  <Button color="inherit" disableElevation component={Link} to={to}>
    {text}
  </Button>
);

type MenuAppBarAuthPros = {
  user: User;
};
const MenuAppBarAuth: React.FC<MenuAppBarAuthPros> = ({ user }) => {
  const [appBarMenuEl, setAppBarMenuEl] = useState<null | HTMLElement>(null);

  const isAppBarMenuOpen = Boolean(appBarMenuEl);

  const handleAppBarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAppBarMenuEl(event.currentTarget);
  };

  const handleAppBarMenuClose = () => {
    setAppBarMenuEl(null);
  };

  return (
    <React.Fragment>
      <div style={{ flex: 1 }}>
        <NavigationItem to={ROUTES.LANDING} text="Landing" />
        <NavigationItem to={ROUTES.HOME} text="Home" />
      </div>
      <IconButton color="inherit" onClick={handleAppBarMenuOpen} aria-controls="menu-appbar">
        <MoreVertIcon />
      </IconButton>
      <Menu id="menu-appbar" anchorEl={appBarMenuEl} open={isAppBarMenuOpen} onClose={handleAppBarMenuClose} keepMounted>
        <MenuItem onClick={handleAppBarMenuClose} component={Link} to={ROUTES.ACCOUNT}>
          Account
        </MenuItem>
        {!!user.roles[ROLES.ADMIN] && (
          <MenuItem onClick={handleAppBarMenuClose} component={Link} to={ROUTES.ADMIN}>
            Admin
          </MenuItem>
        )}
        <SignOutMenuItem />
      </Menu>
    </React.Fragment>
  );
};

const MenuAppBarNonAuth: React.FC = () => (
  <div style={{ flex: 1 }}>
    <NavigationItem to={ROUTES.LANDING} text="Landing" />
    <NavigationItem to={ROUTES.SIGN_IN} text="Sign In" />
  </div>
);

export default MenuAppBar;
