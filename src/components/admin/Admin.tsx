import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { User } from '../firebase/models';
import { withAuthorization } from '../session';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { UserItem, UserList } from '.';
import { Container, makeStyles, Typography } from '@material-ui/core';
import GroceryCategoryList from './GroceryCategoryList';

const styles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },

  childWrapper: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(1),
    },
  },
}));

const Admin: React.FC = () => {
  const classes = styles();

  const landing = () => (
    <React.Fragment>
      <div className={classes.childWrapper}>
        <UserList />
      </div>
      <div className={classes.childWrapper}>
        <GroceryCategoryList />
      </div>
    </React.Fragment>
  );

  return (
    <Container className={classes.root}>
      <Typography variant="h4">Admin</Typography>
      <p>The Admin Page is accessible by every signed in admin user.</p>

      <Switch>
        <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN} component={landing} />
      </Switch>
    </Container>
  );
};

const condition = (user: User | null) => !!user && !!user.roles[ROLES.ADMIN];

export default withAuthorization(condition)(Admin);
