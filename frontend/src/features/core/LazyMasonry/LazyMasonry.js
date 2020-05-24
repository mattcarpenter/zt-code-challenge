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

const LazyMasonry = ({
 /**
  * List of children components
  */
 children,
 /**
  * Number of columns to place children into
  */
 cols,
 /**
  * Callback function invoked when the bottom of the masonry becomes visible. The parent component
  * may use this as a signal to load more components and add them to the bottom of the masonry.
  */
 loadMoreItems,
 /**
  * Indicates whether or not the parent component is loading more items to add to the masonry.
  * This component will render a spinner at the bottom of the masonry when `loadMoreItems` is true.
  */
 loading
}) => {
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
