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

import Logic from "../logic/game-logic";
import Model from "../logic/game-model";

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
		gameModel: props.gameModel
	  };
	}

	drawCell = (cell, building) => {
		return <View><Text>sadf</Text></View>
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
					<SimpleView position={[col * WIDTH, row * HEIGHT, WIDTH, HEIGHT]}>
						<Image source={this.getImageByTypeMap(map[row, col].type)} style={{width: 60, height: 60}}/>
						{buildings && buildings.length > 0 ? 
							<Image source={this.getImageByBuilding(buildings && buildings[0].type)}/>	
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
			<View style={{width: '100%', height: '100%'}}>
				<SimpleView
					style={{backgroundColor: "#BBBBBB"}}
					position={[20, 14, 40, 10]}>
				
					<Text>
						Money - {this.state.gameModel.money}
					</Text>
					<Text>
						Respect - {this.state.gameModel.respect}
					</Text>
				</SimpleView>

				<SimpleView style={{backgroundColor: "#BBBBBB"}} position={[10, 30, 80, 50]}>
					{this.drawMap(this.state.gameModel.map, this.state.gameModel.buildings)}
				</SimpleView>
				
				<SideButton text="Menu" position={[0, 90, 50, 10]}/>
				<SideButton text="Manage" position={[50, 90, 50, 10]}/>
				<SideButton text="Start" position={[50, 0, 50, 10]}/>
				<SideButton text="Buy" position={[0, 0, 50, 10]}/>
				
			</View>
		</ImageBackground>
	  );
	}
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