import React, { PureComponent } from "react";
import { View, StatusBar, Platform, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";



export default class SimpleView extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	positionStyleFromArray = () => {
		const str = n => String(n) + '%';

		const array = this.props.position;
		const isRound = this.props.round;

		const result = {
			position: 'absolute',
			left: str(array[0]), 
			top: str(array[1]), 
			width: str(array[2]), 
			height: str(array[3])
		};

		for(const i in this.props.style) {
			result[i] = this.props.style[i];
		}

		return result;
	};

	render() {

		return (
			<View
				style={this.positionStyleFromArray()}>
					{this.props.children}
			</View>
		);
	}
}
