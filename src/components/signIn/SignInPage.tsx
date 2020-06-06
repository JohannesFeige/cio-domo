import React from 'react';

import { SignUpLink } from '../signUp';
import { SignInForm } from '.';
import { PasswordForgetLink } from '../passwordForget';

const SignInPage: React.FC = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default SignInPage;
