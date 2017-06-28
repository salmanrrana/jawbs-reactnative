import { createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

// autoRehydrate is not a middleware. it is a store enhancer.
// it interacts directly with the redux store.

// it is responsoble for pulling the saved data from asyncstorage
// on startup and then send it out to the all reducers as state.

// storage in persist store looks at all new piece of state
// and we set that new pice of state into async storage
//whitelist is coming from inside combine reducers

//REDUX PERSIST IS ALWAYS RETURNED AS AN OBJECT.
// EVEN EVEN EVEN
// IT IS COMING FROM A NUMBER STING OR ARRAY


const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

// the purge at the end will throw all the data away
// persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] }).purge();
persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });


export default store;
