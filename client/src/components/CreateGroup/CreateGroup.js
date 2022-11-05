import React, { useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CREATE_GROUP } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
const CreateGroup = (props) => {
  const [createGroup] = useMutation(CREATE_GROUP);
  const [groupName, setGroupName] = useState("");
  const handleFormSubmit = async (event) => {
    try {
      const { data } = await createGroup({
        variables: { groupName},
      });
    } catch (e) {
      console.error(e);
    }
    props.doClose();
  };

  const handleInputChange = (e) => {
    const {target} = e;
    setGroupName(target.value);

  }


  return (
    <div className="bg-white">
      <h1> Create Group</h1>
      <TextField
        autoComplete="given-name"
        name="userName"
        required
        fullWidth
        id="userName"
        label="userName"
        value={groupName}
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

export default CreateGroup;
