import React, {memo, useState, useEffect} from 'react'
import avatar from '../assets/avatar.jpg'
import {Button} from '../components'
import icons from '../ultils/icons' 
import { useSelector, useDispatch } from 'react-redux'
import { getPostLike } from '../store/actions'
import { apiCreatePostLike, apiDeletePostLike } from '../services'

const {BsTelephoneFill, SiZalo, RiHeartFill, RiHeartLine} = icons

const BoxInfo = ({user,postId}) => {
    const dispatch = useDispatch()
    const {postLike} = useSelector(state => state.post)
    const [isLike, setIsLike] = useState(false)
    useEffect(() => {
        setIsLike(postLike.some(post => post.postId === postId))
    },[postId])
    const handleClickHeart = async() => {
        setIsLike(!isLike)
        if (!isLike) {
             await apiCreatePostLike(postId)
             dispatch(getPostLike())

        }
        else {
            console.log('bo thich')
             await apiDeletePostLike(postId)
             dispatch(getPostLike())
        }
    }
  return (
    <div className='w-full bg-[#febb02] border rounded-lg flex flex-col items-center p-4 gap-2' >
        <img src={avatar || user?.avatar} className='w-[80px] h-[80px] object-cover rounded-full outline-none' />
        <span className='font-semibold text-lg'>{user?.name}</span>
        <span className='text-sm italic'>{user?.phone}</span>
        <a href={`tel:${user?.phone}`} className='w-full'>
            <Button 
                text='Số điện thoại'
                bgColor='bg-[#16c784]'
                textColor='text-white font-bold text-lg hover:bg-[#13bb7b]'
                fullWidth
                IcBefore={BsTelephoneFill}
            />
        </a>
        <a href={`https://zalo.me/${user?.zalo || user?.phone}`} className='w-full' target="_blank">
            <Button 
                text='Liên hệ Zalo'
                bgColor='bg-white'
                textColor='font-bold text-lg'
                fullWidth
                // IcBefore={SiZalo}
            />
        </a>
        <Button 
                text='Yêu thích'
                bgColor='bg-white'
                textColor='font-bold text-lg'
                fullWidth
                IcBefore={isLike ? RiHeartFill : RiHeartLine}
                onClick={() => {
                    handleClickHeart()                    
                }}
            />
    </div>
  )
}

export default memo(BoxInfo)