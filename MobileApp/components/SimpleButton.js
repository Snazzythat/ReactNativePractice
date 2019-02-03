import React, { Component } from "react";
import { Button, Text, View, NavigatorIOS } from "react-native";

export default class SimpleButton extends Component {
  constructor() {
    super();
    this.state = {
      buttonPresses: 0
    };
  }

  onPressHandler = () => {
    this.setState(prevState => {
      return { buttonPresses: prevState.buttonPresses + 1 };
    });
  };

  render() {
    return (
      <View>
        <Button
          onPress={this.onPressHandler}
          title={this.props.buttonName}
          color="#841584"
          accessibilityLabel="Click Me"
        />
        <Text>Button was pressed: {this.state.buttonPresses} times.</Text>
      </View>
    );
  }
}

SimpleButton.defaultProps = { buttonName: "Simple Button" };
