import { StackNavigator } from 'react-navigation';

import HomePage from '../views/HomePage';
import GameSettingsPage from '../views/GameSettingsPage';
import GameViewPage from '../views/GameViewPage';

// eslint-disable-next-line new-cap
export default StackNavigator({
  Home: { screen: HomePage },
  GameSettings: { screen: GameSettingsPage },
  GameView: { screen: GameViewPage },
});
