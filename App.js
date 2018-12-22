import React from "react";
import { Font } from "expo";
import PolytecoGame from "./Game";
import db from "./src/logic/db"

import manager from "./src/logic/game-store-manager"

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			fontLoaded: false
		};

		manager.ensureTablesExists(() => {
			console.log('yeah');
			
		});
		
	}
	async componentDidMount() {
		await Font.loadAsync({
			ArcadeClassic: require("./assets/fonts/MFRED.ttf")
		});

		this.setState({ fontLoaded: true });
	}
	render() {
		return this.state.fontLoaded ? (
			<PolytecoGame
				theme={{
					$donkeyKongMenuFont: "ArcadeClassic"
				}}
			/>
		) : null;
	}
}
