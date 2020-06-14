import React, { useState, useContext, useEffect } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { User } from '../firebase/models';
import { FirebaseContext } from '../firebase';

const UserItem: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const location = useLocation<{ user: User }>();
  const [state, setState] = useState({ loading: false, user: null as User | null, ...location.state });
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (state.user) {
      return;
    }

    setState({ ...state, loading: true });

    firebase?.user(match.params.id).on('value', (snapshot) => {
      setState({ user: snapshot.val(), loading: false });
    });
    return () => {
      firebase?.user(match.params.id).off();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendPasswordResetClickHandler = () => {
    if (state.user?.email) {
      firebase?.doPasswordReset(state.user.email);
    }
  };

  const { user, loading } = state;

  return (
    <div>
      <h2>User ({match.params.id})</h2>
      {loading && <div>Loading ...</div>}

      {user && (
        <div>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
          <span>
            <button type="button" onClick={sendPasswordResetClickHandler}>
              Send Password Reset
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default UserItem;
