import Categories from '../../../constants/groceryCategories';

type Grocery = {
  uid: string;
  name: string;
  amount: string;
  category: keyof typeof Categories | 'undefined';
};

export default Grocery;
