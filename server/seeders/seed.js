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

    // console.log(users);
    // console.log(groups);
    // console.log(location);

    //assigning userId to location & location to user --> will be in user & location order
    for (i = 0; i < location.length; i++) {
      users[i].locations = location[i];
      location[i].userId = users[i]._id;
    }

    //assigning seed data
    for (newUser of users) {
      //adding users & locations to group
      let tempGroup = groups[Math.floor(Math.random() * groups.length)];

      //allows the id's to be matching between user and group
      tempGroup.users.push(newUser._id);
      tempGroup.userLocations.push(newUser.locations);
      await tempGroup.save();

      //adding group to users
      const tempUser = users[Math.floor(Math.random() * users.length)];
      newUser.groups = tempGroup._id;
      await newUser.save();
    }

    for (i = 0; i < location.length; i++) {
      //assigning the groupId to match the group that the user belongs to (since seeded data has each user with only one location)
      location[i].groupId = users[i].groups;
    }

    //ISSUE: seed data showing up correctly in console, but not in mongoDB Compass --> issue is with location, groupId shows empty array and userId shows null
    //console.log(users);
    // console.log(groups);
    //console.log(location);

    console.log("Data seeded! 🌱");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
