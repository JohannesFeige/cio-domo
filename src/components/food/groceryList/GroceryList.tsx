import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../firebase';
import { Grocery } from '../../firebase/models';

import NewGrocery from './NewGrocery';
import GroceryGroup from './GroceryGroup';
import { List } from '@material-ui/core';

const GroceryList: React.FC = () => {
  const [state, setState] = useState({ loading: false, groceries: [] as Grocery[][] });
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setState({ ...state, loading: true });
    firebase.groceryList().on('value', (snapshot) => {
      const groceryListObject = snapshot.val();
      const groceryList = groceryListObject
        ? Object.keys(groceryListObject).map(
            (key) =>
              ({
                ...groceryListObject[key],
                category: groceryListObject[key].category == null ? 'undefined' : groceryListObject[key].category,
                uid: key,
              } as Grocery)
          )
        : [];

      const groupedGroceries = groceryList.reduce((acc, value) => {
        if (!acc[value.category]) {
          acc[value.category] = [];
        }

        acc[value.category].push(value);

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

  const { loading, groceries } = state;
  return (
    <div>
      <span>Grocery List</span>
      {loading && <div>Loading...</div>}
      <NewGrocery />
      <List>
        {groceries.map((groceryGroup, index) => (
          <GroceryGroup key={index} group={groceryGroup} />
        ))}
      </List>
    </div>
  );
};

export default GroceryList;
