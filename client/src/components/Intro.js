import React, {memo} from 'react'
import {text} from '../ultils/dataIntro'
import icons from '../ultils/icons'
import {Button} from '../components'
import {useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'

const {GrStar} = icons

const Intro = () => {

  const { categories } = useSelector(state => state.app)

  return (
    <div className="w-3/5 border  mt-5 p-5 rounded-md bg-white flex gap-1 flex-col items-center ">
      <span className="font-semibold text-xl">{text.title}</span>
      <span className="text-center text-base">
        {text.description1}
        <span>
          {categories.length > 0 && categories.map(item => {
            return (
              <Link to= {`/${formatVietnameseToString(item.value)}`}
                key={item.code}
                className="text-blue-600 hover:text-orange-500 font-medium"
              >
                {`${item.value.toLowerCase() }, `}
              </Link>
            )
          })}
        </span>
          {text.description2}
      </span>
      <span className="font-semibold text-xl">{text.content} </span>
      <div className="flex">
        <GrStar color='yellow' size= '24px' />
        <GrStar color='yellow' size= '24px' />
        <GrStar color='yellow' size= '24px' />
        <GrStar color='yellow' size= '24px' />
        <GrStar color='yellow' size= '24px' />
      </div>
      <span className="text-center text-sm italic mt-2">{text.comment1}</span>
      <span className="text-center text-sm  ">{text.author1}</span>
      <span className="text-center text-sm italic mt-2">{text.comment2}</span>
      <span className="text-center text-sm  ">{text.author2}</span>
      <span className="font-semibold text-xl mt-4">{text.question} </span>
      <span className="text-center text-sm  ">{text.answer}</span>
      <Link to='/he-thong/tao-moi-bai-dang'>
        <Button text='Đăng tin ngay' bgColor='bg-[#f73859]' textColor='text-white'/>
      </Link>
    </div>
  )
}

export default memo(Intro)