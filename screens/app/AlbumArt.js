import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  Easing
} from 'react-native';


export default class AlbumArt extends Component {

  constructor(props) {

    super(props);

    this.spinValue = new Animated.Value(0);
  }


  componentDidMount() {

    this.spin();
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }


  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (

      <View style={styles.container}>

        {this.props.paused == false ? <Animated.Image
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            transform: [{ rotate: spin }]
          }}
          source={{ uri: this.props.url }}
        /> : <Image
            style={[styles.image, { borderRadius: imageSize / 2 }]}
            source={{ uri: this.props.url }}
          />}
      </View>
    );
  }
}


const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
})