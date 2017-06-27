import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

//the mapStateToProps is not needed in this components
//we only need the actions.
//the action we are going to use is clear_liked_jobs
//we are not binding the onpress because we wdo not need it for this
class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}


export default connect(null, { clearLikedJobs })(SettingsScreen);
