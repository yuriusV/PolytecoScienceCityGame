import React, { PureComponent } from "react";
import { StyleSheet, Modal, View, ImageBackground, TouchableOpacity } from "react-native";

import Background from "../../assets/blocks/block-background.png"
import Hook from "../../assets/blocks/hook.png"
import BlockRope from "../../assets/blocks/block-rope.png"
import Block from "../../assets/blocks/block.png"
import BlockPerfect from "../../assets/blocks/block-perfect.png";
import Cloud from "../../assets/blocks/cloud.png";
import Cran from "../../assets/blocks/cran.png";
import Earth from "../../assets/blocks/earth.png";

import SimpleView from "./scene-elements/simple-view"
import SimpleImage from "./scene-elements/simple-image"
import { GameLoop } from "react-native-game-engine";

export default class GameMap extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		cranX: 0,
		earthY: 80,
		blocks: [], 
		blockX: 0,
		blockY: 0,
		isBlockOn: true,
		blockSpeedX: 0,
		blockSpeedY: 3
	  };
	  
	}


	resetBlock = () => {
		this.state.cranX = 0;
		this.state.isBlockOn = true;
	};

	onUpdate = () => {
		if (this.state.cranX > 99) {
			this.resetBlock();

		} else {
			this.state.cranX += 2; 
		}

		if (!this.state.isBlockOn) {
			if(this.state.blockY > 97) {
				this.resetBlock();
			}

			if (this.state.blockSpeedX > 2)
				this.state.blockSpeedX -= 2;
			this.state.blockX += this.state.blockSpeedX;
			this.state.blockY += this.state.blockSpeedY;
		}

		this.setState({});
	};

	onTap = () => {
		this.state.isBlockOn = false;
		this.state.blockSpeedX = 6;
		this.state.blockX = this.state.cranX;
		this.state.blockY = 20;
	};

  
	render() {
	  return (
		<ImageBackground source={Background} style={{width: '100%', height: '100%'}}>
			<TouchableOpacity onPress={this.onTap} style={{width: '100%', height: '100%', backgroundColor: '#AA'}}>
				<GameLoop  onUpdate={this.onUpdate}>
					<SimpleImage x={this.state.cranX} y={10} w={10} h={10}  source={Hook}/>
					<SimpleImage 
					x={this.state.isBlockOn ? this.state.cranX: this.state.blockX} 
					y={this.state.isBlockOn ? 20: this.state.blockY} 
					w={10} 
					h={10} 
					source={this.state.isBlockOn ? BlockRope: Block}/>
				</GameLoop>
			</TouchableOpacity>
		</ImageBackground>
	  );
	}
  }
  
  const styles = StyleSheet.create({
	game: {
	  backgroundColor: "#000"
	}
  });
  