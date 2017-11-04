import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

const numPlayersCount = [2, 3, 4];

export default class GameSettingsPage extends Component {
  static navigationOptions = {
    title: 'SETTINGS',
    headerBackTitle: 'Settings'
  };

  state = { numPlayers: 2 };

  onStartGamePressed = () => {
    const { navigate } = this.props.navigation;
    navigate('GameView', { numPlayers: this.state.numPlayers });
  };

  onNumPlayersSelected = numPlayers => () => this.setState({ numPlayers })

  renderNumPlayersSelector = (item) => {
    const selectedNumPlayers = this.state.numPlayers;
    return (
      <TouchableOpacity
        key={item}
        style={[
          styles.numPlayersButton,
          item === selectedNumPlayers ? styles.numPlayersButtonSelected : null
        ]}
        onPress={this.onNumPlayersSelected(item)}
      >
        <Text
          style={[
            styles.numPlayersButtonText,
            item === selectedNumPlayers
              ? styles.numPlayersButtonTextSelected
              : null
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Number of players</Text>
          {numPlayersCount.map(this.renderNumPlayersSelector)}
        </View>
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
