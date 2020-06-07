import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import { User } from '../firebase/models';

const Admin: React.FC = () => {
  const [state, setState] = useState({ loading: false, users: [] as User[] });
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setState({ ...state, loading: true });
    firebase?.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({ ...usersObject[key], uid: key }));

      setState((prevState) => ({ ...prevState, users: usersList, loading: false }));
    });

    return () => {
      firebase?.users().off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { users, loading } = state;

  return (
    <div>
      <h1> Admin</h1>

      {loading && <div>Loading...</div>}
      <UserList users={users} />
    </div>
  );
};

const UserList: React.FC<{ users: User[] }> = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default Admin;
