import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';

import registerForNotifications from './services/push_notifications';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  //this checks to see if the user has a token
  componenetDidMount() {
    registerForNotifications();
    //this is a listener that we added and we are going to pass it an arrow function
    //it is a callback that the user will recieve anytime they receive a push notification
    //called with argument notification
    //it contains information in the notification
    //we import Alert to show user alert
    Notifications.addListener((notification) => {
      // we pull of properties from notification object
      const { data: { text }, origin } = notification;
      //origin makes sure the user receivges the notification properly
      // code above is same as code below
      // const text = notification.data.text
      //Alert.alert will show the user the message
      //only wanna show the user the message if the origin is received
      //and we want to show some text to that user
      if (origin === 'received' && text) {
        Alert.alert(
          //first argument is the title of the alert
          'New Push Notification',
          //second argument is the body of the notification
          //text property is the most important and has some properties
          text,
          //third shows the user a button to dismiss the popup
          [{ text: 'ok.'}]
        );
      }
    });
  }
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          //tab bar position is for android. the tab bar appears on top otherwise for the time being
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      //this makes sure that the tab bar is removed in the welcome screen
      //lazy makes sure the facebook auth modal does not pop up immediately
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator screenProps="navigate"/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
