import { IconButton, makeStyles, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  toolbarTitle: {
    flex: '1 1 100%',
  },
}));

const GroceryCategoryListToolbar: React.FC<{ onAddClick: () => void }> = ({ onAddClick }) => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography variant="h6" className={classes.toolbarTitle}>
        Categories
      </Typography>
      <Tooltip title="Add">
        <IconButton onClick={onAddClick}>
          <AddCircle color="primary" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default GroceryCategoryListToolbar;
