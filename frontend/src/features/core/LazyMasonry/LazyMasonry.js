import {makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import InfiniteLoader from 'react-infinite-loader';
import Masonry from 'react-masonry-css';

const useStyles = makeStyles({
  grid: {
    display: 'flex'
  },
  column: {
    backgroundClip: 'padding-box'
  }
});

const hideLoaderStyle = {
  display: 'none'
};

const LazyMasonry = ({children, cols, loadMoreItems, loading}) => {
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
      <InfiniteLoader onVisited={loadMoreItems} loaderStyle={!loading ? hideLoaderStyle : null} />
    </div>
  );
};

LazyMasonry.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  cols: PropTypes.number,
  loadMoreItems: PropTypes.func,
  loading: PropTypes.bool
};

LazyMasonry.defaultProps = {
  cols: 2,
  loadMoreItems: () => {},
  loading: false
};

export default LazyMasonry;
