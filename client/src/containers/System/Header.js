import React from 'react'
import { Navigation } from '../Public'

const Header = () => {
  return (
    <div className="w-full flex h-[40px] flex-none">
      <div className="flex items-center justify-center font-extrabold text-white bg-secondary1 w-[300px] flex-none" >
        Phongtro123.com
      </div>
      <Navigation isAdmin={true} />
    </div>
  )
}

export default Header