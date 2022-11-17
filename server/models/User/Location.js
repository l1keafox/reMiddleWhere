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
//   locationName: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     //required: true
//   },
//   groupId: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Group",
//     },
//   ],
});

const Location = model("Location", locationSchema);

module.exports = Location;
