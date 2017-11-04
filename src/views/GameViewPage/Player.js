import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

class Player extends Component {
  render() {
    const { style, textStyle, index } = this.props;

    let playerContainerColorStyle = null;
    switch (index) {
      case 0:
        playerContainerColorStyle = styles.playerIconBlue;
        break;
      case 1:
        playerContainerColorStyle = styles.playerIconBlack;
        break;
      case 2:
        playerContainerColorStyle = styles.playerIconViolet;
        break;
      case 3:
        playerContainerColorStyle = styles.playerIconBrown;
        break;
      default:
        playerContainerColorStyle = { backgroundColor: 'black' };
    }

    return (
      <View style={[styles.playerIconContainer, playerContainerColorStyle, style]}>
        <Text style={[styles.playerIconText, textStyle]}>{index + 1}</Text>
      </View>
    );
  }
}

Player.propTypes = {
  index: PropTypes.number.isRequired,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
};

Player.defaultProps = {
  style: {},
  textStyle: {},
};

export default Player;
