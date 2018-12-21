import React, { PureComponent } from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import Popup from "../../menus/menu-items/popup"
import Button from "../../menus/menu-items/button"
import SimpleView from "../../game-scenes/scene-elements/simple-view"
import SimpleText from "../../game-scenes/scene-elements/simple-font"

import Logic from "../../logic/game-logic"

export default class MapShop extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getPopupButtons = () => {
		console.log('test');
		return (
			[
			<Button onPress={this.props.onApply}>
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
			Logic.canBuyAtMap.products.map(x => (
				this.getListItem(x)
			))
		);
	};
	getListItem = (storeLogicItem) => {
		return (
			<SimpleText fontConfig={["ArcadeClassic", 30, "white"]}>
				{storeLogicItem.name} - {storeLogicItem.cost} gold
			</SimpleText>
		);
	};

	render() {
		return (
			<Popup buttons={this.getPopupButtons()}>
				<SimpleView position={[30, 15, 40, 30]}>
					<SimpleText fontConfig={["ArcadeClassic", 40, "white"]}>Shop</SimpleText>
				</SimpleView>
				
				<SimpleView position={[15, 40, 70, 30]}>
					{this.getStore()}
				</SimpleView>
				
			</Popup>
		);
	}
}

const styles = EStyleSheet.create({
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
