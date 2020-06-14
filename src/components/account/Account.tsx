import React, { useContext } from 'react';

import { PasswordForgetForm } from '../passwordForget';
import { PasswordChangeForm } from '../passwordChange';

import { AuthContext, withAuthorization } from '../session';
import LoginManagement from './LoginManagement';
import { User } from '../firebase/models';

const Account: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div>
      <h1>Account: {authUser?.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
      <LoginManagement authUser={authUser} />
    </div>
  );
};

const condition = (user: User | null) => !!user;

export default withAuthorization(condition)(Account);
