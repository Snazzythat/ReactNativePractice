"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";

export default class SearchPage extends Component<{}> {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      searchString: "London",
      isLoading: false,
      errorMessage: ""
    };
  }

  urlForQueryAndPage(key, value, pageNumber) {
    const data = {
      country: "uk",
      pretty: "1",
      encoding: "json",
      listing_type: "buy",
      action: "search_listings",
      page: pageNumber
    };
    data[key] = value;

    const querystring = Object.keys(data)
      .map(key => key + "=" + encodeURIComponent(data[key]))
      .join("&");

    return "https://api.nestoria.co.uk/api?" + querystring;
  }

  _onSearchTextChangedHandler = event => {
    console.log("_onSearchTextChanged");
    //This is bad call for satte by using the object directly. Need to use function call instead
    //this.setState({ searchString: event.nativeEvent.text });
    let newInput = event.nativeEvent.text;
    this.setState((previousState, currentProps) => {
      return { searchString: newInput };
    });
  };

  _handleResponse = response => {
    // we first set state to non loading and no error for now
    this.setState((previousState, currentProps) => {
      return { isLoading: !previousState.isLoading, message: "" };
    });

    if (response.application_response_code.substr(0, 1) === "1") {
      console.log("Properties found: " + response.listings.length);
      // At this point we need to set the properties in the props on navigator and switch to the child
      //search page component
      this.props.navigation.navigate("SearchPageResults", {
        listings: response.listings
      });
    } else {
      this.setState((previousState, currentProps) => {
        return { message: "Location not recognized; please try again." };
      });
    }
  };

  _executeQuery = query => {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: "Something bad happened " + error
        })
      );
  };

  _onSearchPressed = () => {
    const query = this.urlForQueryAndPage(
      "place_name",
      this.state.searchString,
      1
    );
    this._executeQuery(query);
  };

  /**
   * Render method
   */
  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <View style={styles.container}>
        <Text style={styles.description}>Search for houses to buy!</Text>
        <Text style={styles.description}>
          Search by place-name or postcode.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChangedHandler} // Now with this handler, the value will be changed and updated in the state
            placeholder="Search via name or postcode"
          />
          {/* <Button onPress={() => { }} color="#48BBEC" title="Go" /> */}
          <TouchableOpacity
            style={styles.button}
            onPress={this._onSearchPressed}
          >
            <Text> Go </Text>
          </TouchableOpacity>
        </View>
        <Image source={require("../assets/house.png")} style={styles.image} />
        {spinner}
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#656565"
  },
  container: {
    padding: 30,
    alignItems: "center"
  },
  flowRight: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch"
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#48BBEC",
    borderRadius: 8,
    color: "#48BBEC"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#48BBEC",
    padding: 10,
    color: "#48BBEC",
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 50
  },
  image: {
    width: 217,
    height: 138
  }
});
