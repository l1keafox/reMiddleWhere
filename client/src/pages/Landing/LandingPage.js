import React, { useState, useEffect } from "react";

// stylesheet
import { useQuery } from "@apollo/client";

// components
import Login from "../../components/Login/Login.js";
import CreateAccount from "../../components/CreateAccount/CreateAccount.js";

// user context
import { useExistingUserContext } from "../../utils/existingUserContext";
import auth from "../../utils/auth";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function LandingPage(props) {
  const { existingUser } = useExistingUserContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    console.log(existingUser ,"Existing?",auth.loggedIn());
    if(existingUser)
    props.changeStage("profile");
    // now we send back to app.js that we need to switch.
  }, [existingUser]);


  return (
    <div className="flex flex-col h-screen justify-between">
      <div></div>
      <div className="flex container">
        <div className="bg-slate-200 w-1/2 p-3">
          <h1 className="text-7xl  font-mono text-center"> Middle Where</h1>
          <br />
          <p className="font-serif">
            Middle-Where is a web-based application designed to bring friends
            together using a calculated, centralized geolocation. The motivation
            behind this project is to streamline the process of deciding the
            best place to meet between multiple group members. Individuals can
            choose to be placed into groups with their friends or colleagues,
            and by providing their location details, Middle-Where determines a
            meeting spot based on the closest proximity between all group
            members.
          </p>
        </div>
        <div className="bg-slate-200 w-1/2">
          {auth.loggedIn() ? <div /> : <Login signUp={handleOpen}/>}
        </div>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box > 
            <CreateAccount doClose = {handleClose}/>
          </Box>
        </Modal>
      </div>
      <div></div>
    </div>
  );
}
export default LandingPage;
