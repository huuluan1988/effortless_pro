import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';


export default class Header extends Component {

  constructor(props) {

    super(props);
    this.state = {
      modalVisible: false,
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Listening</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 17,
  },
  button: {
    opacity: 0.72
  }
});