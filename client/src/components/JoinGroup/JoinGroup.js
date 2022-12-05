import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { JOIN_GROUP } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const JoinGroup = (props) => {
  const [joinGroup] = useMutation(JOIN_GROUP);
  const [name, setGroupName] = useState("");
  
  const handleFormSubmit = async (event) => {
    try {
      const { data } = await joinGroup({
        variables: { name },
      });
      props.mapSelect(data.joinGroup._id)
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
          <h1 className="font-noto p-3 font-bold text-3xl"> Join Group</h1>
          <p className="font-noto pb-3"> Please enter group name below to join group.</p>
          <TextField
            name="groupName"
            required
            fullWidth
            id="groupName"
            label="groupName"
            value={name}
            onChange={handleInputChange}
            autoFocus
          />
          {/* <TextField
            name="password"
            required
            fullWidth
            id="password"
            label="password"
            value={groupPassword}
            onChange={handleInputChange}
            autoFocus
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleFormSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Join Group
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

        </Box>
      </Container>
    </div>
  );
};

export default JoinGroup;
