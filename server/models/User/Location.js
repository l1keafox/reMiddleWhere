//Location schema to be used in the User Model
//Allows the user to have multiple saved places for their location in the group

//Each location a user saves/creates will have the following:
//Long, Lat, userId, nameLocation

//will be referenced in the User model as an array of locations

const { Schema } = require("mongoose");

//!!! NOTE: from MongoDB documentation for GeoJSON (https://www.mongodb.com/docs/manual/reference/geojson/#point) !!!!

// If specifying latitude and longitude coordinates, list the LONGITUDE first, and then LATITUDE. --> e.g. {type: "Point", coordinates: [40, 5]}

// Valid longitude values are between -180 and 180, both inclusive.

// Valid latitude values are between -90 and 90, both inclusive.
const locationSchema = new Schema({
  //reference: https://mongoosejs.com/docs/geojson.html
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  locationName: {
    type: String,
    trim: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

module.exports = locationSchema;
