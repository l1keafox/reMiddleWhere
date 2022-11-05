import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ExistingUserProvider from "./utils/existingUserContext";
import { useExistingUserContext } from "./utils/existingUserContext";
import { useState, useEffect } from "react";
import LandingPage from "./pages/Landing/LandingPage.js";
import ProfilePage from "./pages/Profile/ProfilePage.js";
import NavBar from "./components/NavBar/NavBar";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import JoinGroup from "./components/JoinGroup/JoinGroup";
import auth from "./utils/auth";
import Modal from "@mui/material/Modal";
import { ModalUnstyled } from "@mui/base";
import { Box } from "@mui/material";

const Pages = {
  landing: "landing",
  profile: "profile",
};

const Modals = {
  create: "create",
  join:"join"
};

const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [stage, setStage] = useState(Pages.landing);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalContent,changeModal] = useState(null);
  let displayContent;

  useEffect(() => {
    setLoading(true);
    if (auth.loggedIn()) {
      setStage(Pages.profile);
    }
  }, []);

  useEffect(() => {
    if (auth.loggedIn()) {
      changeStage(Pages.profile);
    } else {
      changeStage(Pages.landing);
    }
  }, [auth.loggedIn()]);

  function changeStage(nextStage) {
    console.log(nextStage);
    if (nextStage === Modals.create) {
      console.log("in CREATE");
      setOpen(true);
      changeModal( <CreateGroup /> );
      return;
    }
 
    
    if(nextStage === Modals.join){
      console.log("in JOIN");
      setOpen(true);
      changeModal(  <JoinGroup /> );
      return;
    }
    if (nextStage === "logout") {
      auth.logout();
      return;
    }
    setLoading(false);

    setTimeout(() => {
      setStage(nextStage);
      setLoading(true);
    }, 500);
  }

  switch (stage) {
    case Pages.profile:
      displayContent = <ProfilePage isShowing={loading} />;
      break;
    default:
      displayContent = <LandingPage isShowing={loading} />;
      break;
  }
  return (
    <>
      <ApolloProvider client={client}>
        <ExistingUserProvider>
          {auth.loggedIn() ? (
            <NavBar
              navLink={(e) => changeStage(e.target.getAttribute("data-nav"))}
            />
          ) : (
            <div></div>
          )}
          {displayContent ?? <LandingPage isShowing={loading} />}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              {modalContent ?? <JoinGroup />}
            </Box>
          </Modal>
        </ExistingUserProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
