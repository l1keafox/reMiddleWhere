//Location schema to be used in the User Model
//Allows the user to have multiple saved places for their location in the group

//will be referenced in the User model as an array of locations

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
  locationName: {
    type: String,
    trim: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    //required: true
  },
  //adding groupId to allow users to use the location in more than one group
  //will be helpful if we want the user to see which groups the location is being used
  groupId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

const Location = model("Location", locationSchema);

module.exports = Location;
