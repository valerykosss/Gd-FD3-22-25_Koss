import React from 'react';
import './App.css';
import Notes from './components/Notes';
import Tags from './components/Tags';
import { Provider } from 'react-redux';
import store from './store';

function App() {

  return (
    <Provider store={store}>
      <div className="container">
        <Notes />
        <Tags />
      </div>
    </Provider>
  );
}

export default App;