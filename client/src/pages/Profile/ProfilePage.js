import React, { useState, useEffect } from "react";

import NavBar from "./../../components/NavBar/NavBar";

// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";

function ProfilePage() {
  const { existingUser } = useExistingUserContext();

  return (
    <div className="homeViewContainer">
        <NavBar/>

        Here we could have cards of groups are you in
    </div>
  );
}
export default ProfilePage;
