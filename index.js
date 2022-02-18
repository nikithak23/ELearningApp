import 'react-native-gesture-handler';

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

// import App from './App';
import mainNavig from './src/mainNavig';
import AuthenticationScreen from './src/Screens/OnBoardingScreen3';

AppRegistry.registerComponent(appName, () => mainNavig);
