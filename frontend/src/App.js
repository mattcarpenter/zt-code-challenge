import React from 'react';
import Container from '@material-ui/core/Container';
import ImageSearch from './features/imageSearch/ImageSearch';
import Favorites from './features/favorites/Favorites';
import './App.css';

function App() {
  return (
    <Container>
      {/*<ImageSearch/>*/}
      <Favorites />
    </Container>
  );
}

export default App;
