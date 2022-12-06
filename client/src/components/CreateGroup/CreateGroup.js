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
  
  const handleFormSubmit = async (event) => {
    try {


      const { data } = await createGroup({
        variables: { name },
      });
      console.log(data);
      props.mapSelect(data.createGroup._id)
    } catch (e) {
      console.error(e);
      alert(e.message);

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
          <h1 className="font-noto p-3 font-bold text-3xl"> Create Group</h1>
          <p className="font-noto pb-3"> Please enter group name below to create group.</p>

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
            Create Group
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

export default CreateGroup;
