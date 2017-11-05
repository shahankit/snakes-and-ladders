import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Switch, Platform } from 'react-native';

import styles from './styles';

const numPlayersCount = [2, 3, 4];

export default class GameSettingsPage extends Component {
  static navigationOptions = {
    title: 'SETTINGS',
    headerBackTitle: 'Settings'
  };

  state = { numPlayers: 2, playReverse: false };

  onStartGamePressed = () => {
    const { navigate } = this.props.navigation;
    navigate('GameView', {
      numPlayers: this.state.numPlayers,
      playReverse: this.state.playReverse
    });
  };

  onNumPlayersSelected = numPlayers => () => this.setState({ numPlayers });

  onPlayReverseSwitchChange = playReverse => this.setState({ playReverse });

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
            item === selectedNumPlayers ? styles.numPlayersButtonTextSelected : null
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Number of players</Text>
          {numPlayersCount.map(this.renderNumPlayersSelector)}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Play Reverse</Text>
          <Switch
            thumbTintColor={Platform.select({
              ios: undefined,
              android: 'dodgerblue'
            })}
            onTintColor="dodgerblue"
            value={this.state.playReverse}
            onValueChange={this.onPlayReverseSwitchChange}
          />
        </View>
        <TouchableOpacity style={styles.startGameButton} onPress={this.onStartGamePressed}>
          <Text style={styles.startGameButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
