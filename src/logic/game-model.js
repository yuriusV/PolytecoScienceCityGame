const initialsConsts = {
	gameUserName: "Gamer",
	gameCity: "City",
	startMoney: 200,
	startRespect: 100,
	gameRows: 10,
	gameCols: 10
};

const building = () => ({
	position: {row: 0, cell: 0},
	type: "", // "small" | "medium" | "large" | "luxury",
	countPeoples: 0
});

/// building 
const mapItem = () => ({
	type: "" // "empty" | "grass" | "forest" 
});

const modelOfGame = () => ({
	gameUserName: "",
	gameCity: "",
	money: initialsConsts.startMoney,
	respect: initialsConsts.startRespect,
	map: [],
	buildings: [],
	secondsPlayed: 0
});

export default {
	mapItem,
	modelOfGame,
	building,
	initialsConsts
};