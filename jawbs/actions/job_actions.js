import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';


//CLEAR_LIKED_JOBS is connecting to likes reducer

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '7170567739719512',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 20,
  limit: 100,
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
}

//this fetchJobs is the action creator in this file
// we are taking this region from the MapScreen.js file
export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
    console.log('data from axios call in job_actions: ', data);
  } catch(e) {
    console.log('error from job_action.js: ', e);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS
  }
}
