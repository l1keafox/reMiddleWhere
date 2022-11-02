import React, { useState, useEffect } from "react";

// stylesheet
import { useQuery } from "@apollo/client";

// components
import Login from "../../components/Login/Login.js";
import CreateAccount from "../../components/CreateAccount/CreateAccount.js";

// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";

function HomePage() {
  const { existingUser } = useExistingUserContext();

  return (
    <div className="homeViewContainer">
      {auth.loggedIn() ? <div /> : existingUser ? <Login /> : <CreateAccount />}
    </div>
  );
}
export default HomePage;
