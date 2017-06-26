import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';


class ReviewScreen extends Component {
  // static navigationOptions = {
  //   title: 'Review Jobs',
  //   header: ({ navigate }) => {
  //     return {
  //       HeaderRight:   <Button title="Settings" onPress={() => navigate('settings')} />
  //     };
  //   },
  //   style: {
  //     marginTop: Platform.OS === 'android' ? 24 : 0;
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
