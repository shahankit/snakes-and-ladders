import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import BoardCell from './BoardCell';

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.cellPlayersMapping = {};
  }

  componentWillReceiveProps(nextProps) {
    const playerPositions = nextProps.playerPositions;

    this.cellPlayersMapping = {};
    playerPositions.forEach((position, player) => {
      if (!this.cellPlayersMapping[position]) {
        this.cellPlayersMapping[position] = [];
      }

      this.cellPlayersMapping[position].push(player);
    });
  }

  renderCell = (cell) => {
    const { value, index } = cell;
    const players = this.cellPlayersMapping[index] || [];
    return <BoardCell key={index} cellValue={value} index={index} players={players} />;
  };

  renderBoardCells = () => {
    const boardData = this.props.boardData;

    let boardCells = [];
    const boardMaxPosition = this.props.boardMaxPosition;

    for (let i = boardMaxPosition; i > 0; i -= 10) {
      const boardRow = [];
      for (let j = i; j > i - 10 && j > 0; j -= 1) {
        boardRow.push({ index: j, value: boardData[j] });
      }
      const showReverse = ((boardMaxPosition - i) / 10) % 2 !== 0;
      showReverse && boardRow.reverse();
      const boardRowCells = boardRow.map(this.renderCell);
      boardCells = boardCells.concat(boardRowCells);
    }

    return boardCells;
  };

  render() {
    return <View style={styles.gameBoard}>{this.renderBoardCells()}</View>;
  }
}

GameBoard.propTypes = {
  boardData: PropTypes.object.isRequired,
  playerPositions: PropTypes.arrayOf(PropTypes.number).isRequired,
  boardMaxPosition: PropTypes.number.isRequired,
};

export default GameBoard;
