import React, { useEffect, useMutation } from "react";
import { QUERY_GROUP } from "../../utils/queries";
import { useQuery } from "@apollo/client";
// import { ADD_LOCATION_TO_GROUP } from "../../utils/mutations";
import auth from "../../utils/auth";

const MapsPage = function (props) {
  // const [addLocation,{error}] = useMutation(ADD_LOCATION_TO_GROUP);

  let groupId = props.groupId;
  const { loading, data } = useQuery(QUERY_GROUP, {
    variables: { groupId },
  });
  console.log("MAP?",data);
  useEffect(() => {
    if (data && data.me) {
      console.log(data, "Map pages");
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

//   }

  return (loading? <div> Loading </div> :
    <div>
      MapsPage
      <h2> GROUP NAME: {data.group.name}</h2>
      {data.group.users.map( (e,index) => (
        <div key= {index}> {e.name} </div>
      ) )}
    </div>
  );
};

export default MapsPage;
