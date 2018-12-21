import {randomInt} from "./utils";
import Repo from "../externals/repository"
import Online from "../externals/onlineService" 

const updateCurrentGame = (game) => {
	if (!game.id) {
		game.id =  randomInt(0, 9999999);
	}

	// TODO
};

const getScoresStatisticByOnline = () => {
	const info = Online.getRecordInformation();
	// TODO
};

export default {
	updateCurrentGame,
	getScoresStatisticByOnline
};