import React from 'react'
import auth from '../../utils/auth'
import avatar from './placeAvatar.PNG'
const InfoCard = () => {
  return (
    <div className='border-2 border-slate-100 bg-slate-800 text-white opacity-95 flex flex-col sm:flex-row  justify-start mx-20 select-none'>
          <img src={avatar} className="w-60 flex-none rounded-full opacity-100 p-3"></img>
          <div className='sm:pl-4 p-3'>
            <h1 className='text-5xl font-bold cursor-default select-none pb-3'> {auth.getUser().data.username} </h1>
            <h1 className='font-medium text-xl cursor-default select-none'>{auth.getUser().data.email}</h1>
          </div>
    </div>
  )
}

export default InfoCard