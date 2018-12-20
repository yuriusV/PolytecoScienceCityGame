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

const logic = {
	gameScenes,
	preHistoryMessages
};


export default logic;