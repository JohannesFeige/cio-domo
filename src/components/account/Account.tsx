import React from 'react';
import { PasswordForgetForm } from '../passwordForget';
import PasswordChangeForm from '../passwordChange';

const Account: React.FC = () => (
  <div>
    <h1>Account</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

export default Account;
