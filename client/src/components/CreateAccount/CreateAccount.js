import React, { useState } from "react";
import { useExistingUserContext } from "../../utils/existingUserContext";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reTypePassWord, setReTypePassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { toggleExistingUser, setLogin } = useExistingUserContext();
  const [signUp] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "userName") {
      setUsername(inputValue);
    } else if (inputType === "passWord") {
      setPassword(inputValue);
    } else if (inputType === "reTypePassWord") {
      setReTypePassword(inputValue);
    } else if (inputType === "email") {
      setEmail(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== reTypePassWord) {
      setErrorMessage("Womp Womp passwords do not match.. Try Again!");
    }
    if (!username) {
      setErrorMessage("Username can not be blank.");
    }
    try {
      const { data } = await signUp({
        variables: { username, email, password },
      });
      Auth.login(data.addUser.token);
      setLogin(true);
    } catch (e) {
      console.error(e);
    }

    setUsername("");
    setPassword("");
    setEmail("");
    setReTypePassword("");
  };

  return (
    <div className="createUserForm">
      <h4 className="createUserCardTitle">Create Account</h4>

      <div className="formContainer">
        <div className="inputGroup">
          <span className="inputGroupText">Username:</span>
          <input
            name="userName"
            type="text"
            value={username}
            className="createUserFormInput"
            onChange={handleInputChange}
            placeholder="Username"
            aria-label="Username"
          ></input>
        </div>
        <div className="inputGroup">
          <span className="inputGroupText">Password:</span>
          <input
            name="passWord"
            type="password"
            value={password}
            className="createUserFormInput"
            onChange={handleInputChange}
            placeholder="********"
            aria-label="Password"
          ></input>
        </div>
        <div className="inputGroup">
          <span className="inputGroupText">Retype Password:</span>
          <input
            name="reTypePassWord"
            type="password"
            value={reTypePassWord}
            className="createUserFormInput"
            onChange={handleInputChange}
            placeholder="********"
            aria-label="ReType Password"
          ></input>
        </div>
        <div className="inputGroup">
          <span className="inputGroupText">Email:</span>
          <input
            name="email"
            value={email}
            type="text"
            className="createUserFormInput"
            onChange={handleInputChange}
            placeholder="Email"
            aria-label="Email"
          ></input>
        </div>
        <button
          className="createNewAccountBtn"
          type="button"
          onClick={handleFormSubmit}
        >
          Create Account 
        </button>
        <hr
          style={{
            height: "1px",
            width: "95%",
            borderWidth: "0",
            color: "black",
            backgroundColor: "black",
          }}
        />
        <button className="loginSubmitBtn" onClick={toggleExistingUser}>
          Return to Login 
        </button>
      </div>

      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
      <div></div>
    </div>
  );
}

export default CreateAccount;
