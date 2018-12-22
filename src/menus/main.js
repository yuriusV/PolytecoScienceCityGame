import React, { PureComponent } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  ImageBackground,
  Image
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MenuButton from "./menu-items/button";
import Item from "./item";
import Logo from "../../assets/logo.png";
import Background from "../../assets/menu-background.png";
import Logic from "../logic/game-logic"

export default class MainMenu extends PureComponent {
	render() {
		return (
		<ImageBackground source={Background} style={{width: '100%', height: '100%'}}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}>

				<Image source={Logo} style={{width: 250, height: 80}}/>
				<MenuButton 
					onPress={_ => this.props.onMenuSelect(Logic.gameScenes.blockGame)}>
					Quick block game
				</MenuButton>
				<MenuButton 
					onPress={_ => this.props.onMenuSelect(Logic.gameScenes.gameMap)}>
					New game
				</MenuButton>
				<MenuButton 
					onPress={_ => this.props.onMenuSelect(Logic.gameScenes.savedGames)}>
					Saved games
				</MenuButton>
				<MenuButton 
					onPress={_ => this.props.onMenuSelect(Logic.gameScenes.onlineTable)}>
					Online table
				</MenuButton>
				<MenuButton 
					onPress={_ => this.props.onMenuSelect(Logic.gameScenes.account)}>
					Account
				</MenuButton>

				<Item
				onPress={_ => Linking.openURL("https://github.com")}
				>
				Source code
				</Item>
				<Item>
				Created by Brodyaga's group
				</Item>
			</ScrollView>
		</ImageBackground>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
	  paddingTop: '16%',
	  paddingLeft: '10%'
  },
  contentContainer: {
    maxWidth: "$donkeyKongMenuMaxWidth",
    alignSelf: "center",
    alignItems: "center"
  }
});
