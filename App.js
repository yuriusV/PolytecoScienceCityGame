import React from "react";
import { Font } from "expo";
import PolytecoGame from "./Game";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      ArcadeClassic: require("./assets/fonts/MFRED.ttf")
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    return this.state.fontLoaded ? (
      <PolytecoGame
        theme={{
          $donkeyKongMenuFont: "ArcadeClassic"
        }}
      />
    ) : null;
  }
}
