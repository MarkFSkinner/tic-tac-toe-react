import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "tic-tac-toe-cd139.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-cd139.firebaseio.com",
  projectId: "tic-tac-toe-cd139",
  storageBucket: "tic-tac-toe-cd139.appspot.com",
  messagingSenderId: "717325604579",
  appId: "1:717325604579:web:b75c25a1798d7a90"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
