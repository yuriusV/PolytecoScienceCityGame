import React, { PureComponent } from "react";
import { View, StatusBar, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MainMenu from "./src/menus/main";

import Logic from "./src/logic/game-logic"

import NewGamePreview from "./src/game-scenes/new-game-preview";
import GameMap from "./src/game-scenes/game-map";
import SavedGamesMenu from "./src/game-scenes/saved-games-menu";
import OnlineTableMenu from "./src/game-scenes/online-table-menu";
import AccountMenu from "./src/game-scenes/account-menu";
import BlockGame from './src/game-scenes/block-game'

const defaultTheme = {
  $donkeyKongMenuMaxWidth: 500,
  $donkeyKongMenuFont: Platform.OS === "ios" ? "System" : "normal",
  $donkeyKongMenuBackgroundColor: "black",
  $donkeyKongMenuPrimaryColor: "#FF0000",
  $donkeyKongMenuSecondaryColor: "#00FFFF"//"#25D9D9"
};

export default class PolytecoGame extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
	  gameVisible: false,
	  gameMode: null
	};
  }

  async componentWillMount() {
    await EStyleSheet.build(Object.assign({}, defaultTheme, this.props.theme));
  }

  openScene = sceneName => {
	  console.log(sceneName);
	this.setState({gameMode: sceneName});
  };

  openMainMenu = () => {
	  this.setState({gameMode: null});
  };

  render() {
	let currentContainer;
	switch(this.state.gameMode) {
		case Logic.gameScenes.account:
			currentContainer = 
				<AccountMenu onClose={_ => this.openMainMenu()}/>;
			break;
		case Logic.gameScenes.gameMap:
			currentContainer = 
				<NewGamePreview onClose={_ => this.openMainMenu()}/>
			break;
		case Logic.gameScenes.onlineTable:
			currentContainer = 
				<OnlineTableMenu onClose={_ => this.openMainMenu()}/>
			break;
		case Logic.gameScenes.savedGames:
			currentContainer = 
				<SavedGamesMenu onClose={_ => this.openMainMenu()}/>
			break;
		case Logic.gameScenes.blockGame:
			currentContainer = 
				<BlockGame onQuit={_ => this.openMainMenu()} building={{countBlocks: 200}}/>
			break;
		default: 
			currentContainer = 
				<MainMenu onMenuSelect={scene => this.openScene(scene)}/>
			break;
		
	}

    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} hidden={this.state.gameVisible} animated showHideTransition={"slide"} />
        {currentContainer}
      </View>
    );
  }
}

PolytecoGame.defaultProps = {
  theme: defaultTheme
};

const styles = EStyleSheet.create({
  container: {
    flex: 1
  }
});
