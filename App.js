import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLogin';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen: {screen: SignupLoginScreen}, Drawer: {screen: AppDrawerNavigator}
});

const AppContainer = createAppContainer(switchNavigator);