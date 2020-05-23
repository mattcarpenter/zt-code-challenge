import React from 'react';
import InfiniteLoader from 'react-infinite-loader';
import Masonry from 'react-masonry-css';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  grid: {
    display: 'flex'
  },
  column: {
    backgroundClip: 'padding-box'
  }
});

const LazyStackGrid = ({children, cols, loadMoreItems}) => {
  const classes = useStyles();
  return (
    <div>
      <Masonry
        breakpointCols={cols}
        className={classes.grid}
        columnClassName={classes.column}
        >
        {children}
      </Masonry>
      <InfiniteLoader onVisited={loadMoreItems}/>
    </div>
  );
};

LazyStackGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  cols: PropTypes.number,
  loadMoreItems: PropTypes.func
};

export default LazyStackGrid;
