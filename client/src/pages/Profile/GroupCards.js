import React from 'react'
import { Paper,Button } from '@mui/material'
const GroupCards = ({data,mapSelect}) => {
  return (
    // <div>GroupCards</div>
    <div className="flex justify-center border-2 border-yellow-900">
    {data && data.me ? data.me.groups.map((group, index) => (
      <Paper className="w-1/4 p-3 m-3 hover:bg-slate-200" key={index}>
        <h1> Group Name: {group.name} </h1>
        <h1> Group id: {group._id} </h1>
        <h1> Users : </h1>
        {group.users.map((user, index2) => (
          <h2 key={index2}> user </h2>
        ))}
        <h2> Lat :</h2>
        <h2> Long :</h2>
        <Button data-id={group._id} onClick={mapSelect}>
          {" "}
          Click Here To Go To Map
        </Button>
      </Paper>
    )):<div></div>}
  </div>

  )
}

export default GroupCards