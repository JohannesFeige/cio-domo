import React, { useContext } from 'react';

import { PasswordForgetForm } from '../passwordForget';
import PasswordChangeForm from '../passwordChange';

import AuthContext, { withAuthorization } from '../session';

const Account: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div>
      <h1>Account: {authUser?.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
};

const condition = (authUser: firebase.User | null) => !!authUser;

export default withAuthorization(condition)(Account);
