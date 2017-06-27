import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';

//reducers must define a nonundefined value
//must return object, string, or number

//We have a piece of application level state called auth
//auth containes a property token
// if token false --> go to login flow
// if toiken is defined go to map

export default combineReducers({
  auth: auth,
  jobs: jobs
});
