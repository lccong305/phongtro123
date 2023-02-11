import React from 'react'
import {text} from '../ultils/dataContactBot'
// import {Link} from 'react-router-dom'
import {Button} from '../components'


const ContactBot = ({contactButton}) => {
  return (
    <div className="w-3/5 border  my-10 p-5 rounded-md bg-white flex gap-1 flex-col items-center ">
      <img src={text.image} className="h-[150px] mb-2"/>
      <span>{text.content}</span>
      <div className="font-medium text-[#f73859]">
        {text.hotline}
      </div>
      <div className="flex flex-col items-center">
        <a
          href = {`tel:${text.phone}`}
          className="font-bold text-lg"
        >
          {`Điện thoại: ${text.phone}`}
        </a>
        <a
          href = {`https://zalo.me/${text.zalo}`}
          target = '_blank'
          className="font-bold text-lg"
        >
          {`Zalo: ${text.zalo}`}
        </a>
      </div>      
    </div>
  )
}

export default ContactBot