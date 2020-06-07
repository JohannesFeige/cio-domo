import React from 'react';
import { withAuthorization } from '../session';

const Home: React.FC = () => (
  <div>
    <h1>Home</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = (authUser: firebase.User | null) => !!authUser;

export default withAuthorization(condition)(Home);
