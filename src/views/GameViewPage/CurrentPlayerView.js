import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Player from './Player';

import styles from './styles';

class CurrentPlayerView extends Component {
  render() {
    return (
      <View style={styles.currentPlayerView}>
        <Text style={styles.currentPlayerLabel}>Current Player</Text>
        <Player index={this.props.index} />
      </View>
    );
  }
}

CurrentPlayerView.propTypes = {
  index: PropTypes.number.isRequired,
};

export default CurrentPlayerView;
