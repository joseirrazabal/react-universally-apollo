import { combineReducers } from 'redux';
import posts from './posts/byId';
import views                    from './modules/views';
import userAuth                 from './modules/userAuth';

const appReducers = {
  views,
  userAuth
};

// REDUCER EXPORT
export default function getReducers(apolloClient) {
  return combineReducers({
    ...appReducers,
    apollo: apolloClient.reducer()
  });
}