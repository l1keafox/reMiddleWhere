const db = require("../config/connection");
const { User, Group } = require("../models");
const userSeeds = require("./userSeeds.json");
const groupSeeds = require("./groupSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Group.deleteMany({});

    await User.create(userSeeds);
    await Group.create(groupSeeds);

    let users = await User.find();
    let groups = await Group.find();

    console.log(users);
    console.log(groups);

    console.log("Data seeded! 🌱");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
