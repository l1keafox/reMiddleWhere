import React, { useEffect, useMutation, useState } from "react";
import { QUERY_GROUP } from "../../utils/queries";
import { useQuery } from "@apollo/client";
// import { ADD_LOCATION_TO_GROUP } from "../../utils/mutations";
import auth from "../../utils/auth";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
const MapsPage = function (props) {
  // const [addLocation,{error}] = useMutation(ADD_LOCATION_TO_GROUP);
  const [center, setCenter] = useState({});
  const google = window.google;
  let groupId = props.groupId;
  const { loading, data } = useQuery(QUERY_GROUP, {
    variables: { groupId },
  });
  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  // let center;
  //  = {
  //   lat: -3.745,
  //   lng: -38.523
  // };
  console.log("MAP?",data,groupId);

  useEffect(() => {
    if (data) {
      console.log(data, "Map pages");
      setCenter({
        ...center,
        "lat": data.group.centerLatitude,
        "lng": data.group.centerLongitude
        });
        console.log(center,"CTR?");
    }
  }, [data]);

//   function upDatePos(){
//     console.log("doing update");
//     navigator.geolocation.getCurrentPosition( async (position) => {
// //mutation AddUserLocationToGroup($userId: ID!, $groupId: ID!, $latitude: Int!, $longitude: Int!) 
// // So we need 4 times, userID, groupID, lat, and long, here we get lat/long
//       const userId = auth.getUser().data._id;
//       const latitude = position.coords.latitude;
//       const longitude =  position.coords.longitude;
//       console.log(userId,groupId,latitude,longitude);
//       const { data } = await addLocation({
//         variables: { userId , groupId,latitude, longitude },
//       });
//       console.log(error);
//       console.log(data);
//      });
  console.log(process.env.REACT_APP_GMAPS_API, "AIzaSyDOxXYVOWPzgQcdB8Zc8KTR-P92C8A-K2Y" , process.env.REACT_APP_GMAPS_API === "AIzaSyDOxXYVOWPzgQcdB8Zc8KTR-P92C8A-K2Y");
//   }  

  return (loading? <div> Loading </div> :
    <div>
      MapsPage
      <h2> GROUP NAME: {data.group.name}</h2>
      {data.group.users.map( (e,index) => (
        <div key= {index}> {e.name} </div>
      ) )}
      {center? 
      <LoadScript
        googleMapsApiKey= {"AIzaSyDOxXYVOWPzgQcdB8Zc8KTR-P92C8A-K2Y"}
      >
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}>
        { /* Child components, such as markers, info windows, etc. */ }
      
      </GoogleMap>      
      </LoadScript>
      : <div/>}
    </div>
  );
};

export default MapsPage;
