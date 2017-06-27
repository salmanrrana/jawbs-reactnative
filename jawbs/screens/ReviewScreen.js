import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';


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

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
        company, formattedRelativeTime, url,
        longitude, latitude, jobtitle, jobkey
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        longitudeDelta: 0.005,
        latitudeDelta: 0.01,
      }
      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <Button
            title="Settings"
            onPress={() => navigate('settings')}
            backgroundColor="rgba(0,0,0,0)"
            color="rgba(1,122,255,1)"
          />
          {this.renderLikedJobs()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
}

function mapsStateToProps(state) {
  return { likedJobs: state.likedJobs }
}

export default connect(mapsStateToProps)(ReviewScreen);
