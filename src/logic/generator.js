import Model from "./game-model";

const randomInt  = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateMap = () => {
	let map = [];
	const types = ["empty", "grass", "forest"] 
	for(let i = Model.initialConsts.gameRows - 1; i >= 0; --i) {
		const row = [];
		for(let j = Model.initialConsts.gameCols - 1; j >= 0; --j) {
			row.push({type: types[randomInt(0, types.length - 1)]});
		}
		map.push(row);  
	}
	return map;
};


export default {
	generateMap
};