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
  Button
} from "react-native";
import Background from "../../assets/menu-background.png";
import { map } from "../../node_modules/rxjs/operators";

import SideButton from './scene-elements/side-button'
import SimpleView from './scene-elements/simple-view'
import Popup from '../menus/menu-items/popup'
import BlockGame from './block-game';

import Logic from "../logic/game-logic";
import Model from "../logic/game-model";
import Manager from "../logic/game-store-manager";

import MapManage from "./scene-elements/game-map-manage";
import MapShop from "./scene-elements/game-map-shop"
import MapStart from "./scene-elements/game-map-start"

import HouseSmall from "../../assets/tiles/small.png"
import HouseMedium from "../../assets/tiles/medium.png"
import HouseBig from "../../assets/tiles/big.png"
import Grass from "../../assets/tiles/grass.jpg"
import Stone from "../../assets/tiles/stone.png"
import Park from "../../assets/tiles/park.png"
import Fence from "../../assets/tiles/fence.png"
import Ruined from "../../assets/tiles/ruined.png"


export default class GameMap extends PureComponent {
	constructor(props) {
	  super(props);
	  this.state = {
		gameModel: props.gameModel,
		isMenuPopupVisible: false,
		menuContent: {}
	  };
	}

	getImageByTypeMap = (type) => {
		const map = {
			"empty": Ruined,
			"grass": Grass,
			"forest": Park
		};
		return map[type] || Ruined;
	};

	getImageByBuilding = (type) => {
		const map = {
			"small": HouseSmall,
			"medium": HouseMedium,
			"big": HouseBig
		};

		return map(type);
	};

	drawMap = (map, buildings) => {
		const allCells = [];
		const WIDTH = Math.ceil(100 / Model.initialConsts.gameRows);
		const HEIGHT = Math.ceil(100 / Model.initialConsts.gameCols);

		for(let row = 0; row < map.length; row++) {
			for(let col = 0; col < map[row].length; col++) {
				const buildings = buildings && buildings.filter(x => x.row == row && x.col == col);

				allCells.push(
					<SimpleView 
						position={[col * WIDTH, row * HEIGHT, WIDTH, HEIGHT]}>
						<Image 
							source={this.getImageByTypeMap(map[row][col].type)} 
							style={{width: 45, height: 45}}/>

						{buildings && buildings.length > 0 ? 
							<Image 
								source={this.getImageByBuilding(
									buildings && buildings[0].type)}
								style={{width: 45, height: 45}}	
								/>	
						: null} 

					</SimpleView>
				);
			}
		}

		return allCells;
	}
  
	render() {

	  return (
		<ImageBackground source={Background} style={{width: '100%', height: '100%'}}>
			{!this.state.isGameStarted ?
			(<View style={{width: '100%', height: '100%'}}>
				<SimpleView
					style={{backgroundColor: "#AA"}}
					position={[20, 14, 40, 10]}>
				
					<Text style={{fontFamily: "ArcadeClassic", color: "white", fontSize: 30}}>
						Money - {this.state.gameModel.money}
					</Text>
					<Text style={{fontFamily: "ArcadeClassic", color: "white", fontSize: 30}}>
						Respect - {this.state.gameModel.respect}
					</Text>
				</SimpleView>

				<SimpleView style={{backgroundColor: "#00EE00"}} position={[10, 30, 80, 50]}>
					{this.drawMap(this.state.gameModel.map, this.state.gameModel.buildings)}
				</SimpleView>
				
				<SideButton onPress={this.onClickBackMenu} text="< Menu" position={[0, 90, 50, 10]}/>
				<SideButton onPress={this.onClickManage} text="Manage" position={[50, 90, 50, 10]}/>
				<SideButton onPress={this.onClickStart} text="Start" position={[50, 0, 50, 10]}/>
				<SideButton onPress={this.onClickShop} text="Buy" position={[0, 0, 50, 10]}/>
				
				{this.getPopup}
			</View>) : (
				<BlockGame onFinish={result => this.onBlockGameFinished(result)}/>
			)}
		</ImageBackground>
	  );
	}

	getPopup = () => {
		return this.state.isMenuPopupVisible ? 
				this.state.popupContent : null;
	};

	onClickBackMenu = () => {
		Manager.updateCurrentGame(this.state.gameModel);
		this.props.onClose();
	};

	onClickStart = () => {
		
		this.showPopup(
			<MapStart onSubmitBuild={this.onSubmitBuild} onQuit={this.closePopup}>
				
			</MapStart>
		);
	};

	onClickManage = () => {
		this.showPopup(
			<MapManage onApply={this.onManageApply} onQuit={this.closePopup}>

			</MapManage>
		)
	};

	onClickShop = () => {
		this.showPopup(
			<MapShop onBuy={this.onBuy} onQuit={this.closePopup}>

			</MapShop>
		);
	};

	onBlockGameFinished = (result) => {

	};

	onBuy = () => {
		this.showPopup();
	};

	onManageApply = (result) => {

	};

	onSubmitBuild = (building) => {
		Manager.updateCurrentGame(this.state.gameModel);
		this.setState({isGameStarted: true});
	};

	showPopup = (content) => {
		this.setState({isMenuPopupVisible: true, popupContent: content});
	};

	closePopup= () => {
		this.setState({isMenuPopupVisible: false});
	};
  }
  
 var styles = StyleSheet.create({
  keyboard: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
});