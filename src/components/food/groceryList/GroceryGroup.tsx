import React, { useContext } from 'react';
import { XTheme } from '../../../types/material-ui';
import { createCategoryClasses } from '../../../shared/theme';
import { Grocery } from '../../firebase/models';

import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { FirebaseContext } from '../../firebase';

const useStyles = makeStyles((theme: XTheme) => ({
  ...createCategoryClasses(theme),
  group: {
    width: theme.spacing(1),
    height: '100%',
    position: 'absolute',
    left: 0,
  },
  listItemText: {
    display: 'flex',
    alignItems: 'center',
    '& > *:first-child': {
      flex: '0 0 66%',
    },
  },
}));

const GroceryGroup: React.FC<{ group: Grocery[] }> = ({ group }) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const getCategoryClass = (category: Grocery['category']) => {
    const { [`category-${category}`]: className } = classes as Record<string, string>;
    return className;
  };

  const handleGroceryDelete = (uid: string) => {
    firebase.groceryList().child(uid).remove();
  };

  const renderGroup = (group: Grocery[]) => {
    return group.map((grocery) => {
      return (
        <ListItem key={grocery.uid} divider>
          <div className={`${classes.group} ${getCategoryClass(grocery.category)}`}></div>
          <ListItemText className={classes.listItemText} primary={grocery.name} secondary={grocery.amount} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => handleGroceryDelete(grocery.uid)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return <React.Fragment>{renderGroup(group)}</React.Fragment>;
};

export default GroceryGroup;
