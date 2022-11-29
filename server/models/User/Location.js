//Later - allow user to have multiple saved places for their location in the group

const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  //Location name that user's assign to their saved location (e.g. Home, Work, School, etc.)
  locationName: {
    type: String,
    trim: true,
  },
  //Using object ID to allow us to populate data from user & use what we need 
  //Will be good if user model changes over time - such as adding a name feature to display on the map instead of username
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    //required: true
  },
//   groupId: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Group",
//     },
//   ],
});

const Location = model("Location", locationSchema);

module.exports = Location;
