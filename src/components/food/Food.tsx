import React, { Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { withAuthorization, withEmailVerification } from '../session';
import { User } from '../firebase/models';

import { GroceryList } from './groceryList';

import * as ROUTES from '../../constants/routes';

const Food: React.FC = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path={ROUTES.FOOD_GROCERIES} component={GroceryList} />
      </Switch>
      <Redirect exact path={ROUTES.FOOD} to={ROUTES.FOOD_GROCERIES} />
    </Fragment>
  );
};

const condition = (user: User | null) => !!user;

const wrappedAuthorization = withAuthorization(condition)(Food);
const wrapperEmailVerification = withEmailVerification(wrappedAuthorization);

export default wrapperEmailVerification;
