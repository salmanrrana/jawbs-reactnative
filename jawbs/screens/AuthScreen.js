import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  //facebookLogin is coming from the actions
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
    //this code below removes the token and forgets that you have ever logged in
    // TEMP CODE TEMP CODE TEMP CODE
    AsyncStorage.removeItem('fb_token');
  }


  //called when a component is just about to rerender
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);

  }

  //helper function we make for componentDidMount
  //this is a call back that will handle a new set of props
  //if there is a token, we will navigate the user
  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
    console.log('props.token: ', props.token);
  }



  render() {
    return (
      <View />
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
