import React, { useEffect, useState } from "react";
import { QUERY_GROUP } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_LOCATION_TO_GROUP, LEAVE_GROUP } from "../../utils/mutations";
import auth from "../../utils/auth";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Locals from "./Locals";
import ChatWindow from "./ChatWindow";

const MapsPage = function (props) {
  // console.log(ADD_LOCATION_TO_GROUP);
  const [addUserLocationToGroup, ] = useMutation(
    ADD_LOCATION_TO_GROUP
  );
  const [leaveGroup,] = useMutation(LEAVE_GROUP);
  const [myPos,setMyPos]  = useState({});
  const [center, setCenter] = useState({});
  const [localPlaces, setPlaces] = useState([]);
  const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  // "http://clipart-library.com/img/2103583.png"
  // "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"; 
  let groupId = props.groupId;
  let { loading, data,refetch,startPolling, stopPolling } = useQuery(QUERY_GROUP, {
    variables: { groupId },
  });
  const containerStyle = {
    width: "405px",
    height: "510px",
  };

  console.log("MAP PAGE DATA:::", data, groupId);
  useEffect(() => {
    if (data) {
      setCenter({
        ...center,
        lat: data.group.centerLatitude,
        lng: data.group.centerLongitude,
      });
      console.log("CENTER LOCATION IS:",center,data.group.centerLatitude);
    
      // loc_refetch({  latitude: data.group.centerLatitude , longitude:data.group.centerLongitude } );
      for(let location of data.group.userLocations){
        if(location.locationName === auth.getUser().data.username){
          setMyPos({
            ...myPos,
            latitude: location.latitude,
            longitude: location.longitude,
          });
          console.log("Found my self:",myPos,location.latitude);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    startPolling(2000);

  }, []);


  useEffect(() => () => stopPolling(), []);
  // useEffect(()=>{
  //   console.log(loc_data);
  // },[loc_data] );
  function upDatePos() {
    console.log('Update pos');
    navigator.geolocation.getCurrentPosition(async (position) => {
      //mutation AddUserLocationToGroup($userId: ID!, $groupId: ID!, $latitude: Int!, $longitude: Int!)
      // So we need 4 times, userID, groupID, lat, and long, here we get lat/long
      const userId = auth.getUser().data._id;
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const { data } = await addUserLocationToGroup({
        variables: { userId, groupId, latitude, longitude },
      });
      // console.log("THIS:",data);
      if(data){
        alert('Location Updated');
        refetch({  groupId } );
      }
    });
  }

  async function leaveGroupClick() {
    // leaveGroup(need groupId);
    //console.log(groupId, "is group ID");
    const { data } = await leaveGroup({
      variables: { groupId },
    });
    // We should also go back to profile page from here.
    props.changeStage("profile");
  }
  //console.log(process.env.REACT_APP_GMAPS_API, "AIzaSyDOxXYVOWPzgQcdB8Zc8KTR-P92C8A-K2Y" , process.env.REACT_APP_GMAPS_API === "AIzaSyDOxXYVOWPzgQcdB8Zc8KTR-P92C8A-K2Y");
  const sideStyle = "border-2 border-blue-500 bg-stone-200 flex flex-col p-3 m-3 w-5/6 sm:w-3/4 xl:w-1/4 h-[32rem]";
  //md:w-1/4 lg:w-1/3 
  return loading ? (
    <div> Loading </div>
  ) : (
    <div className = "container">
        <div className="profileBgWrap"> 
          <div className="profileBg" >
          </div>
        </div>

      <h1 className ="text-6xl flex text-center justify-center pb-3 font-bold text-slate-200 font-marker"> {data.group.name}</h1>
      {center ? (
        <div className="flex flex-col"> 
          <div className="flex flex-col  justify-center items-center lg:flex-row">
          {/*  */}
            <div className={sideStyle}> 
          <hr/>
            <h2 className="font-bold text-3xl"> User: {auth.getUser().data.username}  </h2>
            <hr/>
            <h2>In {data.group.name} my location is:</h2> 

            <h3> LATITUDE : {myPos.latitude}</h3>

            <h3> LONGITUDE : {myPos.longitude}</h3>
            <br/>
            <div className="flex justify-evenly"> 
            <button className="bg-green-300 p-2 border-2 border-green-700 hover:bg-green-700" onClick={upDatePos}>
              Update Location
            </button>
            <button className="bg-red-300  p-2 border-2 border-red-700 hover:bg-red-700" onClick={leaveGroupClick}>
              Leave Group
            </button>
            </div> 
            <br/>
            <hr/>
            <h2 className="font-bold text-3xl"> { data.group.name } Members</h2> 
            <hr/>
            <div style={{overflowX:"hidden",overflowY:"scroll"}} > 
            {data.group.users.map((e, index) => (
            <div key={index}>{e.username[0]+e.username[1]}:  {e.username} </div>
            ))}
            </div>
            </div>

            <div className=" flex items-center justify-center"> 
            {/* md:w-1/3  */}
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_API}>
            {center.lat ? 
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              id="centerMap"
            >
              {/* Child components, such as markers, info windows, etc. */}

              <Marker position={center}  icon={image} title="Center Point"/>
              {data.group.userLocations.map((e, index) => (
                <Marker position={{lat: e.latitude,lng: e.longitude}} key={index} title={e.locationName} label={ e.locationName[0]+e.locationName[1]}/>
              ))}

              {/* {localPlaces.map((e, index) => (
                <Marker position={{lat: e.geometry.location.lat,lng: e.geometry.location.lng}} key={index} title={e.name} label={ e.name[0]}>@ </Marker>
              ))} */}
            </GoogleMap  > 
            : <div className="text-3xl font-bold"> Click Update Location </div> }
          </LoadScript>
            </div> 

            <div  className={sideStyle}> 
              <ChatWindow groupName={data.group.name}/>
            </div> 
          
            </div>
            <div className="flex container justify-center">

              {center.lat?<Locals center={center} emitLocals = {setPlaces}/> :<div/> }
            </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default MapsPage;
