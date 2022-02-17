/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';



//import App from './App';
import mainNavig from './src/mainNavig';

AppRegistry.registerComponent(appName, () => mainNavig);
