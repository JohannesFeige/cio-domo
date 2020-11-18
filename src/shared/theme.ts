import { createMuiTheme } from '@material-ui/core/styles';
import { XTheme } from '../types/material-ui';

export const createXTheme = (): XTheme => {
  const baseTheme = createMuiTheme();
  const theme: XTheme = {
    ...baseTheme,
    custom: {
      palette: {
        cyan: '#26B0C7',
        green: '#75B35A',
        pink: '#FF5699',
        orange: '#E57542',
        red: '#BA2E38',
        violet: '#864F9E',
        blue: '#524DCF',
        gray: '#b4bec6',
      },
    },
  };

  return theme;
};

export const createCategoryClasses = (theme: XTheme) => ({
  'category-cyan': {
    backgroundColor: theme.custom.palette.cyan,
  },
  'category-green': {
    backgroundColor: theme.custom.palette.green,
  },
  'category-pink': {
    backgroundColor: theme.custom.palette.pink,
  },
  'category-orange': {
    backgroundColor: theme.custom.palette.orange,
  },
  'category-red': {
    backgroundColor: theme.custom.palette.red,
  },
  'category-violet': {
    backgroundColor: theme.custom.palette.violet,
  },
  'category-blue': {
    backgroundColor: theme.custom.palette.blue,
  },
  'category-gray': {
    backgroundColor: theme.custom.palette.gray,
  },
});
