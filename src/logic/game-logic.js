import Small from "../../assets/tiles/small.png"
import Medium from "../../assets/tiles/medium.png"
import Big from "../../assets/tiles/big.png"


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
			text: `Отлично, профессор ИмяПрофессора, теперь Вы строите ВведенноеНазвание, Вам нужно постороить как можно больше больших сданий, заселить как можно больше людей туда и не дать студентам их сжечь. Для этого вы должны рационально использовать кредиты для построек, как можно ровнее строить, кормить студентов шаурмой, оставлять им места для пьянок, хакатонов.`,
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
			image: Small,
			cost: 100,
			peoplesMax: 100,
			countBlocks: 10,
			paymentFromOnePeople: 1,
			respectFromOnePeople: 1,

			can(gameModel, config) {
				return gameModel.money >= 100;
			}
		},
		{
			name: "Medium",
			image: Medium,
			cost: 200,
			peoplesMax: 200,
			countBlocks: 20,
			paymentFromOnePeople: 2,
			respectFromOnePeople: 2,

			can(gameModel, config) {
				return gameModel.money >= 200;
			}
		},
		{
			name: "Big",
			image: Big,
			cost: 300,
			peoplesMax: 300,
			countBlocks: 30,
			paymentFromOnePeople: 3,
			respectFromOnePeople: 3,

			can(gameModel, config) {
				return gameModel.money >= 300;
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