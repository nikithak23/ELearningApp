import 'react-native-gesture-handler';

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

//import App from './App';
import mainNavig from './src/mainNavig';
//import AuthenticationScreen from './src/Screens/AuthenticationScreen';

AppRegistry.registerComponent(appName, () => mainNavig);
