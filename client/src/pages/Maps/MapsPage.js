import React, { useEffect, useState } from "react";
import { QUERY_GROUP } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_LOCATION_TO_GROUP, LEAVE_GROUP } from "../../utils/mutations";
import auth from "../../utils/auth";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapsPage = function (props) {
  // console.log(ADD_LOCATION_TO_GROUP);
  const [addUserLocationToGroup, { error }] = useMutation(
    ADD_LOCATION_TO_GROUP
  );
  const [leaveGroup, { leaveError }] = useMutation(LEAVE_GROUP);

  const [center, setCenter] = useState({});
  const google = window.google;
  const image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";  
  let groupId = props.groupId;
  const { loading, data } = useQuery(QUERY_GROUP, {
    variables: { groupId },
  });
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  // let center;
  //  = {
  //   lat: -3.745,
  //   lng: -38.523
  // };
  console.log("MAP PAGE DATA:::", data, groupId);
  useEffect(() => {
    if (data) {
      setCenter({
        ...center,
        lat: data.group.centerLatitude,
        lng: data.group.centerLongitude,
      });
    }
  }, [data]);
  
  function upDatePos() {
    console.log("doing update");
    navigator.geolocation.getCurrentPosition(async (position) => {
      //mutation AddUserLocationToGroup($userId: ID!, $groupId: ID!, $latitude: Int!, $longitude: Int!)
      // So we need 4 times, userID, groupID, lat, and long, here we get lat/long
      const userId = auth.getUser().data._id;
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(userId, groupId, latitude, longitude);
      const { data } = await addUserLocationToGroup({
        variables: { userId, groupId, latitude, longitude },
      });
      console.log(error);
    });
  }

  async function leaveGroupClick() {
    // leaveGroup(need groupId);
    console.log(groupId, "is group ID");
    const { data } = await leaveGroup({
      variables: { groupId },
    });
    // We should also go back to profile page from here.
    props.changeStage("profile");
  }
  //console.log(process.env.REACT_APP_GMAPS_API, "AIzaSyDOxXYVOWPzgQcdB8Zc8KTR-P92C8A-K2Y" , process.env.REACT_APP_GMAPS_API === "AIzaSyDOxXYVOWPzgQcdB8Zc8KTR-P92C8A-K2Y");

  return loading ? (
    <div> Loading </div>
  ) : (
    <div className = "container">
      <h1 className ="text-4xl flex text-center justify-center pb-3 font-bold"> {data.group.name}</h1>
      {center ? (
        <div className="flex  justify-center">

          <div className="border-2 border-blue-500 bg-stone-200 flex flex-col p-3 w-1/5"> 
          <hr/>
            <h2 className="font-bold text-3xl"> User: {auth.getUser().data.username}  </h2>
            <hr/>
            <br/>
            <h3> LATITUDE : </h3>
            <h3> LONGITUDE : </h3>
            <br/>
            <div className="flex justify-evenly"> 
            <button className="bg-green-300" onClick={upDatePos}>
              Load User Data
            </button>
            <button className="bg-red-300" onClick={leaveGroupClick}>
              Leave Group
            </button>
            </div> 
            <br/>
            <hr/>
            <h2 className="font-bold text-3xl"> { data.group.name } Members</h2> 
            <hr/>

            {data.group.users.map((e, index) => (
            <div key={index}> {e.username} </div>
            ))}

          </div>

          <div className="w-1/3 flex items-center justify-center"> 
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              id="centerMap"
            >
              {/* Child components, such as markers, info windows, etc. */}
              <Marker position={center}  icon={image}/>
              {data.group.userLocations.map((e, index) => (
                <Marker position={{lat: e.latitude,lng: e.longitude}}/>
              ))}

            </GoogleMap>
          </LoadScript>
          </div> 

          <div className="border-2 border-blue-500 p-3  w-1/5"> 
              <h1>Chat Window</h1> 
          </div> 
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default MapsPage;
