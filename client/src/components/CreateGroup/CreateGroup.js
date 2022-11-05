import React, { Component } from 'react'
import TextField from "@mui/material/TextField";
export default class CreateGroup extends Component {


    

  render() {
    return (
        <div className ="bg-white"> 
              
        <h1> Create Group</h1>
        <TextField
            autoComplete="given-name"
            name="userName"
            required
            fullWidth
            id="userName"
            label="userName"
            autoFocus
          />
        </div>

    )
  }
}
