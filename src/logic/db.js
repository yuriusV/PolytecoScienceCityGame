//import SQLite from "react-native-sqlite-storage"
import {SQLite} from "expo"

const errorCB = (err) => {
	console.log("SQL Error: " + err);
}

const successCB = () => {
	console.log("SQL executed fine");
}

const openCB = () => {
	console.log("Database OPENED");
}

const db = SQLite.openDatabase(
	"game.db", "1.0",
	"Game Database", 200000, openCB, errorCB);


const executeSql = (sql, params, callback, eerr) => {
	db.transaction((tx) => {
		tx.executeSql(sql, params, (tx, results) => {
			var len = results.rows.length;
			const result = [];
			for (let i = 0; i < len; i++) {
				result.push(results.rows.item(i));
			}

			callback && callback(result);
		}, eerr);
	});
};

export default {
	executeSql
};