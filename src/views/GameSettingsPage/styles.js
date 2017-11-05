import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 20,
  },
  startGameButton: {
    padding: 20,
  },
  startGameButtonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'dodgerblue'
  },
  numPlayersButton: {
    borderColor: 'lightgray',
    borderRadius: 17,
    borderWidth: 1,
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numPlayersButtonSelected: {
    backgroundColor: 'dodgerblue'
  },
  numPlayersButtonText: {
    fontSize: 20,
  },
  numPlayersButtonTextSelected: {
    color: 'white'
  },
});
