import { XPalette } from '../../../types/material-ui';

type Grocery = {
  uid: string;
  name: string;
  amount: string;
  category: keyof XPalette | 'undefined';
};

export default Grocery;
