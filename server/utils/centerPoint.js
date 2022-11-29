//Calculations for the Center Point of a group

//Call this whenever a user joins a group & adds their location, or whenever a user updates their location for the group -- this will provide a current center for the group at all times

//will need to pass all the lats & longs of the group
//save the new center to the db

//to access the updated center, do a db query when needed -- NOT in this file

const getCenterPoint = async (userLocations) => {
  // console.log('Doing center point:',userLocations);
  let totalLongs = 0;
  let totalLats = 0;

  userLocations.map((data) => {
    totalLongs+=data.longitude;
    totalLats+=data.latitude;
  });

  //the coords that will be saved to the db --> add mutation to update db using returned values where getCenterPoint is called
  return { latitude:totalLats / userLocations.length, longitude:totalLongs / userLocations.length };
  //calling function to do the calculation
  // 
};

//using user long & lat data to calculate their avg coordinates
function getAverageCoords(allLatitudes, allLongitudes) {
  //sum of lat & long
  const sumLong = allLongitudes.reduce((acc, val) => acc + val, 0);
  const sumLat = allLatitudes.reduce((acc, val) => acc + val, 0);

  //average of lat & long
  const centerLat = sumLat / allLats.length;
  const centerLong = sumLong / allLongs.length;

  //the coords that will be saved to the db --> add mutation to update db using returned values where getCenterPoint is called
  return { centerLat, centerLong };
}

module.exports = getCenterPoint;
