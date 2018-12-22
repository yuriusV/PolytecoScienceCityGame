import React, { PureComponent, Component } from "react";
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


export default class GameMap extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		gameModel: props.gameModel,
		isMenuPopupVisible: false,
		menuContent: {},
		selectedRow: null,
		selectedCol: null
	  };

	  console.log(props.gameModel.id);

	  this.createUpdater();
	}

	getBuildingByType = (type) => {
		return Logic.buildings.items.filter(x => x.type == type)[0];
	};

	createUpdater = () => {
		this.state.interval = setInterval(() => {
			for(let i in this.state.gameModel.buildings) {
				const bModel = this.state.gameModel.buildings[i];
				const b = this.getBuildingByType(bModel.type);
				b.onTimeUpdate && b.onTimeUpdate(this.state.gameModel, this.state, bModel, this.setState.bind(this));
			}
			this.setState({});
		}, 3000);
	};

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
			"big": HouseBig,
			"stone": Stone
		};

		return map[type];
	};

	callPressMap = (row, col) => {
		if (this.state.selectedRow == row && this.state.selectedCol == col) {
			this.setState({
				selectedRow: null,
				selectedCol: null
			});
		} else {
			this.setState({
				selectedRow: row,
				selectedCol: col
			});
		}
		
	};


	drawMap = (map, buildingsA) => {
		const allCells = [];
		const WIDTH = Math.ceil(100 / Model.initialConsts.gameRows);
		const HEIGHT = Math.ceil(100 / Model.initialConsts.gameCols);
		
		for(let row = 0; row < map.length; row++) {
			for(let col = 0; col < map[row].length; col++) {
				const buildings = buildingsA && buildingsA.filter(x => x.position.row == row 
					&& x.position.col == col);

				allCells.push(
					<SimpleView
						key={String(row) + ';' + String(col)}
						style={{
							backgroundColor: 
								this.state.selectedRow == row 
								&& this.state.selectedCol == col ? "yellow": "#555555"}}
						touch
						onPress={_ => this.callPressMap(row, col)}
						position={[col * WIDTH, row * HEIGHT, WIDTH, HEIGHT]}>
						{buildings && buildings.length > 0 ? 
							<Image 
								source={this.getImageByBuilding(
									buildings && buildings[0].type)}
								style={{width: 45, height: 45}}	
								/>	
						: 
						<Image 
							source={this.getImageByTypeMap(map[row][col].type)} 
							style={{top: 3, left: 2, width: 45, height: 45}}/>
						} 
						

						

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
						Money - {Math.floor(this.state.gameModel.money)}
					</Text>  
					<Text style={{fontFamily: "ArcadeClassic", color: "white", fontSize: 30}}>
						Respect - {Math.floor(this.state.gameModel.respect)}
					</Text>
					<Text style={{fontFamily: "ArcadeClassic", color: "white", fontSize: 30}}>
						Gold - {this.state.gameModel.gold}
					</Text>
				</SimpleView>

				<SimpleView style={{backgroundColor: "#555555"}} position={[10, 30, 80, 50]}>
					{this.drawMap(this.state.gameModel.map, this.state.gameModel.buildings)}
				</SimpleView>
				
				<SideButton onPress={this.onClickBackMenu} text="< Menu" position={[0, 90, 50, 10]}/>
				<SideButton onPress={this.onClickManage} text="Manage" position={[50, 90, 50, 10]}/>
				<SideButton onPress={this.onClickStart} text="Start" position={[50, 0, 50, 10]}/>
				<SideButton onPress={this.onClickShop} text="Buy" position={[0, 0, 50, 10]}/>
				
			 	{this.getPopup()}
			</View>) : (
				<BlockGame   
					gameModel={this.state.gameModel}
					building ={this.state.building}
					onQuit={result => this.onBlockGameFinished(result)}/>
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
		this.state.interval && clearInterval(this.state.interval)
		this.props.onClose();
	};

	onClickStart = () => {
		
		this.showPopup(
			<MapStart 
				gameModel={this.state.gameModel}
				gameProcessState={{selectedBuilding: {row: this.state.selectedRow, col: this.state.selectedCol}}} 
				onApply={this.onSelectBuilding} 
				onQuit={this.closePopup}>
				
			</MapStart>
		);
	};
  
	onClickManage = () => {
		this.showPopup(
			<MapManage 
			gameModel={this.state.gameModel}
			gameProcessState={{selectedBuilding: {row: this.state.selectedRow, col: this.state.selectedCol}}} 
			onApply={this.onManageApply} 
			onQuit={this.closePopup}>

			</MapManage>
		)
	};

	onClickShop = () => {
		this.showPopup(
			<MapShop 
			gameModel={this.state.gameModel}
			gameProcessState={{selectedBuilding: {row: this.state.selectedRow, col: this.state.selectedCol}}} 
			onApply={this.onBuy} 
			onQuit={this.closePopup}>

			</MapShop>
		);
	};

	onBlockGameFinished = (result) => {
		this.state.gameModel.buildings.push({
			countPeoples: result.peoples,
			position: {row: this.state.selectedRow, col: this.state.selectedCol},
			type: result.building.type
		});
		this.setState({
			isGameStarted: false
		});
		Manager.updateCurrentGame(this.state.gameModel);
		this.createUpdater();

	}; 

	onSelectBuilding = (menu) => {
		if(menu == "Lucky Stone") {
			this.state.gameModel.buildings.push({
				position: {row: this.state.selectedRow, col: this.state.selectedCol},
				type: "stone"
			});
			Manager.updateCurrentGame(this.state.gameModel);
			return;
		}

		this.state.interval && clearInterval(this.state.interval)
		const building = Logic.buildings.items.filter(x => x.name == menu);
		if (building && building.length > 0) {
			this.state.gameModel.money -= building[0].cost;
			this.setState({isGameStarted: true, selectedBuildingType: menu, building: building[0]});
		}
		
	};

	onBuy = (menuName) => {
		this.closePopup();
		if (!menuName) {
			return;
		}
		const managerItems = Logic.canBuyAtMap.items.filter(x => x.name == menuName);
		if (managerItems && managerItems.length > 0) {
			managerItems[0].modifier(this.state.gameModel);
			Manager.updateCurrentGame(this.state.gameModel);
		}
	}  
	
	onManageApply = (menuName) => {
		this.closePopup();
		if (!menuName) {
			return;
		}
		const managerItems = Logic.mapManage.items.filter(x => x.name == menuName);
		if (managerItems && managerItems.length > 0) {
			managerItems[0].modifier(this.state.gameModel);
			Manager.updateCurrentGame(this.state.gameModel);
		}
		
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