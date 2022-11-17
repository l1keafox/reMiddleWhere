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

    console.log(users);
    console.log(groups);
    console.log("HEREEEEEEEEEE", location);

    //assigning seed data
    for (newUser of users) {
      //adding users to group
      let tempGroup = groups[Math.floor(Math.random() * groups.length)];
      tempGroup.users.push(newUser._id);
      await tempGroup.save();

      //adding group to users
      const tempUser = users[Math.floor(Math.random() * users.length)];
      newUser.groups = tempGroup._id;
      await newUser.save();

      //getting random location
      const tempLocation =
        location[Math.floor(Math.random() * location.length)];

      //assigning userId to location & location to user --> will be in user & location order
      for (i = 0; i < location.length; i++) {
        users[i].locations.push(location[i]);
        location[i].userId = users[i]._id;
      }

      console.log(location.length, users.length);
      //assigning group to location & location to group --> will be in user & location order

      // //adding user to location
      // const tempLocation =
      //   location[Math.floor(Math.random() * location.length)];
      // tempLocation.userId = newUser._id;
      // await tempLocation.save();

      // //adding location to user
      // newUser.locations = tempLocation._id;
      // await newUser.save();

      // //adding user locations to group
      // tempGroup.userLocations.push(tempLocation._id);
      // await tempGroup.save();

      // //adding group to user locations
      // tempLocation.groupId.push(tempGroup._id);
      // await tempLocation.save();
    }

    console.log("Data seeded! 🌱");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
