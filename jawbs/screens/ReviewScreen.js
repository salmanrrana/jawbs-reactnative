import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';


class ReviewScreen extends Component {
  // static navigationOptions = {
  //   title: 'Review Jobs',
  //   header: ({ navigate }) => {
  //     return {
  //       HeaderRight:   <Button title="Settings" onPress={() => navigate('settings')} />
  //     };
  //   }
  // }
  static navigationOptions = {
    title: 'Review Jobs'
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Settings"
          onPress={() => navigate('settings')}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(1,122,255,1)"
        />
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
      </View>
    );
  }
}

export default ReviewScreen;
//
// Hi Stephen,
//
// Sorry to bother again, but I'm having issues with react navigation.
//
// Im just on the beginning of the lesson for the jobs app and I'm having issues with the navigationOption and adding navigate to right in ReviewScreen.js
//
// When reading through the documentation it looks like it is now headerRight but then when trying to pass the =>  in the button it is saying that i am unable to pass an object.
//
// my repo is still connected above.
//
// as a temporary solution I added the button to the main render()
//
// thanks so much for your help and I look forward to hearing from you.
