import React, {  useEffect } from "react";
// user context
import auth from "../../utils/auth";
import { QUERY_ME } from "./../../utils/queries";
import { useQuery } from "@apollo/client";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import InfoCard from "./InfoCard";

function ProfilePage(props) {

  //getting decoded data from JWT to pass to me query - this will show maps with seeded data so you don't have to create or join a group to see the map button
  const decodedToken = auth.getUser(); //{data:...{_id:...}}

  //added variables (userId) to be passed to the query to return needed user data
  const { loading, data ,startPolling, stopPolling  } = useQuery(QUERY_ME,
    { variables: { userId: decodedToken.data._id } },
    {
      pollInterval: 500,
    });
    
  // console.log("PROFILE PAGE", auth.getUser().data, data, loading);

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
          <div className="flex justify-center border-2 border-white flex-wrap bg-slate-800 opacity-95 mx-20 mt-3">
            {data && data.me && data.me.groups? data.me.groups.map((group, index) => (
              <Paper className="h-80 aspect-[5/7] p-3 m-3 hover:bg-slate-200 cursor-default select-none flex flex-col justify-between" id="groupCards" key={index} variant="outlined">
                <div> 
                  <h1 className="text-xl text-center bg-slate-200 mb-3"> {group.name} </h1>
                  <h1 className="pb-2"> # of Users : {group.users.length}</h1>
                  <hr/>
                  <h2 className="pt-2" > Lat : {group.centerLatitude}</h2>
                  <h2> Lng : {group.centerLongitude}</h2>
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
