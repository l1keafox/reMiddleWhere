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
import { useState, useEffect } from "react";
import LandingPage from "./pages/Landing/LandingPage.js";
import ProfilePage from "./pages/Profile/ProfilePage.js";
import MapsPage from "./pages/Maps/MapsPage";
import NavBar from "./components/NavBar/NavBar";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import JoinGroup from "./components/JoinGroup/JoinGroup";
import Feedback from "./components/Feedback/GetFeedback"
import auth from "./utils/auth";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

const Pages = {
  landing: "landing",
  profile: "profile",
  map: "map",
};

const Modals = {
  create: "create",
  join: "join",
  feedback:"feedback"
};

const httpLink = createHttpLink({
  uri: "http://raspberrypi.local:3001/graphql",
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
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [modalContent, changeModal] = useState(null);
  const [mapGroupId, setGroupId] = useState(null);
  let displayContent;

  useEffect(() => {
    setLoading(true);
    if (auth.loggedIn()) {
      setStage(Pages.profile);
    } else {
      console.log('Token invald?');
    }
  }, []); 

  function changeStage(nextStage) {
    console.log(" APP://Change stage", nextStage);
    if (nextStage === Modals.create) {
      setOpen(true);
      changeModal(<CreateGroup doClose={handleClose} mapSelect={mapSelect}/>);
      return;
    }

    if (nextStage === Modals.join) {
      setOpen(true);
      changeModal(<JoinGroup doClose={handleClose}  mapSelect={mapSelect}/>);
      return;
    }
    if (nextStage === Modals.feedback) {
      setOpen(true);
      changeModal(<Feedback doClose={handleClose}  />);
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

  function mapSelect(groupId) {
    setGroupId(groupId);
    changeStage(Pages.map);
  }

  switch (stage) {
    case Pages.profile:
      displayContent = (
        <ProfilePage
          isShowing={loading}
          mapSelect={(e) => mapSelect(e.target.getAttribute("data-id"))}
        />
      );
      break;
    case Pages.map:
      displayContent = <MapsPage groupId={mapGroupId} changeStage={changeStage} />;
      break;
    case Pages.landing:
      displayContent = (
        <LandingPage isShowing={loading} changeStage={changeStage} />
      );
      break;
    default:
      displayContent = (
        <LandingPage isShowing={loading} changeStage={changeStage} />
      );
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
            <Box>{modalContent ?? <JoinGroup />}</Box>
          </Modal>
        </ExistingUserProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
