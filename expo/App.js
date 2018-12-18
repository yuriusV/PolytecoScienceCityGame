import React from "react";
import { Font } from "expo";
import DonkeyKong from "react-native-donkey-kong";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      ArcadeClassic: require("./assets/fonts/ArcadeClassic.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    return this.state.fontLoaded ? (
      <DonkeyKong
        theme={{
          $donkeyKongMenuFont: "ArcadeClassic"
        }}
      />
    ) : null;
  }
}
