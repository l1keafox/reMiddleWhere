import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CREATE_GROUP } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const CreateGroup = (props) => {
  const [createGroup] = useMutation(CREATE_GROUP);
  const [name, setGroupName] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const handleFormSubmit = async (event) => {
    try {

      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
       });

      const { data } = await createGroup({
        variables: { name },
      });
      console.log(data);

    } catch (e) {
      console.error(e);
    }
    props.doClose();
  };

  const handleInputChange = (e) => {
    const { target } = e;
    if (target.name === "groupName") {
      setGroupName(target.value);
    }
    if (target.name === "password") {
      setGroupPassword(target.value);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" className="bg-slate-100">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1> Create Group</h1>
          <TextField
            name="groupName"
            required
            fullWidth
            id="name"
            label="groupName"
            value={name}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            name="password"
            required
            fullWidth
            id="password"
            label="password"
            value={groupPassword}
            onChange={handleInputChange}
            autoFocus
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
        </Box>
      </Container>
    </div>
  );
};

export default CreateGroup;
