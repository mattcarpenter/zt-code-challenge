import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import {useHistory} from 'react-router-dom';

const NavigationBar = ({navIndex}) => {
  const history = useHistory();

  return (
    <AppBar position="static">
      <Tabs
        value={navIndex}
        aria-label="navigation"
        role="navigation"
        onChange={(event, index) => history.push(index === 0 ? '/' : '/favorites')}
      >
        <Tab label="Search" id="search" />
        <Tab label="Favorites" />
      </Tabs>
    </AppBar>
  )
};

NavigationBar.propTypes = {
  navIndex: PropTypes.number
};

export default NavigationBar;
