import React, { useState, useEffect } from "react";

import NavBar from "./../../components/NavBar/NavBar";

// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";
import {QUERY_ME} from "./../../utils/queries";
import {useQuery } from "@apollo/client";
function ProfilePage() {
  const { existingUser } = useExistingUserContext();
  const { loading, data } = useQuery(QUERY_ME);
    console.log(auth.getUser().data,data );

  return (
    <div >
        <NavBar/>
        <h1>Profiles Page</h1>
        <h1> WHO AM I:  {auth.getUser().data.username}</h1>
        <h1> my id:  {auth.getUser().data._id}</h1>
        <h1> my email:  {auth.getUser().data.email}</h1>

    </div>
  );
}
export default ProfilePage;
