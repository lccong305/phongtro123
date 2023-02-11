import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../assets/avatar.jpg'



const User = () => {
    const {userData } = useSelector(state => state.user)


  return (
    <div className="flex items-center gap-2 ">
        <img src={userData?.avatar || avatar} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-full"/>
        <div className="flex flex-col">
            <span>Xin chào, <span className="font-bold" >{userData?.name}</span> !</span>
            <span>Mã tài khoản: <span className="font-bold" >{userData?.id?.match(/\d/g).join('')?.slice(0, 6)}</span>...</span>
        </div>
    </div>
  )
}

export default User