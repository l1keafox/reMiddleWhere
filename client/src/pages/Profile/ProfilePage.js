import React, { useState, useEffect } from "react";
// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";
import { QUERY_ME } from "./../../utils/queries";
import { useQuery } from "@apollo/client";
function ProfilePage() {
  const { existingUser } = useExistingUserContext();
  const { loading, data } = useQuery(QUERY_ME);
  console.log(auth.getUser().data, data);
  console.log(existingUser);
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
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
