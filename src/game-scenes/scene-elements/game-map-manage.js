import React, { PureComponent } from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import Popup from "../../menus/menu-items/popup"
import Button from "../../menus/menu-items/button"
import SimpleView from "../../game-scenes/scene-elements/simple-view"
import SimpleText from  "../../game-scenes/scene-elements/simple-font"
import Logic from "../../logic/game-logic"

export default class MapManage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			menu: ""
		};
	}

	getCanUseManageItem = (name) => {
		const itemInLogic = Logic.mapManage.items.filter(x => x.name == name);
		if (itemInLogic && itemInLogic.length > 0) {
			return itemInLogic[0].can(this.props.gameModel, this.props.gameProcessState);
		}

		return false;
	};

	getItemColor = (itemName) => {
		if (this.state.menu == itemName)
			return "yellow";
		if(this.getCanUseManageItem(itemName)) {
			return "white";
		} else {
			return "gray";
		}
	};

	getPopupButtons = () => {
		console.log('test');
		return (
			[
			<Button onPress={_ => this.props.onApply(this.state.menu)}>
				Apply
			</Button>
			,
			<Button onPress={this.props.onQuit}>
				Close
			</Button>
			]
		);
	};
	getStore = () => {
		return (
			Logic.mapManage.items.map(x => (
				this.getListItem(x)
			))
		);
	};
	getListItem = (storeLogicItem) => {
		return (
			<SimpleView 
				key={storeLogicItem.name + storeLogicItem.cost} 
				margins={[0, 20, 0, 40]} 
				touch={this.getCanUseManageItem(storeLogicItem.name)}
				onPress={_ => this.clickElement(storeLogicItem.name)}
				
				>
				<SimpleText 
					fontConfig={
						["ArcadeClassic", 30, this.getItemColor(storeLogicItem.name)]} >
					{storeLogicItem.name} - {storeLogicItem.cost}
				</SimpleText>
			</SimpleView>
		);
	};
	clickElement = (elementName) => {
		if (this.state.menu == elementName) {
			this.setState({
				menu: ""
			});
		} else {
			this.setState({
				menu: elementName
			});
		}
		
	};

	render() {
		return (
			<Popup buttons={this.getPopupButtons()}>
				<SimpleView position={[30, 15, 40, 30]}>
					<Text style={styles.textHeaderStyle}>Manage</Text>
				</SimpleView>
				
				<SimpleView position={[15, 40, 70, 30]}>
					{this.getStore()}
				</SimpleView>
			</Popup>
		);
	}
}

const styles = EStyleSheet.create({
	textStyle: {
		fontSize: 30,
		fontFamily: "ArcadeClassic",
		color: 'white'
	},
	textHeaderStyle: {
		fontSize: 40,
		fontFamily: "ArcadeClassic",
		color: 'white'
	},
	container: {
		margin: 0,
		padding: 0,
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.75)"
	},
	scrollViewContainer: {
		width: () =>
			Math.min(
				EStyleSheet.value("$donkeyKongMenuMaxWidth"),
				Dimensions.get("window").width
			),
		alignSelf: "center",
		justifyContent: "center"
	},
	playGameButton: {
		maxWidth: "$donkeyKongMenuMaxWidth",
		alignSelf: "center",
		marginBottom: 0
	},
	cancelButton: {
		maxWidth: "$donkeyKongMenuMaxWidth",
		alignSelf: "center",
		marginBottom: 30,
		backgroundColor: "#ff4136"
	}
});
