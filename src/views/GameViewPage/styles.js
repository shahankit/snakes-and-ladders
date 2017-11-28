import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const cellSize = (windowWidth - 3) / 10;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
  },
  gameOverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    fontSize: 20,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'dodgerblue'
  },
  bestSequenceContainer: {
    paddingHorizontal: 20,
  },
  bestSequenceLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bestSequenceLabel: {
    fontSize: 16,
  },
  sequenceItem: {
    height: 20,
    paddingHorizontal: 4,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBoard: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cellContainer: {
    width: cellSize,
    height: cellSize,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellContainerLadder: {
    backgroundColor: 'green',
  },
  cellContainerSnake: {
    backgroundColor: 'red',
  },
  cellText: {
    fontSize: 8,
  },
  cellTextWhite: {
    color: 'white',
  },
  defaultPositionView: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerIconBlue: {
    backgroundColor: 'blue',
  },
  playerIconBlack: {
    backgroundColor: 'black'
  },
  playerIconViolet: {
    backgroundColor: 'blueviolet',
  },
  playerIconBrown: {
    backgroundColor: 'brown'
  },
  playerIconText: {
    fontSize: 16,
    color: 'white'
  },
  defaultPlayerIcon: {
    marginRight: 10,
  },
  defaultPlayerText: {
    backgroundColor: 'transparent',
  },
  currentPlayerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  currentPlayerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  rollDiceView: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  rollDiceButton: {
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'lightgray',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledRollDiceButton: {
    backgroundColor: 'red'
  },
  diceTextContainer: {
    marginTop: 8,
    height: 50,
    width: 50,
    alignSelf: 'center',
    backgroundColor: 'slategray',
    borderWidth: 2,
    borderColor: 'dimgray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diceText: {
    fontSize: 30,
    color: 'white',
  },
  boardCellPlayers: {
    position: 'absolute',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  boardCellPlayer: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  boardCellPlayerText: {
    fontSize: 8,
  },
  emptyBottomView: {
    height: 30,
  },
});
