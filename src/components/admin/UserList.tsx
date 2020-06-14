import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../firebase/models';
import { FirebaseContext } from '../firebase';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const UserList: React.FC = () => {
  const [state, setState] = useState({ loading: false, users: [] as User[] });
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setState({ ...state, loading: true });
    firebase?.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(
        (key) =>
          ({
            ...usersObject[key],
            uid: key,
          } as User)
      );

      setState({
        ...state,
        users: usersList,
        loading: false,
      });
    });

    return () => {
      firebase?.users().off();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAdminClickHandler = (uid: string) => {
    const acc: { [index: string]: string } = {};
    const roles = [ROLES.ADMIN].reduce((obj, key) => {
      obj[key] = key;
      return obj;
    }, acc);
    firebase?.authentication(uid).set({ roles });
  };

  const { users, loading } = state;
  return (
    <div>
      <h2>Users</h2>
      {loading && <div>Loading...</div>}
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
            <button onClick={() => setAdminClickHandler(user.uid)}>Admin</button>
            <span>
              <Link to={{ pathname: `${ROUTES.ADMIN}/${user.uid}`, state: { user } }}>Details</Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
