import React, { useState, createContext, useContext } from "react";

// initializing a new context for existing versus new users on HomePage
const ExistingUserContext = createContext();
// creating a custom hook - can immediately use the existingUserContext in other components (HomePage, Login, CreateUser)
export const useExistingUserContext = () => useContext(ExistingUserContext);

// creating the provider for this context
export default function ExistingUserProvider(props) {
  // state variable - does the user have an existing account?
  const [existingUser, setExistingUser] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  // const [userSettings, setUserSetting] = useState({});

  // method to update the state variable
  const toggleExistingUser = () => {
    return setExistingUser(!existingUser);
  };
  const setLogin = (b) => {
    return setLoggedIn(b);
  }
  
  // const setSetting = () =>{

  // }

  return (
    // providing existingUser state variable and toggleExistingUser() method to all child components
    <ExistingUserContext.Provider value={{ existingUser,loggedIn,setLogin, toggleExistingUser }}>
      {props.children}
    </ExistingUserContext.Provider>
  );
}
