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
	products: [
		{
			name: "Allow build",
			cost: 50,
			modifier(gameModel, config) {
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
				gameModel.respect += config.count;
				gameModel.money -= config.count;
			},
			can(gameModel, config) {
				return gameModel.money >= config.count;
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
				return gameModel.money >= 10;
			}
		}
	]
};

const logic = {
	gameScenes,
	preHistoryMessages,
	canBuyAtMap,
	mapManage 
};


export default logic;