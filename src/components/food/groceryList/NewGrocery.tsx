import React, { useState, useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';
import { Grocery } from '../../firebase/models';

import { ClickAwayListener, IconButton, InputBase, Paper, Popper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
  categoryWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<keyof XPalette | null>(null);
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();
  const inputElement = useRef<HTMLInputElement>(null);
  const paperElement = useRef<HTMLDivElement>(null);

  const handleAddGrocerySubmit = (event: React.FormEvent) => {
    event.preventDefault();

    firebase
      .groceryList()
      .push(grocery)
      .then(() => {
        setGrocery(null);
        setRawValue('');
        setSelectedCategory(null);
        closePopper();
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

  const closePopper = () => {
    setAnchorEl(null);
    onPopupChange(false);
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(paperElement.current);
    onPopupChange(true);
  };

  const handleClickAway = (event: React.MouseEvent<Document, MouseEvent>) => {
    closePopper();
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
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Paper className={classes.root} component="form" onSubmit={handleAddGrocerySubmit} elevation={1} ref={paperElement}>
          <InputBase
            className={classes.input}
            placeholder="Grocery : Amount"
            fullWidth={true}
            value={rawValue}
            inputRef={inputElement}
            onChange={handleNewGroceryChange}
            onFocus={handleInputFocus}
          />
          {rawValue && (
            <IconButton type="submit" color="primary">
              <CheckBox />
            </IconButton>
          )}
        </Paper>
        <Popper className={classes.popper} open={open} anchorEl={anchorEl}>
          <div>
            <div className={classes.categoryWrapper}>
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
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default NewGrocery;
