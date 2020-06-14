import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { User } from '../firebase/models';
import { withAuthorization } from '../session';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { UserItem, UserList } from '.';

const Admin: React.FC = () => {
  return (
    <div>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by evry signed in admin user.</p>

      <Switch>
        <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN} component={UserList} />
      </Switch>
    </div>
  );
};

const condition = (user: User | null) => !!user && !!user.roles[ROLES.ADMIN];

export default withAuthorization(condition)(Admin);
