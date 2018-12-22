import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';


export default class OnlineTableRecord extends Component {

	constructor(props) {
		super(props);
		this.name = this.props.name;
		this.points = this.props.points;
	}

	render() {

		return (
			<Text style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <Text style={styles.name}>{this.props.name}{'    '}</Text> 
                <Text style={styles.points}>{this.props.points}</Text> 
            </Text>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: '5%',
		paddingLeft: '10%'
	},
	name: {
		color: 'red',
		fontSize: 20,
		textAlign: 'justify',
		lineHeight: 30,
		fontWeight: 'bold',
	},
	points: {
		color: 'red',
		fontSize: 25,
		textAlign: 'justify',
		lineHeight: 30,
	},
});