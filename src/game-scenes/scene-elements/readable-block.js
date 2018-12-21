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
	TextInput
} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import SimpleView from './simple-view'
import SimpleText from './simple-font'


export default class ReadableBlock extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		};

	}

	render() {
		return (
			<SimpleView 
				style={styles.blockBackground} 
				position={this.props.position}
				paddings={[10, 10, 10, 10]}>
				<SimpleText fontConfig={["ArcadeClassic", 25, "black"]}>
					{this.props.text}
				</SimpleText>
			</SimpleView>
		);
	}
}

const styles = EStyleSheet.create({
	blockBackground: {
		backgroundColor: "lemonchiffon"
	}
});
