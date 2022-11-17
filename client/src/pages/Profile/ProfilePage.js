import React, { useState, useEffect } from "react";
// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";
import { QUERY_ME } from "./../../utils/queries";
import { useQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import InfoCard from "./InfoCard";

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
        <div className="container">
        <div id="profileBgWrap"> 
          <div id="profileBg" >
          </div>
        </div>
          <InfoCard />
          <div className="flex justify-center border-2 border-yellow-900 flex-wrap bg-yellow-900 opacity-95 mx-20 mt-3">
            {data && data.me ? data.me.groups.map((group, index) => (
              <Paper className="h-80 aspect-[5/7] p-3 m-3 hover:bg-slate-200 cursor-default select-none" id="groupCards" key={index} elevation={3} variant="outlined">
                <div> 
                <h1> Group Name: {group.name} </h1>
                <h1> Group id: {group._id} </h1>
                <h1> Users : </h1>
                {group.users.map((user, index2) => (
                  <h2 key={index2}> user </h2>
                ))}
                <h2> Lat :</h2>
                <h2> Long :</h2>
                  </div>
                <Button data-id={group._id} onClick={props.mapSelect} className="justify-end bg-slate-500" id="cardButton">
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
