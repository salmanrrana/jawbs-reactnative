import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';

//this uses dimensions from react native to look at the window of the device
//being used and then set the width to that screen
const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        //the reason there is no parentheses in onPress is because we care calling it in the future
        //if () were in it would try and call right away
        <View>
          <Button
            title="Lets Get Started"
            raised
            buttonStyle={styles.buttonStyle}
            onPress={this.props.onComplete}
          />
        </View>

      )
    }
  }

  renderSlides() {
    //this will map through the list of data from the parent component (wlcomescreen) and display
    //on what we call a slide
    //we made the key the text. and we show the text
    return this.props.data.map((slide, index) => {
      return (
        //this is showing us what is on the page for the welcome screen
        <View
          style={[styles.slideStyle, {backgroundColor: slide.color }]}
          key={slide.text}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      )
    })
  }

  render() {
    return(
      <ScrollView
        //sets view to horizontal on scrollview
        horizontal
        //makes the scoll go to the next page when it reaches a certain point
        pagingEnabled
        //to make it fit the whole page
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 30,
    color: '#FFF',
    letterSpacing: 1.3,
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: '#0288D1'
  },
  buttonView: {
    flex: 2
  }
};

export default Slides;
