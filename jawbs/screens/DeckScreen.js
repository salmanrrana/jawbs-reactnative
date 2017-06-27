import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

//1. need to get a list of jobs as a prop so we can get a list of jobs on this screen
  //list of jobs  exist on the jobs piece of state ( from jobs reducer )
  //actual array of jobs we get back from call are defined from the results property
    //from the jobs piece of state (in jobs_reducer.js)



class DeckScreen extends Component {
  //this is function for the swipe component
  //that we send through renderCard in swipe
  //cacheEnabled helps keep a static mapview and will allow performace to be better
    //on android cacheView can sometimes have issues so to make mapView work
    //we set it to true
  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      longitudeDelta: 0.045,
      latitudeDelta: 0.02
    }
    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true: false}
            initialRegion={initialRegion}
          >

          </MapView>
        </View>

        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
          <Text style={{ height: 50 }}>
            {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
          </Text>
      </Card>
    )
  }

  renderNoMoreCards() {
    return(
      <Card title="NO More Jobs">

      </Card>
    )
  }

//like job is an action creator we make in order
//to pass along the particular job and then store in a reducer we will make
//so in onSwipeRight --> we pass in job(the job on the card) as an argument
//we recieve the job and pass it to the action creator likeJob
//when it receives the job it will pass to reducer
  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          keyProp="jobkey"
          onSwipeRight={job => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}

//we receive state as an argument like (state), but all we really care about
//is the jobs piece of state so we do ({ jobs }) to call that one in particular
// jobs is the overall data from the query from indeed api
//the list of jobs we care about it results.
// this gives us access to list of jobs
function mapStateToProps({ jobs }) {
  return { jobs: jobs.results }
}

export default connect(mapStateToProps, actions)(DeckScreen);
