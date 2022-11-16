//Location schema to be used in the User Model
//Allows the user to have multiple saved places for their location in the group

//Each location a user saves/creates will have the following:
//Long, Lat, userId, nameLocation

//will be referenced in the User model as an array of locations

const Schema = require("mongoose");

//!!! NOTE: from MongoDB documentation for GeoJSON (https://www.mongodb.com/docs/manual/reference/geojson/#point) !!!!

// If specifying latitude and longitude coordinates, list the LONGITUDE first, and then LATITUDE. --> e.g. {type: "Point", coordinates: [40, 5]}

// Valid longitude values are between -180 and 180, both inclusive.

// Valid latitude values are between -90 and 90, both inclusive.
const locationSchema = new Schema({
  location: {
    type: "Point",
    coordinates: [Number], //will be single set of coords - [long, lat]
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
});

module.exports = locationSchema;
