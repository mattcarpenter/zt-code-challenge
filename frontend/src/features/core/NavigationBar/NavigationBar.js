import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const NavigationBar = ({navIndex}) => {
  const history = useHistory();

  function onChange(event, index) {
    history.push(index === 0 ? '/' : '/favorites');
  }

  return (
    <AppBar position="static">
      <Tabs value={navIndex} onChange={onChange} aria-label="navigation" role="navigation">
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
