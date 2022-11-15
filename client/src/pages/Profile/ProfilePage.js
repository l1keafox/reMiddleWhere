import React, { useState, useEffect } from "react";
// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";
import { QUERY_ME } from "./../../utils/queries";
import { useQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
function ProfilePage(props) {
  const { existingUser } = useExistingUserContext();
  const { loading, data, startPolling, stopPolling } = useQuery(QUERY_ME, {
    pollInterval: 500,
  });
  console.log("PROFILE PAGE", auth.getUser().data, data, loading);

  useEffect(() => {
    startPolling(500);
    if(!loading && !data){
      console.log('done loading and no data');
    }
  }, []);
  useEffect(() => () => stopPolling(), []);
  
  return (
    <div>
      {loading ? (
        <div />
      ) : (
        <div>
          <h1>Profiles Page</h1>
          <h1> WHO AM I: {auth.getUser().data.username}</h1>
          <h1> my id: {auth.getUser().data._id}</h1>
          <h1> my email: {auth.getUser().data.email}</h1>
          <div className="flex justify-center">
            {data && data.me ? data.me.groups.map((group, index) => (
              <Paper className="w-1/4 p-3 m-3 hover:bg-slate-200" key={index}>
                <h1> Group Name: {group.name} </h1>
                <h1> Group id: {group._id} </h1>
                <h1> Users : </h1>
                {group.users.map((user, index2) => (
                  <h2 key={index2}> user </h2>
                ))}
                <h2> Lat :</h2>
                <h2> Long :</h2>
                <Button data-id={group._id} onClick={props.mapSelect}>
                  {" "}
                  Click Here To Go To Map
                </Button>
              </Paper>
            )):<div></div>}
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
