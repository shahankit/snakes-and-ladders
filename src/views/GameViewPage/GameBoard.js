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

  renderCell = (rowStartIndex, showReverse) => (cell, index) => {
    const itemIndex = showReverse ? rowStartIndex + 9 - index : rowStartIndex + index;

    const players = this.cellPlayersMapping[itemIndex] || [];
    return <BoardCell key={itemIndex} cellValue={cell} index={itemIndex} players={players} />;
  };

  renderBoardCells = () => {
    const boardData = this.props.boardData;

    let boardCells = [];

    for (let i = boardData.length - 1; i > 0; i -= 10) {
      const rowStartIndex = i - 9;
      const boardRow = boardData.slice(rowStartIndex, rowStartIndex + 10);
      const showReverse = (i / 10) % 2 === 0;
      showReverse && boardRow.reverse();
      const boardRowCells = boardRow.map(this.renderCell(rowStartIndex, showReverse));
      boardCells = boardCells.concat(boardRowCells);
    }

    return boardCells;
  };

  render() {
    return <View style={styles.gameBoard}>{this.renderBoardCells()}</View>;
  }
}

GameBoard.propTypes = {
  boardData: PropTypes.arrayOf(PropTypes.number).isRequired,
  playerPositions: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default GameBoard;
