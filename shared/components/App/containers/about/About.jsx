import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import Feed from './Feed';

import FEED_QUERY from '../../graphql/FeedQuery.graphql';
import CURRENT_USER_QUERY from '../../graphql/Profile.graphql';
import VOTE_MUTATION from '../../graphql/Vote.graphql';


class FeedPage extends React.Component {
  constructor() {
    super();
    this.offset = 0;
  }

  render() {
    const { vote, loading, currentUser, feed, fetchMore } = this.props;

    return (
      <div>
        <Feed
          entries={feed || []}
          loggedIn={!!currentUser}
          onVote={vote}
          onLoadMore={fetchMore}
        />
        {loading ? "loading" : null}
      </div>
    );
  }
}

/*
FeedPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    login: PropTypes.string.isRequired,
  }),
  feed: Feed.propTypes.entries,
  fetchMore: PropTypes.func,
  vote: PropTypes.func.isRequired,
};
*/

const ITEMS_PER_PAGE = 10;
const withUser = graphql(CURRENT_USER_QUERY, {
  props: ({ data }) => ({
    currentUser: data && data.currentUser,
  }),
});
const withData = graphql(FEED_QUERY, {
  options: ({ match }) => ({
    variables: {
      type:
      (match.params &&
        match.params.type &&
        match.params.type.toUpperCase()) ||
      'TOP',
      offset: 0,
      limit: ITEMS_PER_PAGE,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({
    data: { loading, feed, fetchMore },
    ownProps: { match, currentUser },
  }) => ({
      loading,
      match,
      feed,
      currentUser,
      fetchMore: () =>
        fetchMore({
          variables: {
            offset: feed.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev;
            }
            return Object.assign({}, prev, {
              feed: [...prev.feed, ...fetchMoreResult.feed],
            });
          },
        }),
    }),
});

const withMutations = graphql(VOTE_MUTATION, {
  props: ({ mutate }) => ({
    vote: ({ repoFullName, type }) =>
      mutate({
        variables: { repoFullName, type },
      }),
  }),
});

export default withMutations(withUser(withData(FeedPage)));
