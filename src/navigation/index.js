import { StackNavigator } from 'react-navigation';

import HomePage from '../views/HomePage';

console.disableYellowBox = true;

// eslint-disable-next-line new-cap
export default StackNavigator({
  Home: { screen: HomePage }
});
