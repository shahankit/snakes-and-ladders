import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import Player from './Player';

import SLBoard from '../../helpers/SLBoard';

class BoardCell extends Component {
  renderPlayerItem = player => (
    <Player index={player} style={styles.boardCellPlayer} textStyle={styles.boardCellPlayerText} />
  );

  renderPlayers = () => {
    const players = this.props.players;
    if (players.length < 1) {
      return null;
    }

    return <View style={styles.boardCellPlayers}>{players.map(this.renderPlayerItem)}</View>;
  };

  render() {
    const { index, cellValue, playReverse } = this.props;
    const isLadder = SLBoard.isLadder(index, cellValue, playReverse);
    const isSnake = SLBoard.isSnake(index, cellValue, playReverse);

    const containerStyle = [styles.cellContainer];
    if (isLadder) {
      containerStyle.push(styles.cellContainerLadder);
    } else if (isSnake) {
      containerStyle.push(styles.cellContainerSnake);
    }

    const cellTextStyle = [styles.cellText];
    if (isLadder || isSnake) {
      cellTextStyle.push(styles.cellTextWhite);
    }

    let value = index;
    if (isLadder) {
      value = `+${cellValue}`;
    } else if (isSnake) {
      value = `-${cellValue}`;
    } else {
      value = index;
    }

    return (
      <View style={containerStyle}>
        <Text style={cellTextStyle}>{value}</Text>
        {this.renderPlayers()}
      </View>
    );
  }
}

BoardCell.propTypes = {
  index: PropTypes.number.isRequired,
  cellValue: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.number).isRequired
};

BoardCell.defaultProps = {
  cellValue: undefined
};

export default BoardCell;
