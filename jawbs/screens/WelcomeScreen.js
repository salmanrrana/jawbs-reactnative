import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JAWBS\n\n\n\n\n››››››', color: '#41D3BD' },
  { text: 'You deserve the\njob you want!!\n\n\n\n\n››››››', color: '#791E94' },
  { text: 'Set your location,\nthen swipe away\n\n\n\n', color: '#407899' }
];

class WelcomeScreen extends Component {
  state = {
    token: null
  };

//if a token exists, set the state of token to token
  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token })
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    } else {


    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
    );
  }
  }
}

export default WelcomeScreen;
