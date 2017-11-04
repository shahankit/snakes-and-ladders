import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class HomePage extends Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: 'Home',
  };

  onStartGamePressed = () => {
    const { navigate } = this.props.navigation;
    navigate('GameSettings');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.startGameButton}
          onPress={this.onStartGamePressed}
        >
          <Text style={styles.startGameButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
