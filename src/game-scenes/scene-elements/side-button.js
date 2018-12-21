import React, { PureComponent } from "react";
import { View, StatusBar, Platform, Text, TouchableOpacity  } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";


export default class SideButton extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			text: props.text,
			position: props.position
		};
	}

	positionStyleFromArray = (array) => {
		const str = n => String(n) + '%';
		const result = {
			position: 'absolute',
			left: str(array[0]), 
			top: str(array[1]), 
			width: str(array[2]), 
			height: str(array[3]),
			backgroundColor: '#1100BB'
		};
		return result;
	};

	render() {

		return (
			<TouchableOpacity 
				onPress={this.props.onPress}
				style={this.positionStyleFromArray(this.state.position)}>
				<Text style={{
					color: 'white',
					fontFamily: "ArcadeClassic", 
					fontSize: 40,
					textAlignVertical: "center",
					textAlign: "center"}}>

					{this.state.text}
				</Text>
			</TouchableOpacity >
		);
	}
}
