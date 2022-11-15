import React, { PureComponent, useEffect } from "react";
import { QUERY_GROUP } from "../../utils/queries";
import { useQuery,useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import auth from "../../utils/auth";
import { ADD_LOCATION_TO_GROUP } from "../../utils/mutations";

const MapsPage = function (props) {
  const [addLocation] = useMutation(ADD_LOCATION_TO_GROUP);

  let groupId = props.groupId;
  const { loading, data } = useQuery(QUERY_GROUP, {
    variables: { groupId },
  });

  console.log("MAP?",data,groupId);

  useEffect(() => {
    if (data && data.me) {
      console.log(data, "Map pages");
    }
  }, [data]);

  function upDatePos(){
    console.log("doing update");
    navigator.geolocation.getCurrentPosition( async (position) => {
//mutation AddUserLocationToGroup($userId: ID!, $groupId: ID!, $latitude: Int!, $longitude: Int!) 
// So we need 4 times, userID, groupID, lat, and long, here we get lat/long

      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      console.log(groupId);
      console.log( auth.getUser().data._id );
      const { data } = await addLocation({
        variables: { "userId":auth.getUser().data._id , groupId, "latitude":position.coords.latitude, "longitude":position.coords.longitude },
      });

     });

  }

  return (loading? <div> Loading </div> :
    <div>
      MapsPage
      <h2> GROUP NAME: {data && data.group ? data.group.name : "balh"}</h2>
      {/* {data.group.users.map( (e) => (
        <div> {e.name} </div>
      ) )} */}
      <Button onClick={upDatePos} > Update Location </Button>
    </div>
  );
};

export default MapsPage;
