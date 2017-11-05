import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import BestSequenceView from './BestSequenceView';
import GameBoard from './GameBoard';
import DefaultPositionView from './DefaultPositionView';
import CurrentPlayerView from './CurrentPlayerView';
import RollDiceView from './RollDiceView';

import boardData from '../../helpers/boardData';
import SLBoard from '../../helpers/SLBoard';

export default class GameViewPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPlayer: 0,
      gameWinner: -1
    };

    const totalPlayers = this.props.navigation.state.params.numPlayers;
    const playReverse = this.props.navigation.state.params.playReverse;

    const boardDataCopy = boardData.slice();
    const actualBoardData = playReverse ? boardDataCopy.map(item => item * -1) : boardDataCopy;
    const boardDataWithDummyPositions = [0, ...actualBoardData, 0];
    this.boardData = boardDataWithDummyPositions;

    for (let i = 0; i < totalPlayers; i += 1) {
      this.state[`player${i}Position`] = playReverse ? this.boardData.length - 1 : 0;
    }

    const slBoard = new SLBoard(this.boardData, playReverse);
    this.bestSequenceBoard = slBoard.getCalculatedPathBoard();
  }

  onPlayCurrentBestSequence = () => {
    const currentPlayer = this.state.currentPlayer;
    const currentPlayerPosition = this.state[`player${currentPlayer}Position`];

    const bestSequence = this.bestSequenceBoard[currentPlayerPosition];

    this.onDiceRoll(bestSequence);
  }

  onGoBackPressed = () => {
    this.props.navigation.goBack();
  };

  onDiceRoll = (diceSequence) => {
    const currentPlayer = this.state.currentPlayer;
    const currentPlayerPosition = this.state[`player${currentPlayer}Position`];

    const newPosition = this.executeDiceSequence(currentPlayerPosition, diceSequence);

    const playReverse = this.props.navigation.state.params.playReverse;
    const winningCondition = playReverse
      ? newPosition === 1
      : newPosition === this.boardData.length - 2;
    const gameWinner = winningCondition ? currentPlayer : -1;

    const totalPlayers = this.props.navigation.state.params.numPlayers;
    const nextPlayer = (currentPlayer + 1) % totalPlayers;
    this.setState({
      [`player${currentPlayer}Position`]: newPosition,
      currentPlayer: nextPlayer,
      gameWinner
    });
  };

  executeDiceSequence = (position, diceSequence) => {
    let newPosition = position;
    const playReverse = this.props.navigation.state.params.playReverse;
    diceSequence.forEach((diceValue) => {
      const finalValue = playReverse ? newPosition - diceValue : newPosition + diceValue;
      const edgeCondition = playReverse ? finalValue < 1 : finalValue > this.boardData.length - 2;
      if (edgeCondition) {
        return;
      }
      newPosition = finalValue;
      const boardValue = this.boardData[newPosition];
      if (boardValue !== 0) {
        newPosition = Math.abs(boardValue);
      }
    });

    return newPosition;
  };

  renderDefaultPositionView = () => {
    const players = [];
    const totalPlayers = this.props.navigation.state.params.numPlayers;
    const playReverse = this.props.navigation.state.params.playReverse;
    for (let i = 0; i < totalPlayers; i += 1) {
      const playerPosition = this.state[`player${i}Position`];
      const baseCondition = playReverse
        ? playerPosition === this.boardData.length - 1
        : playerPosition === 0;
      if (baseCondition) {
        players.push(i);
      }
    }

    return <DefaultPositionView players={players} />;
  };

  renderGameBoard = () => {
    const totalPlayers = this.props.navigation.state.params.numPlayers;
    const playerPositions = [];
    for (let i = 0; i < totalPlayers; i += 1) {
      const playerPosition = this.state[`player${i}Position`];
      playerPositions.push(playerPosition);
    }

    return <GameBoard boardData={this.boardData} playerPositions={playerPositions} />;
  };

  renderBestSequenceView = () => {
    const currentPlayer = this.state.currentPlayer;
    const currentPlayerPosition = this.state[`player${currentPlayer}Position`];

    const sequence = this.bestSequenceBoard[currentPlayerPosition];
    return (
      <BestSequenceView
        sequence={sequence}
        onPlayCurrentBestSequence={this.onPlayCurrentBestSequence}
      />
    );
  };

  renderBackButton = () => (
    <TouchableOpacity style={styles.button} onPress={this.onGoBackPressed}>
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  );

  renderGameOver = () => {
    const winnerPlayer = this.state.gameWinner;

    return (
      <View style={[styles.container, styles.gameOverContainer]}>
        <Text style={styles.instructions}>Player {winnerPlayer + 1} won the game</Text>
        {this.renderBackButton()}
      </View>
    );
  };

  render() {
    if (this.state.gameWinner > -1) {
      return this.renderGameOver();
    }

    return (
      <ScrollView style={styles.container}>
        {this.renderBackButton()}
        {this.renderBestSequenceView()}
        {this.renderGameBoard()}
        {this.renderDefaultPositionView()}
        <CurrentPlayerView index={this.state.currentPlayer} />
        <RollDiceView onDiceRoll={this.onDiceRoll} />
        <View style={styles.emptyBottomView} />
      </ScrollView>
    );
  }
}
