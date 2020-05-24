import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImageSearch from './features/imageSearch/ImageSearch';
import Favorites from './features/favorites/Favorites';
import './App.css';

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/">
            <ImageSearch/>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
