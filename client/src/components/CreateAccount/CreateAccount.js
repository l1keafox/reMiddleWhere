import React, { useState } from "react";
import { useExistingUserContext } from "../../utils/existingUserContext";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from "@mui/material/Container";
function CreateAccount(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [reTypePassWord, setReTypePassword] = useState("");
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
    } else if (inputType === "email") {
      setEmail(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // if (password !== reTypePassWord) {
    //   setErrorMessage("Womp Womp passwords do not match.. Try Again!");
    // }
    if (!username) {
      
    }
    try {
      const { data } = await signUp({
        variables: { username, email, password },
      });
      props.doClose();
      Auth.login(data.addUser.token);
      toggleExistingUser(true);
      setLogin(true);
    } catch (e) {
      console.error(e);
      setErrorMessage(e);
      console.log(e);
    }

    setUsername("");
    setPassword("");
    setEmail("");
    
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" className="bg-slate-100 font-noto">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="font-noto pt-4 font-bold text-3xl">
            Sign up
          </h1>
          <Box
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="userName"
                  autoFocus
                  value={username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passWord"
                  label="Password"
                  type="passWord"
                  id="passWord"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="error"
            onClick={props.doClose}
            sx={{ mb: 2 }}
          >
            Cancel
          </Button>
          {errorMessage && (
            <div className="my-2 p-2 bg-danger text-white text-center">{errorMessage.message}</div>
          )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </div>
  );
}

export default CreateAccount;
