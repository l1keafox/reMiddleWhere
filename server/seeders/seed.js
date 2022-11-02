const db = require("../config/connection");
const { User, Channel, GameCard } = require("../models");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
	try {
		await User.deleteMany({});
		await User.create(userSeeds);

		let users = await User.find();
		console.log(users);
		console.log("all done!");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
