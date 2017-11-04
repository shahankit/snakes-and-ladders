import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import Player from './Player';

class DefaultPositionView extends Component {
  renderPlayerIcon = playerIndex => (
    <Player
      key={playerIndex}
      index={playerIndex}
      style={styles.defaultPlayerIcon}
      textStyle={styles.defaultPlayerText}
    />
  );

  render() {
    const players = this.props.players;

    if (players.length < 1) {
      return null;
    }

    return (
      <View style={styles.defaultPositionView}>
        {players.map(this.renderPlayerIcon)}
      </View>
    );
  }
}

DefaultPositionView.propTypes = {
  players: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default DefaultPositionView;
