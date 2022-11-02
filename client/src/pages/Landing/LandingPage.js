import React, { useState, useEffect } from "react";

// stylesheet
import { useQuery } from "@apollo/client";

// components
import Login from "../../components/Login/Login.js";
import CreateAccount from "../../components/CreateAccount/CreateAccount.js";

// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";

function LandingPage() {
  const { existingUser } = useExistingUserContext();

  return (
    <div className="flex flex-col h-screen justify-between">
        <div></div>
    <div className="flex container">
        <div className = "bg-slate-200 w-1/2">
            <h1 className = "text-7xl  font-mono"> Middle Where</h1>
            <br/>
            <p className="font-serif">
            Middle-Where is a web-based application designed to bring friends together using a calculated, centralized geolocation. The motivation behind this project is to streamline the process of deciding the best place to meet between multiple group members. Individuals can choose to be placed into groups with their friends or colleagues, and by providing their location details, Middle-Where determines a meeting spot based on the closest proximity between all group members.                
            </p>
        </div>
        <div  className = "bg-grey-100 w-1/2">
            {auth.loggedIn() ? <div /> : existingUser ? <Login /> : <CreateAccount />}
        </div>
    </div>
    <div></div>
    </div>
  );
}
export default LandingPage;
