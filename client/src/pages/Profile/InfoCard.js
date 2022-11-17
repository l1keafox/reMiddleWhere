import React from 'react'
import auth from '../../utils/auth'
import avatar from './placeAvatar.PNG'
const InfoCard = () => {
  return (
    <div className='border border-slate-100 bg-slate-800 text-white opacity-95 flex justify-start mx-20 '>
          <img src={avatar} className="flex-none w-1/7 rounded-full opacity-100"></img>
          <div>
            <h1 className='text-5xl font-bold'> {auth.getUser().data.username} <span className='text-sm font-medium pl-5'> {auth.getUser().data._id}</span></h1>
            <h1 className='font-medium text-xl'>{auth.getUser().data.email}</h1>
          </div>
    </div>
  )
}

export default InfoCard