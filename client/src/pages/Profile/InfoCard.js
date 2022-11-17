import React from 'react'
import auth from '../../utils/auth'
const InfoCard = () => {
  return (
    <div className='border border-slate-100 bg-slate-800 text-white opacity-75'>
          <h1>Info Page</h1>
          <h1> WHO AM I: {auth.getUser().data.username}</h1>
          <h1> my id: {auth.getUser().data._id}</h1>
          <h1> my email: {auth.getUser().data.email}</h1>
    </div>
  )
}

export default InfoCard