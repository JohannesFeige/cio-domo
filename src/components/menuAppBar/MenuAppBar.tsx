import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Button, IconButton, Toolbar, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import SignOutMenuItem from '../signOut';

import { logo } from '../../assets';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthContext } from '../session';
import { User } from '../firebase/models';

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
  },
  toolbar: {
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  logo: {
    height: '48px',
  },
  mainNavigationWrapper: {
    flex: 1,
    display: 'flex',
  },
}));

const MenuAppBar: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {authUser ? <MenuAppBarAuth user={authUser} classes={classes} /> : <MenuAppBarNonAuth classes={classes} />}
      </Toolbar>
    </AppBar>
  );
};

const NavigationItem: React.FC<{ to: string; text: string }> = ({ to, text }) => (
  <Button color="inherit" disableElevation component={Link} to={to} size="large">
    {text}
  </Button>
);

const NavigationImageItem: React.FC<{ to: string; src: string; imageClass: string; alt: string }> = ({ to, src, imageClass, alt }) => (
  <Button color="inherit" disableElevation component={Link} to={to}>
    <img className={imageClass} src={src} alt={alt} />
  </Button>
);

const MenuAppBarAuth: React.FC<{ user: User; classes: Record<'mainNavigationWrapper' | 'logo', string> }> = ({ user, classes }) => {
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
      <div className={classes.mainNavigationWrapper}>
        <NavigationImageItem to={ROUTES.LANDING} imageClass={classes.logo} src={logo} alt="Logo" />
        <NavigationItem to={ROUTES.HOME} text="Home" />
        <NavigationItem to={ROUTES.FOOD} text="Food" />
      </div>
      <IconButton color="inherit" onClick={handleAppBarMenuOpen} aria-controls="menu-appbar">
        <MoreVert />
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

const MenuAppBarNonAuth: React.FC<{ classes: Record<'logo', string> }> = ({ classes }) => {
  return (
    <div style={{ flex: 1 }}>
      <NavigationImageItem to={ROUTES.LANDING} imageClass={classes.logo} src={logo} alt="Logo" />
      <NavigationItem to={ROUTES.SIGN_IN} text="Sign In" />
    </div>
  );
};

export default MenuAppBar;
