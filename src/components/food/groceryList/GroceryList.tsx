import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../firebase';
import { Grocery } from '../../firebase/models';

import NewGrocery from './NewGrocery';
import GroceryGroup from './GroceryGroup';
import { List, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listWrapper: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: '#fff',
    opacity: 0.8,
    top: theme.spacing(0.5),
    left: 0,
    zIndex: 10,
  },
}));

const GroceryList: React.FC = () => {
  const [state, setState] = useState({ loading: false, groceries: [] as Grocery[][] });
  const [showOverlay, setShowOverlay] = useState(false);
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();

  useEffect(() => {
    setState({ ...state, loading: true });
    firebase.groceryList().on('value', (snapshot) => {
      const groceryListObject = snapshot.val();
      const groceryList = groceryListObject
        ? Object.keys(groceryListObject).map(
            (key) =>
              ({
                ...groceryListObject[key],
                uid: key,
              } as Grocery)
          )
        : [];

      const groupedGroceries = groceryList.reduce((acc, value) => {
        const category = value.category || 'undefined';
        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(value);

        return acc;
      }, {} as { [index: string]: Grocery[] });

      setState({
        ...state,
        groceries: Object.values(groupedGroceries),
        loading: false,
      });
    });

    return () => {
      firebase.groceryList().off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePopupChange = (open: boolean) => {
    setShowOverlay(open);
  };

  const { loading, groceries } = state;
  return (
    <div>
      <span>Grocery List</span>
      {loading && <div>Loading...</div>}
      <NewGrocery onPopupChange={handlePopupChange} />
      <div className={classes.listWrapper}>
        {showOverlay && <div className={classes.overlay}></div>}
        <List>
          {groceries.map((groceryGroup, index) => (
            <GroceryGroup key={index} group={groceryGroup} />
          ))}
        </List>
      </div>
    </div>
  );
};

export default GroceryList;
