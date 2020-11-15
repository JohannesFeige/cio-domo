import React from 'react';
import ReactDOM from 'react-dom';

// TODO: remove this if material-ui v5 is released
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

import './index.scss';
import * as serviceWorker from './serviceWorker';

import App from './components/app/App';
import { FirebaseProvider } from './components/firebase';
import { AuthProvider } from './components/session';

import 'fontsource-roboto/';

const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
  <FirebaseProvider>
    <AuthProvider>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </AuthProvider>
  </FirebaseProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
