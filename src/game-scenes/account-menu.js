import React, { PureComponent } from "react";
import { StyleSheet, Modal, View } from "react-native";

export default class GameMap extends PureComponent {
	constructor(props) {
	  super(props);
	  this.state = {
		running: false,
		gameOver: false,
		princessRescued: false
	  };
	}
  
	render() {
	  return (
		<View
		>
		  
		</View>
	  );
	}
  }
  
  const styles = StyleSheet.create({
	game: {
	  backgroundColor: "#000"
	}
  });
  