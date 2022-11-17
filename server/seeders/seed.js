const db = require("../config/connection");
const { User, Group, Location } = require("../models");
const userSeeds = require("./userSeeds.json");
const groupSeeds = require("./groupSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Group.deleteMany({});
    await Location.deleteMany({});

    await User.create(userSeeds);
    await Group.create(groupSeeds);
    await Location.create(locationSeeds);

    let users = await User.find();
    let groups = await Group.find();
    let location = await Location.find();

    console.log(users);
    console.log(groups);
    console.log(location);

    console.log("Data seeded! 🌱");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
