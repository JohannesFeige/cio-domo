import React from 'react';
import { SignUpLink } from '../signUp';
import { SignInForm } from '.';

const SignInPage: React.FC = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

export default SignInPage;
