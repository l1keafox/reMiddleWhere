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
import MapsPage from "./pages/Maps/MapsPage";
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
  map: "map",
};

const Modals = {
  create: "create",
  join: "join",
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
  const [modalContent, changeModal] = useState(null);
  const [mapGroupId, setGroupId] = useState(null);
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
    console.log("Change stage",nextStage);
    if (nextStage === Modals.create) {
      console.log("in CREATE");
      setOpen(true);
      changeModal(<CreateGroup doClose={handleClose} />);
      return;
    }

    if (nextStage === Modals.join) {
      console.log("in JOIN");
      setOpen(true);
      changeModal(<JoinGroup doClose={handleClose} />);
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
    console.log("map select", groupId);
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
      displayContent = <MapsPage groupId={mapGroupId} />;
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
            <Box>{modalContent ?? <JoinGroup />}</Box>
          </Modal>
        </ExistingUserProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
