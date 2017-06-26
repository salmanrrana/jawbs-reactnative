import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

// **uses async/await and redux thunk below**

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
//if the token exists we want to dispatch an action saying FB login is done
  if (token) {
    // this is dispatching an action to automatically log the user in
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token})
  } else {
  // Start up FB Login Process
  // in order for the helper function to use dispatch, we pass it in the call below
  // from the argument above
    doFacebookLogin(dispatch);
  }
}

//this code below is not an action creator like the facebookLogin
//it is a helper function
//since it is a single argument we can take the parens () from the dispatch
const doFacebookLogin = async dispatch => {
  //app ID from facebook is a string. not a number
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('299704883823208', {
    permissions: ['public_profile']
  });
  // when login fails it gets a type called cancel
  //THIS WILL NEED US TO DISPATCH AN ACTION  so we had to create a type
  if ( type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL})
  }
  // we want to wait for the token to arrive
  //and then we dispatch an action to save the token
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

//asyncstorage can reference::
// AsyncStoreage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token');
//asyncStorage only is used for instances with opening and closing the app
//we will also keep the token in the redux store

//AsyncStorage does take some time -> keyword async(asynchronous)
//AsyncStorage is like a key: value store
// when we want to save item to device it saves token
//  and we use the string of 'fb_token' to be the the token that we set aside
// and can retrieve it later on
//the name of the action creator is facebookLogin
//we are going to see if a token exists


//because of the asynchronous nature of this process, we will use redux thunk
// we can return a function from action creators and call this function and callback the dispatch action
//this will allow us to dispatch an action at a later point in time

// #### Tis is the normal way
// export const facebookLogin = () => {
//   return async function(dispatch) {
//     let token = await AsyncStoreage.getItem('fb_token');
//     if (token) {
//
//     } else {
//
//     }
//   }
// };

// ####This is with some refactor to remove the function word and replace with fatty arrow
// export const facebookLogin = () => {
//   return async (dispatch) => {
//     let token = await AsyncStoreage.getItem('fb_token');
//     if (token) {
//
//     } else {
//
//     }
//   }
// };

// this code we use will be the way to completely clean up the code and adds
//the ability to remove the dispatch from the parens (),
//remove the return keyword, and remove the curly braces from the top and bottom,
// since we are only defining a single javascript variable or expression.
