import React, { PureComponent } from "react";
import { View, StatusBar, Platform, Text, TouchableOpacity } from "react-native";
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
		const margins = this.props.margings;
		const paddings = this.props.paddings;

		let result = {};
		if (array && array.length === 4) {
			result = {
				position: 'absolute',
				left: str(array[0]),
				top: str(array[1]),
				width: str(array[2]),
				height: str(array[3])
			};

			for (const i in this.props.style) {
				result[i] = this.props.style[i];
			}
		}

		if (margins && margins.length === 4) {
			result['marginLeft'] = margins[0];
			result['marginTop'] = margins[1];
			result['marginRight'] = margins[2];
			result['marginBottom'] = margins[3];
		}

		if (paddings && paddings.length == 4) {
			result['paddingLeft'] = paddings[0];
			result['paddingTop'] = paddings[1];
			result['paddingRight'] = paddings[2];
			result['paddingBottom'] = paddings[3];
		}

		result.flex = 1;
		return result;
	};

	render = () => {

		return (
			this.props.touch ? this.renderTouch() : this.renderView()
		);
	}

	renderView = () => {
		return (
			<View
				style={this.positionStyleFromArray()}
				onPress={this.props.onPress}
				>
				{this.props.children}
			</View>
		);
	}

	renderTouch = () => {
		return (
			<TouchableOpacity
				style={this.positionStyleFromArray()}
				onPress={this.props.onPress}
				>
				{this.props.children}
			</TouchableOpacity>
		);
	}
}
