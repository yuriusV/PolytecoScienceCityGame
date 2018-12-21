import React, { PureComponent } from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";
import Popup from "../../menus/menu-items/popup"
import Button from "../../menus/menu-items/button"

import Logic from "../../logic/game-logic"

export default class MapStart extends PureComponent {
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
			Logic.mapManage.map(x => (
				this.getListItem(x)
			))
		);
	};
	getListItem = (storeLogicItem) => {
		return (
			<Text>
				{storeLogicItem.name}
			</Text>
		);
	};

	render() {
		return (
			<Popup buttons={this.getPopupButtons()}>
				<Text>Manage</Text>
				<View>
					{this.getStore}
				</View>
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
