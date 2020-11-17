import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import { Grocery } from '../../firebase/models';

import { TextField } from '@material-ui/core';

const NewGrocery: React.FC = () => {
  const [grocery, setGrocery] = useState(null as Partial<Grocery> | null);
  const [rawValue, setRawValue] = useState('');
  const firebase = useContext(FirebaseContext);

  const handleAddGrocerySubmit = (event: React.FormEvent) => {
    event.preventDefault();

    firebase
      .groceryList()
      .push(grocery)
      .then(() => {
        setGrocery(null);
        setRawValue('');
      });
  };

  const handleNewGroceryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setRawValue(value);
    const [name, ...amounts] = value.split(':');

    const getDummyCategories = (name: string) => {
      if (['Apfel', 'Birne', 'Melone'].indexOf(name) > -1) {
        return 'green';
      }

      if (['Mehl', 'Zucker'].indexOf(name) > -1) {
        return 'orange';
      }

      if (['Marmelade'].indexOf(name) > -1) {
        return 'cyan';
      }

      return 'undefined';
    };

    const newGrocery: Partial<Grocery> = {
      name,
      amount: amounts.length ? amounts.map((amount) => amount.trim()).join('') : undefined,
      category: getDummyCategories(name),
    };

    if (newGrocery.amount === undefined) {
      delete newGrocery.amount;
    }

    setGrocery(newGrocery);
  };

  return (
    <form onSubmit={handleAddGrocerySubmit} noValidate>
      <TextField id="new-grocery" label="Grocery : Amount" fullWidth={true} onChange={handleNewGroceryChange} value={rawValue} />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewGrocery;
