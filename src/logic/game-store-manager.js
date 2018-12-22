import { randomInt } from "./utils";
import Repo from "../externals/repository"
import Online from "../externals/onlineService"
import db from "./db.js"

const ensureTable = (s, cols) => `CREATE TABLE IF NOT EXISTS ${s} (${cols});`;
const ensureTablesExists = (success) => {
	const exec = db.executeSql;

	exec(ensureTable(
		'Games',
		`
		id Integer,
		gameUserName Text, 
		gameCity Text, 
		money Real,
		respect Real, 
		map Text, 
		buildings Text, 
		saveUnixTime Integer,
		allowBuilds Text`
	), [], success);
	exec(ensureTable(
		'Account',
		`name Text, 
		gold Integer`
	), [], success);
};



const updateCurrentGame = (game, callback) => {
	console.log('AAAAAAadb', game.id);
	if (!game.id) {
		game.id = randomInt(0, 9999999);
		db.executeSql(`
			insert into Games (id, gameUserName, gameCity, money, respect, 
				map, buildings, saveUnixTime, allowBuilds)
			values (${game.id}, '${game.gameUserName}', '${game.gameCity}',
			${game.money}, ${game.respect}, '${JSON.stringify(game.map)}', 
			'${JSON.stringify(game.buildings)}', ${game.saveUnixTime}, 
			'${JSON.stringify(game.allowBuilds)}')
		`, [], (data) => {
			console.log('HHHERE')
			db.executeSql(`
			update Account set gold = ${game.gold}
			`, [], callback && callback())

			
		});

		return;
	}

	db.executeSql(`
		update Games set
		id = ${game.id}, 
		gameUserName = '${game.gameUserName}', 
		gameCity = '${game.gameCity}', 
		money = ${game.money}, 
		respect = ${game.respect}, 
		map = '${JSON.stringify(game.map)}', 
		buildings = '${JSON.stringify(game.buildings)}', 
		saveUnixTime = ${game.saveUnixTime}, 
		allowBuilds = '${JSON.stringify(game.allowBuilds)}'
		where id = ${game.id}
	`);
};

const updateAccount = (account, callback) => {
	db.executeSql(`
		update Account set name = '${account.name}',
			gold = '${account.gold}'
	`, [], callback);
};

const getAccount = (callback) => {
	db.executeSql(`
		select * from Account limit 1'
	`, [], (coll) => {
		const item = coll || []
		callback && callback({name: item.name, gold: item.gold});
	});
};

const getSavedGames = (callback) => {
	db.executeSql(`
		select *
		from Games 
		`, [], (collection) => {
				console.log(collection);

				db.executeSql(`select name, gold from Account limit 1`, [], (res)=>{
					callback(collection.map(x => ({
						id: x.id,
						gameUserName: x.gameUserName,
						gameCity: x.gameCity,
						money: x.money,
						respect: x.respect,
						map: JSON.parse(x.map),
						buildings: JSON.parse(x.buildings),
						saveUnixTime: x.saveUnixTime,
						gold: res[0] && res[0].gold,
						allowBuilds: JSON.parse(x.allowBuilds)
					})));
				});
			
		});
};

const getScoresStatisticByOnline = () => {
	const info = Online.getRecordInformation();
	// TODO
};

export default {
	updateCurrentGame,
	getScoresStatisticByOnline,
	ensureTablesExists,
	getAccount,
	getSavedGames,
	updateAccount
};