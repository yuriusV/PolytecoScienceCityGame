import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, ImageBackground, Button, View, TextInput } from 'react-native';
import OnlineTableRecord from './online-table-record';
import Background from "../../assets/menu-background.png";
import manager from "../logic/game-store-manager";


export default class OnlineTable extends Component {

	state = {
		posts: [],
		name: "",
	}

	componentDidMount() {
		axios.get("https://script.google.com/macros/s/AKfycbwwyyGjKl4JXOpUva4ApO7z_xYJwpAJTqrdyzlWqUYRU_mQSKGy/exec?action=read")
			.then(res => {
				const posts = res.data.records;
				this.setState({ posts });
			})
	}

	_publish = () => {
		manager.getSavedGames((games) => {
			console.log(games.map(x => JSON.parse(x.buildings).countPeoples).reduce((a, b) => a + b, 0));
		});
	}

	render() {
		return (
			<ImageBackground source={Background} style={{ width: '100%', height: '100%' }}>
				<View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
					<Button
						onPress={() => this._publish()}
						title="ПОХВАСТАТЬСЯ РЕКОРДОМ"
						color="#841584"
					/>
				</View>
				<TextInput
					style={{ height: 40, borderColor: 'red', borderWidth: 1 }}
					onChangeText={(text) => this.setState({ name: text })}
					value={this.state.name}
				/>
				<ScrollView style={styles.container}>
					{this.state.posts.map((i) => <OnlineTableRecord key={i.name} name={i.name} points={i.points} />)}
				</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: '10%',
		paddingLeft: '20%'
	},
});
