import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

// import SLBoard from '../../helpers/SLBoard';
// import boardData from '../../helpers/boardData';

export default class HomePage extends Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: 'Home',
  };

  // componentDidMount() {
  //   const slBoard = new SLBoard(boardData, true, 100);
  //   const bestSequenceBoard = slBoard.getMinimumPathArray();
  //   console.log('bestSequenceBoard is', bestSequenceBoard);
  // }

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
