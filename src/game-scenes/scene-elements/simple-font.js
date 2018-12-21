import React, { PureComponent } from "react";
import { View, StatusBar, Platform, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";



export default class SimpleFont extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	positionStyleFromArray = () => {

		const fontConfig = this.props.fontConfig;
		
		const result = {};

		result.fontFamily = fontConfig[0];
		result.fontSize = fontConfig[1];
		result.color = fontConfig[2];

		return result;
	};

	render() {

		return (
			<Text
				style={this.positionStyleFromArray()}
				>
				{this.props.children}
			</Text>
		);
	}
}
