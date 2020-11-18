import React, { useState, useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';
import { Grocery } from '../../firebase/models';

import { IconButton, InputBase, makeStyles, Paper, Popper } from '@material-ui/core';
import { CheckBox, CheckRounded } from '@material-ui/icons';
import { XPalette, XTheme } from '../../../types/material-ui';
import { createCategoryClasses } from '../../../shared/theme';

const useStyles = makeStyles((theme: XTheme) => ({
  ...createCategoryClasses(theme),
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
  popper: {
    marginTop: theme.spacing(2),
    zIndex: 20,
  },
  poppperContent: {
    marginLeft: 'auto',
    marginRight: 'auto',
    // background: theme.palette.grey[400],
    maxWidth: theme.spacing(4 * 10),
    display: 'flex',
    flexWrap: 'wrap',
  },
  category: {
    margin: theme.spacing(0.5),
    height: theme.spacing(9),
    width: theme.spacing(9),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#fff',
  },
}));

const NewGrocery: React.FC<{ onPopupChange: (open: boolean) => void }> = ({ onPopupChange }) => {
  const [grocery, setGrocery] = useState(null as Partial<Grocery> | null);
  const [rawValue, setRawValue] = useState('');
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<keyof XPalette | null>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleAddGrocerySubmit = (event: React.FormEvent) => {
    event.preventDefault();

    firebase
      .groceryList()
      .push(grocery)
      .then(() => {
        setGrocery(null);
        setRawValue('');
        setSelectedCategory(null);
        closePopup();
      });
  };

  const handleNewGroceryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setRawValue(value);
    const [name, ...amounts] = value.split(':');

    const newGrocery: Partial<Grocery> = {
      name,
      amount: amounts.length ? amounts.map((amount) => amount.trim()).join('') : undefined,
      category: 'undefined',
    };

    if (newGrocery.amount === undefined) {
      delete newGrocery.amount;
    }

    setGrocery(newGrocery);
  };

  const closePopup = () => {
    setAnchorEl(null);
    onPopupChange(false);
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
    onPopupChange(true);
  };

  const handleInputBlur = () => {
    // closePopup();
  };

  const open = Boolean(anchorEl);

  const categories: Record<string, { order: number }> = {
    cyan: { order: 0 },
    green: { order: 0 },
    pink: { order: 0 },
    orange: { order: 0 },
    red: { order: 0 },
    violet: { order: 0 },
    blue: { order: 0 },
    gray: { order: 0 },
  };

  const getCategoryClass = (category: keyof XPalette) => {
    const { [`category-${category}`]: className } = classes as Record<string, string>;
    return className;
  };

  const toggleSelectedCategory = (category: keyof XPalette) => {
    let tempSelected: keyof XPalette | null = null;

    if (selectedCategory !== category) {
      tempSelected = category;
    }

    setSelectedCategory(tempSelected);
    setGrocery({ ...grocery, category: tempSelected as keyof XPalette });

    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
  };

  return (
    <React.Fragment>
      <Paper className={classes.root} component="form" onSubmit={handleAddGrocerySubmit} elevation={1}>
        <InputBase
          className={classes.input}
          placeholder="Grocery : Amount"
          fullWidth={true}
          value={rawValue}
          inputRef={inputElement}
          onChange={handleNewGroceryChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {rawValue && (
          <IconButton type="submit" color="primary">
            <CheckBox />
          </IconButton>
        )}
      </Paper>
      <Popper className={classes.popper} open={open} anchorEl={anchorEl}>
        <div className={classes.poppperContent}>
          {Object.keys(categories).map((category) => (
            <Paper
              key={category}
              elevation={3}
              className={`${classes.category} ${getCategoryClass(category as keyof XPalette)}`}
              onClick={() => toggleSelectedCategory(category as keyof XPalette)}
            >
              {selectedCategory === category && <CheckRounded className={classes.check} fontSize="large" />}
            </Paper>
          ))}
        </div>
      </Popper>
    </React.Fragment>
  );
};

export default NewGrocery;
