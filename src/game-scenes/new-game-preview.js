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
import MenuButton from "../menus/menu-items/button";
import ReadableBlock from "./scene-elements/readable-block"

import Modal from "../../assets/modals/modal.png";
import Background from "../../assets/menu-background.png";


export default class NewGameMap extends React.Component {
	constructor(props) {
	  super(props); 
	  this.state = {
		currentStoryIndex: 0,
		storyItem: Logic.preHistoryMessages.messages[0],
		gameModel: this.createStartGameModel(),
		currentText: "", 
		isGameRunned: false
	  };

	  //TODO
	  //this.state.gameModel.map = Generator.generateMap();
	  //this.state.gameModel.gold = 100;
	}

	createStartGameModel= () => {
		return Model.modelOfGame();
	}

	getViewForStoryItem = (storyItem) => {
		let enterBox;
		if (storyItem.inputs 
			&& storyItem.inputs.length > 0) {
			enterBox = 
				<TextInput
					style={{height: 40, borderColor: 'red', borderWidth: 1}}
					onChangeText={(currentText) => this.setState({currentText})}
					value={this.state.currentText}
				/>
		} else {
			enterBox = <View>
			</View>
		}

		return (
			<ImageBackground source={Background} 
				style={{width: '100%', height: '100%'}}>
				<ReadableBlock 
					position={[10, 10, 80, 35]} 
					 text={this.state.storyItem.text}/>
				<SimpleView position={[15, 30, 70, 10]}>
					{enterBox}
				</SimpleView>
				
				<SimpleView position={[10, 45, 80, 10]}>
					<MenuButton onPress={this.onNextClick}>
						Next
					</MenuButton>
				</SimpleView>
			</ImageBackground>
		);
	};

	onNextClick = () => {
		this.checkInputs();
		this.moveNext();
	};

	checkInputs = () => {
		if (this.state.storyItem 
			&& this.state.storyItem.inputs 
			&& this.state.storyItem.inputs.length > 0) {

			this.state.gameModel[this.state.storyItem.inputs[0].model] = this.state.currentText;
		}
	}; 

	moveNext = () => {
		if (!Logic.preHistoryMessages.messages.length ||
			Logic.preHistoryMessages.messages.length <= this.state.currentStoryIndex + 1) {
				this.startGame();
		} else {
			this.setState({
				currentStoryIndex: this.state.currentStoryIndex + 1,
				storyItem: Logic.preHistoryMessages.messages[this.state.currentStoryIndex + 1],
				currentText: ""
			});
		}
	}; 

	startGame = () => {
		this.state.gameModel.map = Generator.generateMap();
		this.setState({isGameRunned: true});
	};

	getGameView = () => {
		return (
			<GameMap gameModel={this.state.gameModel} onClose={this.props.onClose}/>
		);
	};
  
	render() {
	  return (
		//TODO
		this.state.isGameRunned/* || true*/ ?
		this.getGameView()
		:
		 this.getViewForStoryItem(this.state.storyItem)
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
  