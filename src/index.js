import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCQniwY_QaKh7IoeIf0nHyaX4Wk8IDcLsg",
    authDomain: "sample-80d9a.firebaseapp.com",
    databaseURL: "https://sample-80d9a.firebaseio.com",
    projectId: "sample-80d9a",
    storageBucket: "sample-80d9a.appspot.com",
    messagingSenderId: "6688942905"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
