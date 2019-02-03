"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

// Component imports
import SimpleButton from "./components/SimpleButton";
import SearchPageResults from "./components/SearcgPageResults";
import SearchPage from "./components/SearchPage";

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Default App Route. Nothing to be found here.</Text>
      </View>
    );
  }
}

/**
 * Navigation routes defined here
 */
const AppNavigator = createStackNavigator(
  {
    App: {
      screen: App,
      navigationOptions: () => ({
        title: `App`,
        headerBackTitle: null
      })
    },
    SearchPageResults: {
      screen: SearchPageResults,
      navigationOptions: () => ({
        title: `PropertyFinder`,
        headerBackTitle: null
      })
    },
    SearchPage: {
      screen: SearchPage,
      navigationOptions: () => ({
        title: `PropertyFinder`,
        headerBackTitle: null
      })
    }
  },
  {
    initialRouteName: "SearchPage"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 16,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default createAppContainer(AppNavigator);
