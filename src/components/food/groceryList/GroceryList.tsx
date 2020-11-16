import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../firebase';
import { Grocery } from '../../firebase/models';

import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import NewGrocery from './NewGrocery';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    display: 'flex',
    alignItems: 'center',
    '& > *:first-child': {
      flex: '0 0 66%',
    },
  },
}));

const GroceryList: React.FC = () => {
  const [state, setState] = useState({ loading: false, groceries: [] as Grocery[] });
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setState({ ...state, loading: true });
    firebase.groceryList().on('value', (snapshot) => {
      const groceriesObject = snapshot.val();
      const groceryList = groceriesObject
        ? Object.keys(groceriesObject).map(
            (key) =>
              ({
                ...groceriesObject[key],
                uid: key,
              } as Grocery)
          )
        : [];

      setState({
        ...state,
        groceries: groceryList,
        loading: false,
      });
    });

    return () => {
      firebase.groceryList().off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGroceryDelete = (uid: string) => {
    firebase.groceryList().child(uid).remove();
  };

  const classes = useStyles();

  const { loading, groceries } = state;
  return (
    <div>
      <span>Grocery List</span>
      {loading && <div>Loading...</div>}
      <NewGrocery />
      <List>
        {groceries.map((grocery) => (
          <React.Fragment key={grocery.uid}>
            <ListItem key={grocery.uid} divider>
              <ListItemText className={classes.listItemText} primary={grocery.name} secondary={grocery.amount} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleGroceryDelete(grocery.uid)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default GroceryList;
