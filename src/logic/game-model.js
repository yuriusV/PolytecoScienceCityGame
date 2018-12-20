const initialConsts = {
	gameUserName: "Gamer",
	gameCity: "City",
	startMoney: 200,
	startRespect: 100,
	gameRows: 6,
	gameCols: 6
};

const building = () => ({
	position: {row: 0, cell: 0},
	type: "", // "small" | "medium" | "big"
	countPeoples: 0
});

/// building 
const mapItem = () => ({
	type: "" // "empty" | "grass" | "forest" 
});

const modelOfGame = () => ({
	gameUserName: "",
	gameCity: "",
	money: initialConsts.startMoney,
	respect: initialConsts.startRespect,
	map: [],
	buildings: [],
	secondsPlayed: 0
});

export default {
	mapItem,
	modelOfGame,
	building,
	initialConsts
};