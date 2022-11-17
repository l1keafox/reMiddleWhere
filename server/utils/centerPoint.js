//Calculations for the Center Point of a group

//Call this whenever a user joins a group & adds their location, or whenever a user updates their location for the group -- this will provide a current center for the group at all times

//will need to pass all the lats & longs of the group
//save the new center to the db

//to access the updated center, do a db query when needed -- NOT in this file

const getCenterPoint = async (userLocations) => {
  //userLocations - array of objects -->  e.g. [{ latitude: 39.870972, longitude: -105.033678,  locationName: "Home", userId: ObjectId(''), groupId:[ObjectId(''), ObjectId('')]}]

  //the only locations that would be passed are ones that belong to the specific group

  //copied calculation code from previous project -- modified calculations as needed based on data

  //getting all longs & lats
  const allLongitudes = userLocations.map((data) => data.longitude);

  const allLatitudes = allCoords.map((data) => data.latitude);

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

  //the coords that will be saved to the db
  return {centerLat, centerLong}
}

module.exports = getCenterPoint;
