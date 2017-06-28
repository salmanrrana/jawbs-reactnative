// import { Permissions, Notifications } from 'expo';
// import { AsyncStorage } from 'react-native';
// import axios from 'axios';
//
// const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';
//
// // this code will have a asynchronus action so we have to use async await
// export default async () => {
//   // this will look for a previous token
//   //we will lokk for it in AsyncStorage under an item called pushtoken that we will make
//   let previousToken = await AsyncStorage.getItem('pushtoken');
//   console.log(previousToken);
//   //if previous token exists then just return since we do not need to regiser again
//   if (previousToken) {
//     return;
//     //if there is not a saved token it will follow this flow
//   } else {
//     //we will ask the user for permission through Permissions
//     //there are many permissions we can ask
//     //we will ask Async if there is a permission for push notifications
//     // this is a asynchronus return. because of that we will add await
//     //after we ask the user for permission, we will pull the status property
//     let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
//     // if it is anything but granted we will return early and try again in the future
//     if (status !== 'granted' ) {
//       return;
//     }
//     //this will generate the pushtoken
//     //this will tie the users device with the user
//     //this is also asynchronus call so add await
//     let token = await Notifications.getExponentPushTokenAsync();
//     //now that we have the token we save it to our server
//     //we will post up a token
//     //notice that we have an object token with a nested object of token
//     //this will take some time so we add await
//     await axios.post(PUSH_ENDPOINT, { token: { token } });
//     // this will save the token to asyncstorage
//     // set the token to be the pushtoken
//     AsyncStorage.setItem('pushtoken', token)
//   }
// };

import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken);
  if (previousToken) {
    return;
  } else {
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }

    let token = await Notifications.getExponentPushTokenAsync();
    await axios.post(PUSH_ENDPOINT, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
  }
};
