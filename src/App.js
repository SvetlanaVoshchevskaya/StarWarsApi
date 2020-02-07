import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import FilmCard from './components/FilmCard/FilmCard';

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/films/:id" component={FilmCard} />
          <Redirect push to="/" />
        </Switch>
      </>
    );
  }
}

export default App;
