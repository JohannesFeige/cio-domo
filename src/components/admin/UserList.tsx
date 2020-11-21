import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

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
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      {loading && <div>Loading...</div>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>E-Mail</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <button onClick={() => setAdminClickHandler(user.uid)}>Admin</button>
                </TableCell>
                <TableCell>
                  <Link to={{ pathname: `${ROUTES.ADMIN}/${user.uid}`, state: { user } }}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
