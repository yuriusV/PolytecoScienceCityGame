import React, { PureComponent } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput
} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

import Logic from "../logic/game-logic";
import Model from "../logic/game-model";
import Generator from "../logic/generator";

import SimpleView from './scene-elements/simple-view'
import SimpleText from './scene-elements/simple-font'
import GameMap from './game-map';
import ReadableBlock from "./scene-elements/readable-block"

import Modal from "../../assets/modals/modal.png";
import Background from "../../assets/menu-background.png";
import manager from "../logic/game-store-manager"

import MenuButton from "../menus/menu-items/button";

export default class SavedGamesMenu extends React.Component {
	constructor(props) {
	  super(props); 
	  this.state = {
		games: [],
		isGameStarted: false
	  };

	  manager.getSavedGames((games) => {
		  console.log(games.map(x => x.Id))
		this.setState({
			games
		});
	  });
	}

	selectStartGame = (game) => {
		this.setState({isGameStarted: true, gameModel: game});
	};

	drawList = () => {
		return this.state.games.map(x =>
			<SimpleView
				key={x.id}
				touch
				onPress={_ => this.selectStartGame(x)}
			>
				<SimpleText fontConfig={["ArcadeClassic", 20, "white"]}>
		{x.gameUserName} ({x.gameCity}), money: {Math.floor(x.money)}, respect: {Math.floor(x.respect)}
				</SimpleText>
			</SimpleView>
		);
	};

	render() {
	  return (
		  this.state.isGameStarted ?
			<GameMap gameModel={this.state.gameModel} onClose={this.props.onClose}>

			</GameMap>
		:
		<ImageBackground source={Background} 
				style={{width: '100%', height: '100%'}}>
			
			<SimpleView position={[10, 10, 80, 70]}>
				<SimpleView position={[10, 0, 80, 10]}>
					<SimpleText fontConfig={["ArcadeClassic", 40, "white"]}>Сохраненные</SimpleText>
				</SimpleView>
				<SimpleView position={[10, 20, 80, 70]}>
					{this.state.games.length > 0 ? this.drawList() :
						<SimpleText fontConfig={["ArcadeClassic", 23, "white"]}>
							Сохраненных нет
						</SimpleText>
					}
				</SimpleView>

				<SimpleView position={[10, 90, 80, 10]}>
					<MenuButton onPress={this.props.onClose}>
						Назад
					</MenuButton>
				</SimpleView>
			</SimpleView>
		</ImageBackground>
		  
	  );
	}
  }
  
  const styles = EStyleSheet.create({
	buttonContainer: {
	  backgroundColor: "$donkeyKongMenuPrimaryColor",
	  borderRadius: 11,
	  flexDirection: "row",
	  marginLeft: 30,
	  marginRight: 30,
	  marginTop: 20,
	  marginBottom: 20,
	  shadowOffset: { width: 0, height: 4 },
	  shadowColor: "$donkeyKongMenuSecondaryColor",
	  shadowOpacity: 1,
	  shadowRadius: 0,
	  elevation: 4
	},
	textContainer: {
	  backgroundColor: "transparent",
	  flex: 1,
	  height: 50,
	  alignItems: "center",
	  justifyContent: "center"
	},
	text: {
	  fontSize: 30,
	  color: "black",
	  textShadowOffset: { width: 0, height: 1 },
	  textShadowColor: "black",
	  textShadowRadius: 2,
	  fontFamily: "$donkeyKongMenuFont"
	}
  });
  