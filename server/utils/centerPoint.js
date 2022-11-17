//Calculations for the Center Point of a group

//Call this whenever a user joins a group & adds their location, or whenever a user updates their location for the group -- this will provide a current center for the group at all times

//will need to pass all the lats & longs of the group
//save the new center to the db

//to access the updated center, do a db query when needed -- NOT in this file

import { gql } from "@apollo/client";

//mutation to update group center location
const UPDATE_CENTER_POINT = gql`
  mutation updateCenterPoint($groupId: ID!, $coordinates: [Float]) {
    updateCenterPoint(groupId: $groupId, coordinates: $coordinates) {
      _id
      location {
        coordinates
      }
    }
  }
`;

const getCenterPoint = async (userLocations, groupId) => {
  //userLocations - array of objects -->  e.g. [{location:{type: "Point", coordinates: [-105.033678, 39.870972]}, locationName: "Home", userId: ObjectId(''), groupId:[ObjectId(''), ObjectId('')]}]

  //the only locations that would be passed are ones that belong to the specific group

  //copied calculation code from previous project -- modified calculations as needed based on data

  //getting all coordinates -- coords will be [long, lat]
  const allCoords = userLocations.map((data) => data.location.coordinates);

  //separating the coords in the array to long & lat
  const allLongitudes = allCoords.map((data) => data[0]);

  const allLatitudes = allCoords.map((data) => data[1]);

  //calling function to do the calculation
  return getAverageCoords(allLongitudes, allLatitudes);
};

//using user long & lat data to calculate their avg coordinates
function getAverageCoords(allLatitudes, allLongitudes) {
  //sum of lat & long
  const sumLong = allLongitudes.reduce((acc, val) => acc + val, 0);
  const sumLat = allLatitudes.reduce((acc, val) => acc + val, 0);

  //average of lat & long
  const centerLat = sumLat / allLats.length;
  const centerLong = sumLong / allLongs.length;
}

module.exports = getCenterPoint;
