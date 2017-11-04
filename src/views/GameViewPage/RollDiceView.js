import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

class RollDiceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diceValue: undefined,
    };
    this.diceSequence = [];
  }

  onRollDicePressed = () => {
    const diceValue = Math.floor(Math.random() * 6 + 1);
    this.setState({ diceValue });
    if (diceValue === 6) {
      if (this.diceSequence.length === 2) {
        this.diceSequence = [];
      }
      this.diceSequence.push(6);
    } else {
      this.props.onDiceRoll([...this.diceSequence, diceValue]);
      this.diceSequence = [];
    }
  }

  render() {
    const diceValue = this.state.diceValue;
    const buttonValue = diceValue === 6 ? 'ROLL DICE AGAIN' : 'ROLL DICE';

    return (
      <View style={styles.rollDiceView}>
        <TouchableOpacity
          style={styles.rollDiceButton}
          onPress={this.onRollDicePressed}
        >
          <Text style={styles.rollDiceText}>{buttonValue}</Text>
        </TouchableOpacity>
        <View style={styles.diceTextContainer}>
          <Text style={styles.diceText}>{diceValue}</Text>
        </View>
      </View>
    );
  }
}

export default RollDiceView;
