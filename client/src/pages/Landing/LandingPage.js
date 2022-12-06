import { useState, useEffect } from "react";


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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    if(existingUser){
        props.changeStage("profile");
    }
  }, [existingUser]);

  return (
    <div id="landingBg">
    <div  className="flex flex-col h-screen justify-center" >
      <div className="flex container flex-col lg:flex-row">
        <div className="bg-slate-200 lg:w-1/2 p-3 lg:h-[40rem] cursor-default select-none ">
          <h1 className="text-7xl  font-marker text-center  "> Middle<span className="text-green-700">Where</span></h1>
          <br />
          <p className="font-noto text-yellow-800 text-2xl p-3 text-justify cursor-default select-none">
            Middle-Where is a web-based application designed to bring friends
            together using a calculated, centralized geolocation.
            </p>
            <p className="font-noto text-yellow-800 text-2xl p-3 text-justify  cursor-default select-none"> The motivation
            behind this project is to streamline the process of deciding the
            best place to meet between multiple group members. Individuals can
            choose to be placed into groups with their friends or colleagues,
            and by providing their location details, Middle-Where determines a
            meeting spot based on the closest proximity between all group
            members.
          </p>
        </div>
        <div className="bg-slate-200  lg:w-1/2">
          {auth.loggedIn() ? <div /> : <Login signUp={handleOpen}/>}
        </div>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box > 
            <CreateAccount doClose = {handleClose} />
          </Box>
        </Modal>
      </div>
      </div>
    </div>
  );
}
export default LandingPage;
