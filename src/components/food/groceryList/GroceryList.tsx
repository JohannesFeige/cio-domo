import React, { useState, useContext, useEffect } from 'react';

import { FirebaseContext } from '../../firebase';
import Grocery from '../../firebase/models/grocery';
import NewGrocery from './NewGrocery';

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

  const { loading, groceries } = state;
  return (
    <div>
      <span>Grocery List</span>
      {loading && <div>Loading...</div>}
      <NewGrocery />
      <ul>
        {groceries.map((grocery) => (
          <li key={grocery.uid}>
            <span>{grocery.name}</span>
            <span>{grocery.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
