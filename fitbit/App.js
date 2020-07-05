import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AppData from './components/AppData';
import FitBit from './components/FitBit';
import SecondPage from './components/SecondPage';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

const AppNavigator = createStackNavigator(
  {
    AppData: AppData,
    FitBit: FitBit,
    SecondPage: SecondPage,
  },
  {
    intialRouteName: AppData,
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

