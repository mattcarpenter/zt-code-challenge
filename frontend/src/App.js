import React from 'react';
import Container from '@material-ui/core/Container';
import { withWidth, isWidthDown } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImageSearch from './features/imageSearch/ImageSearch';
import Favorites from './features/favorites/Favorites';
import './App.css';
import NavigationBar from './features/core/NavigationBar/NavigationBar';

function App({width}) {
  const isSmallScreen = isWidthDown('sm', width);

  return (
    <Container fixed disableGutters={isSmallScreen}>
      <Router>
        <Switch>
          <Route path="/favorites">
            <NavigationBar navIndex={1} />
            <Favorites />
          </Route>
          <Route path="/">
            <NavigationBar navIndex={0} />
            <ImageSearch cols={isSmallScreen ? 2 : 3}/>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default withWidth()(App);
