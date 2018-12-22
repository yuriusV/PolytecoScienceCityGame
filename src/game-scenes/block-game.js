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

const MAXDROPS = 4;

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
		blockSpeedY: 2,
		height: 0,
		shatalR: 0,
		shatalPos: 0,
		shatalSpeed: 1,
 
		drops: 0,
		isShowResult: false,
		peoples: 0
	  };
	  
	}

	setShowResult = () => {
		
	};
 

	resetBlock = () => {
		if(this.blocks.length >= this.state.building.countBlocks) {
			this.setShowResult();
		}

		this.state.cranX = 0;
		this.state.isBlockOn = true;
		this.state.height += 10;

		for(const b of this.state.blocks) {
			if(this.state.height > 30)
				b.y += 10;
		}
	};

	checkCatched = () => {
		if(this.state.blocks.length == 0) {
			if(this.state.blockY > 60 && this.state.height <= 30
				|| (this.state.blockY > 95))
				return true;
			return false;
		} else {
			const last = this.state.blocks[this.state.blocks.length - 1];
			return this.state.blockY + 10 >= last.y 
				&& this.state.blockX > last.x - 10
				&& this.state.blockX < last.x + 10;
		}

		return false;
	};

	checkDropped = () => {
		if(this.state.blocks.length > 0 && this.state.blockY > 60 && this.state.height <= 30
			|| (this.state.blockY > 95))

			return true;

			return false;
	};

	onUpdate = () => {
		if (this.state.cranX > 99) {
			this.resetBlock();

		} else {
			this.state.cranX += 1; 
		}

		if (!this.state.isBlockOn) {
			if(this.checkDropped()) {
				this.resetBlock();
				this.state.drops += 1;
				if (this.state.drops >= MAXDROPS) {
					this.setShowResult();
				}
			}

			if (this.state.blockSpeedX > 2)
				this.state.blockSpeedX -= 2;
			this.state.blockX += this.state.blockSpeedX;
			this.state.blockY += this.state.blockSpeedY;
			if(this.checkCatched()) {
				this.state.blocks.push({x: this.state.blockX, y: this.state.blockY})
				this.resetBlock();

				if (this.height >= 50) {
					const diff = Math.abs(this.state.blockX - 
						this.state.blocks[this.state.blocks.length - 1].x);
					this.state.shatalR += (this.state.blocks.length == 0? 0 : 
						diff * 5);
					const sign = this.state.shatalSpeed > 0;
					this.state.shatalSpeed += sign ? diff * 5 : -diff * 5;
	
					if (this.state.shatalPos >= this.state.shatalR) {
						this.state.shatalSpeed = -this.state.shatalSpeed; 
					} else if (this.state.shatalPos <= -this.state.shatalR) {
						this.state.shatalSpeed = -this.state.shatalSpeed; 
					}
					this.state.shatalPos += this.state.shatalSpeed;
				}
				
			}
		}

		this.setState({}); 
	};

	onTap = () => {
		this.state.isBlockOn = false;
		this.state.blockSpeedX = 3;
		this.state.blockX = this.state.cranX;
		this.state.blockY = 20;
	};

  
	render() {
	  return (
		<ImageBackground source={Background} style={{width: '100%', height: '100%'}}>
			<TouchableOpacity onPress={this.onTap} style={{width: '100%', height: '100%', backgroundColor: '#AA'}}>
				<GameLoop onUpdate={this.onUpdate}>
					<SimpleImage x={0} y={0} w={100} h={10}  source={Cran}/>
					<SimpleImage x={this.state.cranX} y={6} w={10} h={10}  source={Hook}/>
					<SimpleImage 
						x={this.state.isBlockOn ? this.state.cranX: this.state.blockX} 
						y={this.state.isBlockOn ? 20: this.state.blockY} 
						w={14} 
						h={10} 
						source={this.state.isBlockOn ? BlockRope: Block}/>

					{this.drawBlocks()}
					<SimpleImage x={0} y={70 + (this.state.height - 30 > 0 ? this.state.height - 30 : 0)} w={100} h={30}  source={Earth}/>
				</GameLoop>
			</TouchableOpacity>
		</ImageBackground>
	  );
	}

	drawBlocks = ()=> {
		return this.state.blocks.map(x =>
			<SimpleImage 
						x={x.x + this.state.shatalPos} 
						y={x.y} 
						w={14} 
						h={10} 
						source={Block}/>
		);
	};
  }
  
  const styles = StyleSheet.create({
	game: {
	  backgroundColor: "#000"
	}
  });
  