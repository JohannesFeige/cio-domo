import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface XTheme extends Theme {
  custom: {
    palette: XPalette;
  };
}

interface XPalette {
  cyan: string;
  green: string;
  pink: string;
  orange: string;
  red: string;
  violet: string;
  blue: string;
  gray: string;
}
