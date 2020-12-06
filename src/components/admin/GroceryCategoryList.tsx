import {
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../firebase';
import { GroceryCategorie } from '../firebase/models';

const useStyles = makeStyles((theme) => ({
  categoryMarker: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
  toolbarTitle: {
    flex: '1 1 100%',
  },
}));

const GroceryCategoryList: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState({ loading: false, groceryCategories: [] as GroceryCategorie[] });
  const classes = useStyles();

  useEffect(() => {
    setState({ ...state, loading: true });
    firebase?.groceryCategories().on('value', (snapshot) => {
      const categoriesObject = snapshot.val();
      const categoryList = Object.keys(categoriesObject).map(
        (key) =>
          ({
            ...categoriesObject[key],
            uid: key,
          } as GroceryCategorie)
      );

      setState({
        ...state,
        groceryCategories: categoryList,
        loading: false,
      });
    });

    return () => {
      firebase?.groceryCategories().off();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = () => {
    const newCategorie: Partial<GroceryCategorie> = {
      order: 1,
      name: 'cyan',
      hex: '#26B0C7',
      description: 'Tiefkühl',
    };

    firebase?.groceryCategories().push(newCategorie);
  };

  const { loading, groceryCategories } = state;

  return (
    <div>
      {loading && <div>Loading...</div>}
      <button onClick={add}>Add</button>
      <InputBase type="color" style={{ width: '80px' }} />
      <Paper>
        <Toolbar>
          <Typography variant="h6" className={classes.toolbarTitle}>
            Categories
          </Typography>
          <Tooltip title="Add">
            <IconButton>
              <AddCircle color="primary" />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Hex</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groceryCategories.map((category) => (
                <TableRow key={category.uid}>
                  <TableCell>
                    <Paper className={classes.categoryMarker} style={{ background: category.hex }} />
                  </TableCell>
                  <TableCell>{category.order}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.hex}</TableCell>
                  <TableCell>{category.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default GroceryCategoryList;
