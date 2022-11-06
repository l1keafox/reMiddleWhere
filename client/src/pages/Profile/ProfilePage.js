import React, { useState, useEffect } from "react";
// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";
import { QUERY_ME } from "./../../utils/queries";
import { useQuery } from "@apollo/client";
import Paper from '@mui/material/Paper';

function ProfilePage() {
  const { existingUser } = useExistingUserContext();
  const { loading, data } = useQuery(QUERY_ME);
  console.log(auth.getUser().data, data);
  console.log(existingUser);
  
  useEffect(() => {
    if(data && data.me){
      console.log(data.me);
    }
  }, [data]);
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
          <div className = "flex"> 
          {
            data.me.groups.map((group,index) => (
              <Paper className = "w-1/4 p-3 m-3 hover:bg-slate-200" key ={index} > 
                <h1> Group Name: {group.name} </h1>
                <h1> Users : </h1>
                    {group.users.map((user,index)=>(
                      <h2> user </h2>
                    ))
                    }
                <h2> Lat :</h2>
                <h2> Long :</h2>
              </Paper>
            )
            )
          }
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
