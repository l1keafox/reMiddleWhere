import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { useExistingUserContext } from "../../utils/existingUserContext";
import Auth from "../../utils/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
    console.log(formState);
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
    <div className="loginCard font-noto">
      {data ? (
        <p>
          {/* Success! You may now head <Link to="/">back to the homepage.</Link> */}
        </p>
      ) : (
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          </Avatar> */}
            {/* <LockOutlinedIcon /> */}
          <h1 className="font-noto text-4xl cursor-default select-none">
            Sign in
          </h1>
          <Box
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleFormSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <a href="#" variant="body2" onClick={props.signUp}>
                  Don't have an account? <span className="text-blue-700"> Sign Up </span>
                </a>
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="quick Join"
              label="groupID"
              type="groupName"
              id="groupName"
              autoComplete="current-groupName"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join Group
            </Button>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Box>
          
        </Box>
      
      )}

      {error && (
        <div className="my-2 p-2 bg-danger text-white text-center">{error.message}</div>
      )}
    </div>
  );
};

export default Login;
