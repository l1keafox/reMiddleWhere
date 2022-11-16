//Calculations for the Center Point of a group

//Call this whenever a user joins a group & adds their location, or whenever a user updates their location for the group -- this will provide a current center for the group at all times

//will need to pass all the lats & longs of the group
//save the new center to the db

//to access the updated center, do a db query when needed -- NOT in this file

const getCenterPoint = async (userLocations) => {

//userLocations - array of objects -->  e.g. [{location:{type: "Point", coordinates: [-105.033678, 39.870972]}, locationName: "Home", userId: ObjectId(''), groupId:[ObjectId(''), ObjectId('')]}]

  //the only locations that would be passed are ones that belong to the specific group

  //copied calculation code from previous project -- 
  
    //getting all latitudes as array -- returns as array of strings
    const allLatitudes = userLocations.map((data) => data.); //will need to map through the passed lat data param

    //getting all longitudes as array -- returns as array of strings
    const allLongitudes = .map((data) => data.longitude); //will need to map through the passed long data param

    //calling function to do the calculation
    return getAverageCoords(allLatitudes, allLongitudes);
  }

  //using user long & lat data to calculate their avg coordinates
  function getAverageCoords(allLatitudes, allLongitudes) {
    //turning all of the user's latitudes into numbers -- returns array of numbers
    const allLats = allLatitudes.map((lats) => {
      return parseFloat(lats);
    });

    //turning all of the user's longitudes into numbers -- returns array of numbers
    const allLongs = allLongitudes.map((longs) => {
      return parseFloat(longs);
    });

    //sum of lat & long
    const sumLat = allLats.reduce((acc, val) => acc + val, 0);
    const sumLong = allLongs.reduce((acc, val) => acc + val, 0);

    //average of lat & long
    const centerLat = sumLat / allLats.length;
    const centerLong = sumLong / allLongs.length;

    return { latitude: centerLat, longitude: centerLong };
  };

module.exports = getCenterPoint;