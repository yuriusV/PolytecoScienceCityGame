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

	drawMap = (map, buildings) => {
		const result = [];
		for(const row of map) {
			const rowUiItems = [];
			for(const cell of row) {
				const buildingsOnCell = buildings.filter(x => x.row == 0); //todo
				rowUiItems.push(this.drawCell(cell, buildingsOnCell && buildingsOnCell[0]));
			}
			const uiRow = <View style={styles.row}>{rowUiItems}</View>
			result.push(uiRow);
		}
	}
  
	render() {
	  return (
		<ImageBackground source={Background} style={{width: '100%', height: '100%'}}>
			<View style={{width: '100%', height: '100%'}}>
				<SimpleView
					style={{backgroundColor: "#BBBBBB"}}
					position={[30, 10, 40, 10]}>
				
					<Text>
						Money - {this.state.gameModel.money}
					</Text>
					<Text>
						Respect - {this.state.gameModel.respect}
					</Text>
				</SimpleView>

				<SimpleView style={{backgroundColor: "#BBBBBB"}} position={[10, 20, 80, 30]}>
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