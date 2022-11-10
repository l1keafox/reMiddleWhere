import React, { useState, createContext, useContext } from "react";
const ExistingUserContext = createContext();
export const useExistingUserContext = () => useContext(ExistingUserContext);

export default function ExistingUserProvider(props) {
  const [existingUser, setExistingUser] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);

  const toggleExistingUser = () => {
    return setExistingUser(!existingUser);
  };
  
  const setLogin = (b) => {
    return setLoggedIn(b);
  }

  return (
    <ExistingUserContext.Provider value={{ existingUser,loggedIn,setLogin, toggleExistingUser }}>
      {props.children}
    </ExistingUserContext.Provider>
  );
}
