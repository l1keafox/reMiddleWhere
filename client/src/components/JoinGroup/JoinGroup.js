import React, { useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CREATE_GROUP } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const JoinGroup = (props) => {
  const [joinGroup] = useMutation(CREATE_GROUP);
  const [groupName, setGroupName] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  
  const handleFormSubmit = async (event) => {
    try {
      const { data } = await joinGroup({
        variables: { groupName},
      });
    } catch (e) {
      console.error(e);
    }
    props.doClose();
  };

  const handleInputChange = (e) => {
    const {target} = e;
    if(target.name === 'groupName'){
      setGroupName(target.value);
    }
    if(target.name === "password"){
      setGroupPassword(target.value);
    }
    
  }


  return (
    <div className="bg-white">
      <h1> Join Group</h1>
      <TextField
        name="groupName"
        required
        fullWidth
        id="groupName"
        label="groupName"
        value={groupName}
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
    </div>
  );
};

export default JoinGroup;
