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
      gameWinner: -1,
      disableDiceRoll: false
    };

    const totalPlayers = this.props.navigation.state.params.numPlayers;
    const playReverse = this.props.navigation.state.params.playReverse;

    let newBoardData = {};
    if (playReverse) {
      Object.keys(boardData).forEach((key) => {
        const value = boardData[key];
        newBoardData[value] = parseInt(key);
      });
    } else {
      newBoardData = Object.assign({}, boardData);
    }
    this.boardData = newBoardData;

    this.boardMaxPosition = 100;

    for (let i = 0; i < totalPlayers; i += 1) {
      this.state[`player${i}Position`] = playReverse ? this.boardMaxPosition + 1 : 0;
    }

    const slBoard = new SLBoard(this.boardData, playReverse, 100);
    this.bestSequenceBoard = slBoard.getMinimumPathArray();
    console.log('bestSequenceBoard', this.bestSequenceBoard);
  }

  onPlayCurrentBestSequence = async () => {
    const currentPlayer = this.state.currentPlayer;
    const currentPlayerPosition = this.state[`player${currentPlayer}Position`];

    const bestSequence = this.bestSequenceBoard[currentPlayerPosition];

    this.setState({ disableDiceRoll: true });

    for (let i = 0; i < bestSequence.length - 1; i += 1) {
      const diceSequence = [bestSequence[i]];
      const positionIndices = this.executeDiceSequence(currentPlayerPosition, diceSequence);
      await this.movePlayerToIndices(currentPlayer, positionIndices);
    }

    this.onDiceRoll([bestSequence[bestSequence.length - 1]]);
  };

  onGoBackPressed = () => {
    this.props.navigation.goBack();
  };

  onDiceRoll = async (diceSequence) => {
    this.setState({ disableDiceRoll: true });
    const currentPlayer = this.state.currentPlayer;
    const currentPlayerPosition = this.state[`player${currentPlayer}Position`];

    const positionIndices = this.executeDiceSequence(currentPlayerPosition, diceSequence);

    await this.movePlayerToIndices(currentPlayer, positionIndices);

    const finalPosition = positionIndices[positionIndices.length - 1];
    const playReverse = this.props.navigation.state.params.playReverse;
    const winningCondition = playReverse
      ? finalPosition === 1
      : finalPosition === this.boardMaxPosition;
    const gameWinner = winningCondition ? currentPlayer : -1;

    const totalPlayers = this.props.navigation.state.params.numPlayers;
    const nextPlayer = (currentPlayer + 1) % totalPlayers;
    this.setState({
      disableDiceRoll: false,
      currentPlayer: nextPlayer,
      gameWinner
    });
  };

  movePlayerToIndices = (playerIndex, positionIndices) =>
    new Promise(async (resolve) => {
      const currentPosition = this.state[`player${playerIndex}Position`];
      const firstPosition = positionIndices[0];
      const playReverse = this.props.navigation.state.params.playReverse;
      for (
        let i = playReverse ? currentPosition - 1 : currentPosition + 1;
        playReverse ? i >= firstPosition : i <= firstPosition;
        playReverse ? (i -= 1) : (i += 1)
      ) {
        await this.updatePlayerPosition(playerIndex, i);
      }
      if (positionIndices.length > 1) {
        const finalPosition = positionIndices[1];
        await this.updatePlayerPosition(playerIndex, finalPosition);
      }

      resolve();
    });

  updatePlayerPosition = (playerIndex, position) =>
    new Promise(resolve =>
      this.setState(
        {
          [`player${playerIndex}Position`]: position
        },
        () => setTimeout(resolve, 200)
      )
    );

  executeDiceSequence = (position, diceSequence) => {
    const totalOffset = diceSequence.reduce((acc, curr) => acc + curr, 0);
    const playReverse = this.props.navigation.state.params.playReverse;
    const newPosition = playReverse ? position - totalOffset : position + totalOffset;

    const isInvalidPosition = playReverse ? newPosition < 1 : newPosition > this.boardMaxPosition;
    if (isInvalidPosition) {
      return [position];
    }

    const positionIndices = [newPosition];

    const boardValue = this.boardData[newPosition];
    if (boardValue) {
      positionIndices.push(boardValue);
    }

    return positionIndices;
  };

  renderDefaultPositionView = () => {
    const players = [];
    const totalPlayers = this.props.navigation.state.params.numPlayers;
    const playReverse = this.props.navigation.state.params.playReverse;
    for (let i = 0; i < totalPlayers; i += 1) {
      const playerPosition = this.state[`player${i}Position`];
      const baseCondition = playReverse
        ? playerPosition === this.boardMaxPosition + 1
        : playerPosition === 0;
      if (baseCondition) {
        players.push(i);
      }
    }

    return <DefaultPositionView players={players} />;
  };

  renderGameBoard = () => {
    const totalPlayers = this.props.navigation.state.params.numPlayers;
    const playReverse = this.props.navigation.state.params.playReverse;
    const playerPositions = [];
    for (let i = 0; i < totalPlayers; i += 1) {
      const playerPosition = this.state[`player${i}Position`];
      playerPositions.push(playerPosition);
    }

    return (
      <GameBoard
        boardMaxPosition={this.boardMaxPosition}
        boardData={this.boardData}
        playerPositions={playerPositions}
        playReverse={playReverse}
      />
    );
  };

  renderBestSequenceView = () => {
    const currentPlayer = this.state.currentPlayer;
    const currentPlayerPosition = this.state[`player${currentPlayer}Position`];

    const sequence = this.bestSequenceBoard[currentPlayerPosition] || [];
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
        <RollDiceView disableDiceRoll={this.state.disableDiceRoll} onDiceRoll={this.onDiceRoll} />
      </ScrollView>
    );
  }
}
