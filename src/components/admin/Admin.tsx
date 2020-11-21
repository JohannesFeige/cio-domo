import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { User } from '../firebase/models';
import { withAuthorization } from '../session';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { UserItem, UserList } from '.';
import { Container, makeStyles, Typography } from '@material-ui/core';
import Categories from './Categories';

const styles = makeStyles((theme) => ({
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
        <Categories />
      </div>
    </React.Fragment>
  );

  return (
    <Container>
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
