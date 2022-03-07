import 'react-native-gesture-handler';

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import App from './App';
// import MainNavig from './src/mainNavig';
//import ProfileScreen from './src/Screens/ProfileScreen';
import ResultsScreen from './src/Screens/ResultScreen';
import Dropdown from './src/components/Dropdown';
import CourseScreen from './src/Screens/CourseScreen';
import ChapterScreen from './src/Screens/ChapterScreen';
// import AuthenticationScreen from './src/Screens/SignInScreen';

AppRegistry.registerComponent(appName, () => App);
