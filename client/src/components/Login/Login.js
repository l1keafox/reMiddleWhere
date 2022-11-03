import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { useExistingUserContext } from "../../utils/existingUserContext";
import Auth from "../../utils/auth";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    <div className="loginCard">
      {data ? (
        <p>
          {/* Success! You may now head <Link to="/">back to the homepage.</Link> */}
        </p>
      ) : (
        // <form onSubmit={handleFormSubmit} className="loginFormContainer">
        //   <input
        //     className="loginFormInput"
        //     placeholder="username"
        //     name="username"
        //     type="username"
        //     value={formState.username}
        //     onChange={handleChange}
        //   />
        //   <input
        //     className="loginFormInput"
        //     placeholder="******"
        //     name="password"
        //     type="password"
        //     value={formState.password}
        //     onChange={handleChange}
        //   />
        //   <button
        //     onClick={handleFormSubmit}
        //     className="loginSubmitBtn"
        //     style={{ cursor: "pointer" }}
        //     type="submit"
        //   >
        //     Login 
        //   </button>
        //   <hr
        //     style={{
        //       height: "1px",
        //       width: "95%",
        //       borderWidth: "0",
        //       color: "black",
        //       backgroundColor: "black",
        //     }}
        //   />
        //   <button className="createNewAccountBtn" onClick={toggleExistingUser}>
        //     Create Account 
        //   </button>
        // </form>
 <Box
 sx={{
   my: 8,
   mx: 4,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
 }}
>
 <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
   {/* <LockOutlinedIcon /> */}
 </Avatar>
 <Typography component="h1" variant="h5">
   Sign in
 </Typography>
 <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
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
       <Link href="#" variant="body2">
         Forgot password?
       </Link>
     </Grid>
     <Grid item>
       <Link href="#" variant="body2">
         {"Don't have an account? Sign Up"}
       </Link>
     </Grid>
   </Grid>
   <TextField
     margin="normal"
     required
     fullWidth
     name="quick Join"
     label="groupID"
     type="password"
     id="password"
     autoComplete="current-password"
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
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default Login;
