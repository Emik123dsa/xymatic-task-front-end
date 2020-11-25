import React, { Component } from 'react';

import s from './App.scss';

class App extends Component {
  componentDidMount() {
    console.log(s);
  }

  render() {
    return (
      <div>
        <h1 className={s.privet}>Priv123asde</h1>
      </div>
    );
  }
}

export default App;
