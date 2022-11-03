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
import NavBar from "./components/NavBar/NavBar";
import auth from "./utils/auth";
const Pages = {
  landing: "landing",
  profile: "profile",
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
    setLoading(false);

    setTimeout(() => {
      setStage(nextStage);
      setLoading(true);
    }, 1000);
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
          {auth.loggedIn()?<NavBar/>:<div></div>}
          {displayContent ?? <LandingPage isShowing={loading} />}

        </ExistingUserProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
