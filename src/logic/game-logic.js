import Small from "../../assets/tiles/small.png"
import Medium from "../../assets/tiles/medium.png"
import Big from "../../assets/tiles/big.png"
import Stone from "../../assets/tiles/stone.png"


const gameScenes = {
	gameMap: "GameMap",
	onlineTable: "OnlineTable",
	savedGames: "SavedGames",
	account: "Account",
	blockGame: "BlockGame"
};

const preHistoryMessages = {
	messages: [
		{
			text: `Вы легендарный професор с мировым именем. Введите Ваше имя, Профессор`,
			inputs: [
				{
					model: "gameUserName"
				}
			]
		},
		{
			text: `Вы получили ответственную миссию создать начный город будущего POLYTECO SCIENCE CITY. Переименуйте его:`,
			inputs: [
				{
					model: "gameCity"
				}
			]
		},
		{
			text: `Отлично, профессор, теперь Вы строите город, Вам нужно постороить как можно больше больших сданий.`,
			inputs: []
		},
		{
			text: `Заселить как можно больше людей туда и не дать студентам их сжечь.`,
			inputs: []
		},
		{
			text: `Для этого вы должны рационально использовать кредиты для построек, как можно ровнее строить, кормить студентов шаурмой, оставлять им места для пьянок, хакатонов.`,
			inputs: []
		}
	]
};

const canBuyAtMap = {
	items: [
		{
			name: "Allow build",
			cost: 50,
			modifier(gameModel, config) {
				if(!config || !config.row) {
					return;
				}

				gameModel.allowBuilds.push({row: config.row, col: config.col})
				gameModel.gold -= 50;
			},
			can(gameModel) {
				return gameModel.gold >= 50;
			}
		},
		{
			name: "Get 50 credits",
			cost: 50,
			modifier(gameModel, config) {
				gameModel.gold -= 50
				gameModel.money += 50
			},
			can(gameModel) {
				return gameModel.gold > 50;
			}
		}
	]
};

const mapManage = {
	items: [
		{
			name: "Build lucky stone",
			cost: 300,
			modifier(gameModel, config) {
				gameModel.money -= 300;
				gameModel.buildings.push({
					type: "stone",
					position: {
						row: config.selectedRow,
						col: config.selectedCol
					}
				});
			},
			can(gameModel, config) {
				const hasBuilding = gameModel.buildings.filter(
					x => x.position.row == config.selectedRow
						&& x.position.col == config.selectedCol);

				return 
					gameModel.money >= 300 
					&& gameModel.respect > 10
					&& !hasBuilding
				;
			}
		},
		{
			name: "Buy shaurma",
			cost: 50,
			modifier(gameModel, config) {
				gameModel.respect += 50;
				gameModel.money -= 50;
			},
			can(gameModel, config) {
				return gameModel.money >= 50;
			}
		},
		{
			name: "Destroy building",
			cost: 10,
			modifier(gameModel, config) {
				const bs = gameModel.buildings.filter(x => 
					x.row == config.row 
					&& x.col == config.col);
				
				if (bs.length !== 1) {
					return false;
				}

				gameModel.buildings = gameModel.buildings.filter(x =>
					!(
						x.row == config.row
						&& x.col == config.col
					));
			},
			can(gameModel, config) {
				return gameModel.money >= 10 && config.selectedBuilding.row !== null;
			}
		}
	]
};

const buildings = {
	items: [
		{
			name: "Small",
			type: "small",
			image: Small,
			cost: 100,
			peoplesMax: 100,
			countBlocks: 10,
			paymentFromOnePeople: 0.001,
			respectFromOnePeople: 0.001,

			can(gameModel, config) {
				return gameModel.money >= 100;
			},
			onTimeUpdate(gameModel, config, building, stateUpdater) {
				console.log(gameModel.respect);
				gameModel.respect += building.countPeoples * 0.001;
				gameModel.money += building.countPeoples * 0.001;
				
			}
		},
		{
			name: "Medium",
			type: "medium",
			image: Medium,
			cost: 200,
			peoplesMax: 200,
			countBlocks: 20,
			paymentFromOnePeople: 0.002,
			respectFromOnePeople: 0.002,

			can(gameModel, config) {
				return gameModel.money >= 200;
			},
			onTimeUpdate(gameModel, config, building, stateUpdater) {
				gameModel.respect += building.countPeoples * 0.002;
				gameModel.money += building.countPeoples * 0.002;
				
			}
		},
		{
			name: "Big",
			type: "big",
			image: Big,
			cost: 300,
			peoplesMax: 300,
			countBlocks: 30,
			paymentFromOnePeople: 0.003,
			respectFromOnePeople: 0.003,

			can(gameModel, config) {
				return gameModel.money >= 300;
			},
			onTimeUpdate(gameModel, config, building, stateUpdater) {
				gameModel.respect += building.countPeoples * 0.003;
				gameModel.money += building.countPeoples * 0.003;
				
			}
		},
		{
			name: "Lucky Stone",
			type: "stone",
			image: Stone,
			cost: 300,
			can(gameModel, config) {
				return gameModel.money >= 300;
			},
			onTimeUpdate(gameModel, config, building, stateUpdater) {
				gameModel.respect -= 1;
				gameModel.money += 20;
			}
		}
	]
};

const logic = {
	gameScenes,
	preHistoryMessages,
	canBuyAtMap,
	mapManage,
	buildings
};


export default logic;