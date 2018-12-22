import React, { PureComponent } from "react";
import { View, StatusBar, Platform, Text, TouchableOpacity, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import SimpleView from "./simple-view"



export default class SimpleImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	getStyle = () => ({left: this.props.x + '%', top: this.props.y + '%', width: this.props.w + '%', height: this.props.h + '%', position: 'absolute', flex: 1});

	render = () => {
		return (
			<View
				style={this.getStyle()}
				>
				<Image source={this.props.source} style={{width: '100%', height: '100%'}}/>
			</View>
		);
	}
}
