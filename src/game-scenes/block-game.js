import React, { PureComponent } from "react";
import { StyleSheet, Modal, View, ImageBackground } from "react-native";

import Background from "../../assets/blocks/block-background.png"
import Hook from "../../assets/blocks/hook.png"
import BlockRope from "../../assets/blocks/block-rope.png"
import BlockPerfect from "../../assets/blocks/block-perfect.png";

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
		<ImageBackground source={Background} style={{width: '100%', height: '100%'}}>
		  
		</ImageBackground>
	  );
	}
  }
  
  const styles = StyleSheet.create({
	game: {
	  backgroundColor: "#000"
	}
  });
  