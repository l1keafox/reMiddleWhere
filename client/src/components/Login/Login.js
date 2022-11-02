import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { useExistingUserContext } from "../../utils/existingUserContext";
import Auth from "../../utils/auth";

const Login = (props) => {
  const { toggleExistingUser, setLogin } = useExistingUserContext();

  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      toggleExistingUser(true);
      setLogin(true);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="loginCard">
      <h4 className="loginCardTitle">User Login</h4>
      {data ? (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit} className="loginFormContainer">
          <input
            className="loginFormInput"
            placeholder="username"
            name="username"
            type="username"
            value={formState.username}
            onChange={handleChange}
          />
          <input
            className="loginFormInput"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            onClick={handleFormSubmit}
            className="loginSubmitBtn"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Login 
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
          <button className="createNewAccountBtn" onClick={toggleExistingUser}>
            Create Account 
          </button>
        </form>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default Login;
