import React, { PureComponent } from "react";
import { View, StatusBar, Platform, Text, StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";



export default class SideButton extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
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
			<View
				style={this.positionStyleFromArray(this.props.position)}>
				<Text style={styles.textStyle}>
					{this.props.text}
				</Text>
			</View>
		);
	}
}


const styles = EStyleSheet.create({
	container: {
	  flex: 1
	},
	textStyle: {
		color: 'white',
		fontFamily: 'ArcadeClassic',
		fontSize: 20
	}
});