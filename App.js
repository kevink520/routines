import React from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import combineReducers from './reducers';
import firebase from 'firebase';
import Routines from './components/Routines';

class App extends React.Component {
  //state = { user: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyB8g7r9Q9Rtym07OJyhViwKetDzkeBSzWQ",
      authDomain: "routines-6009a.firebaseapp.com",
      databaseURL: "https://routines-6009a.firebaseio.com",
      projectId: "routines-6009a",
      storageBucket: "routines-6009a.appspot.com",
      messagingSenderId: "676908909899",
    });

    firebase.auth().onAuthStateChanged(user => {
      //this.setState({user});
    });
  }

  render() {
    const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Routines />
      </Provider>
    );
  }
}

export default App;
