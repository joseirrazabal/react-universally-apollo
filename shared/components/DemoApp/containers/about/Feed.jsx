import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

const Feed = ({ entries = [], loggedIn, onVote, onLoadMore }) => {
  if (entries && entries.length) {
    return (
      <div>
        {entries.map(
          entry =>
            entry ? (
              <div key={entry.id}>
                {entry.id || ''}
              </div>
            ) : null
        )}
        <button onClick={onLoadMore}>Load more</button>
      </div>
    );
  }
  return <div />;
};

Feed.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default Feed;
