const db = require("../config/connection");
const { User, Group, Location } = require("../models");
const userSeeds = require("./userSeeds.json");
const groupSeeds = require("./groupSeeds.json");
const locationSeeds = require("./locationSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Group.deleteMany({});
    await Location.deleteMany({});

    let users = await User.create(userSeeds);
    let groups = await Group.create(groupSeeds);
    let location = await Location.create(locationSeeds);

    // let users = await User.find();
    // let groups = await Group.find();
    // let location = await Location.find();

    //assigning location to user & user to location --> will be in user & location order
    for (i = 0; i < location.length; i++) {
      location[i].userId = users[i]._id;
      //NEED to use .save() method to get the userId to be shown/saved in location document
      location[i].save();
      users[i].locations = location[i];
    }

    //assigning seed data
    for (newUser of users) {
      //getting random group for assigning
      let tempGroup = groups[Math.floor(Math.random() * groups.length)];

      //allows the location & user id's to be matching between user and group
      tempGroup.users.push(newUser._id);
      tempGroup.userLocations.push(newUser.locations);
      await tempGroup.save();

      // const tempUser = users[Math.floor(Math.random() * users.length)];
      
      //adding group to users
      newUser.groups = tempGroup._id;
      await newUser.save();
    }
    // console.log(users);
    // console.log(groups);
    // console.log(location);

    console.log("Data seeded! 🌱");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
