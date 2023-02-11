import React from 'react'
import {Province, ItemSidebar,RelativePost } from '../../components'
import { List, Pagination } from './index'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import { path } from '../../ultils/constant'


const LikeList = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const {postLike} = useSelector(state => state.post)
  console.log(postLike)
  const handleArrPostLike = (postLike) => {
    let arr = []
    for (let index = 0; index < postLike.length; index++) {
      arr.push(postLike[index].postId)
    }
    return arr
  }
  const arrPL = handleArrPostLike(postLike)
  console.log(arrPL)
  
  
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <div className="w-full flex gap-3">
          <div className="w-[70%]">
            <List postId={arrPL.length > 0 ? arrPL : 'khongcobaiyeuthich' } />
            <Pagination />
          </div>
          <div className="w-[30%]  flex flex-col gap-4 justify-start items-center">
            {/* <ItemSidebar content = {categories} title="Danh sách cho thuê" /> */}
            <RelativePost />
            <RelativePost newPost/>
          </div>
      </div>
  )
}

export default LikeList