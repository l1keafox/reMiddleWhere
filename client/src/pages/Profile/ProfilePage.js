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
    </div>
  );
}
export default ProfilePage;
