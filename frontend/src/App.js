import {isWidthDown, withWidth} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavigationBar from './features/core/NavigationBar/NavigationBar';
import Favorites from './features/favorites/Favorites';
import ImageSearch from './features/imageSearch/ImageSearch';

function App({width}) {
  const isSmallScreen = isWidthDown('sm', width);
  const imageGridColumns = isSmallScreen ? 2 : 3;

  return (
    <Container fixed disableGutters={isSmallScreen}>
      <Router>
        <Switch>
          <Route path="/favorites">
            <NavigationBar navIndex={1} />
            <Favorites cols={imageGridColumns} />
          </Route>
          <Route path="/">
            <NavigationBar navIndex={0} />
            <ImageSearch cols={imageGridColumns}/>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default withWidth()(App);
