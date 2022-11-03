import React, { useState, useEffect } from "react";


// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";

function ProfilePage() {
  const { existingUser } = useExistingUserContext();

  return (
    <div className="homeViewContainer">
        HI
    </div>
  );
}
export default ProfilePage;
