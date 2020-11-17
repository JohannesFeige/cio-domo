import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import { Grocery } from '../../firebase/models';

import { IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flex: 1,
  },
}));

const NewGrocery: React.FC = () => {
  const [grocery, setGrocery] = useState(null as Partial<Grocery> | null);
  const [rawValue, setRawValue] = useState('');
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();

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
    <Paper className={classes.root} component="form" onSubmit={handleAddGrocerySubmit} elevation={1}>
      <InputBase
        className={classes.input}
        placeholder="Grocery : Amount"
        fullWidth={true}
        onChange={handleNewGroceryChange}
        value={rawValue}
      />
      {rawValue && (
        <IconButton type="submit" color="primary">
          <CheckBox />
        </IconButton>
      )}
    </Paper>
  );
};

export default NewGrocery;
