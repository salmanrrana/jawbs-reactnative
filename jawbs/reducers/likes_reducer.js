import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';


// return a list of jobs for LIKE_JOB
//make a new array--> contain a job has just liked with action.payload
// and all previous jobs the user has liked with ...state
// with lodash and uniqBy, it will return no duplicate jobs

//clear_liked_jobs will reset the jobs that a user has liked

//we add rehydrate to watch for the autorehydrate store enchancer
//when it dispatches an action and if it finds that case of a rehydrate
// we take action.payload.likedJobs

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case CLEAR_LIKED_JOBS:
        return [];
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');
    default:
      return state
  }
}
