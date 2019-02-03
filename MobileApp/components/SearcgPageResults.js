"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text
} from "react-native";

export default class SearchPageResults extends Component {
  _keyExtractor = (item, index) => index;

  _renderItem = ({ item }) => {
    return (
      <TouchableHighlight underlayColor="#dddddd">
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  // Listings will be passed to props from the parents SearchPage component
  render() {
    const listingsFromSearchPage = this.props.navigation.getParam(
      "listings",
      []
    ); // id, default value
    return (
      <FlatList
        data={listingsFromSearchPage}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: "#dddddd"
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#48BBEC"
  },
  title: {
    fontSize: 20,
    color: "#656565"
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10
  }
});
