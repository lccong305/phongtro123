import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getPostsLimit} from '../../store/actions'
import { SliderCustom, Map, BoxInfo, RelativePost } from '../../components'
import icons from '../../ultils/icons'
import moment from 'moment'
import {useNavigate, createSearchParams} from 'react-router-dom'
import { path } from '../../ultils/constant'



const {CiLocationOn, TbReportMoney, RiCropLine, BsClock, CiHashtag } = icons



const DetailPost = () => {
  const dispatch = useDispatch()
  const {postId} = useParams();
  const [isExpired, setIsExpired] = useState(false)
  const navigate = useNavigate()

  

  useEffect(() => {
    postId && dispatch(getPostsLimit({id: postId}))
    
  },[postId])
  const {posts } = useSelector(state => state.post)
  // console.log(posts)
  const formatDate = 'DD/MM/YYYY'
  const checkStatus = (datetime) =>  moment(datetime, formatDate).isSameOrAfter(new Date().toDateString())
  const arrAddress = posts && posts[0]?.address.split(',')
  const desAdress = posts && `${arrAddress[arrAddress?.length - 2]},${arrAddress[arrAddress?.length - 1]}`

  const handleSearchPost = (categoryCode, desAdress) => {
    const titleSearch = `${posts && posts[0].overviews.type} ${desAdress}`
    const query = {
      categoryCode,
      address: desAdress
    }
    console.log(query)
    navigate({
      pathname: `/${path.SEARCH}`,
      search: createSearchParams(query).toString(),

    }, { state: { titleSearch } })
  }
  
  return (
    <>
    <div className="w-full flex gap-4 py-5 relative">
   {!checkStatus(posts[0]?.overviews?.expire?.split(' ')[3] || posts[0]?.overviews?.expire ) &&  <div className="absolute z-20 w-full h-full bg-overlay-70 text-white text-6xl flex items-start justify-center pt-10">Bài viết đã hết hạn !</div>}
   { posts[0]?.users?.name === null ?  <div className="absolute z-20 w-full h-full bg-overlay-70 text-white text-4xl text-center pt-10">Tài khoản của người đăng bài đã bị xóa ! Hãy xem bài đăng khác !</div> : ''}
      <div className="w-[65%] bg-white rounded-md shadow-md ">
        <SliderCustom images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)}/>
        <div className='px-5'>
          <div className="my-5 flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-red-600">{posts[0]?.title}</h1>
            <div className="flex gap-2">
              <span>Chuyên mục:</span>
              <span onClick={()=>{
                handleSearchPost(posts[0].categoryCode,desAdress)
              }} 
                className="text-blue-700 underline hover:text-orange-600 cursor-pointer font-semibold"
              >
                {posts[0]?.overviews?.type} {arrAddress[arrAddress.length - 2]},{arrAddress[arrAddress.length - 1]}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <CiLocationOn color='blue' />
              <span>{posts[0]?.address}</span>
            </div>
            <div className="flex gap-10 items-center">
              <div className='flex items-center gap-1 text-green-700 font-semibold text-lg'>
                <TbReportMoney />
                {posts[0]?.attributes?.price}
              </div>
              <div className='flex items-center gap-1'>
                <RiCropLine />
                {posts[0]?.attributes?.acreage}
              </div>
              <div className='flex items-center gap-1'>
                <BsClock />
                {posts[0]?.attributes?.published}
              </div>
              <div className='flex items-center gap-1'>
                <CiHashtag />
                {posts[0]?.attributes?.hashtag}
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-bold mb-2'>Thông tin mô tả</h2>
            <div className='flex flex-col gap-[2px]'>
              {posts[0]?.description && Array.isArray(JSON.parse(posts[0]?.description)) ? JSON.parse(posts[0]?.description)?.map((item, index)=> {
                return (
                  <span key={index}>{item}</span>
                )
              }) : <span>{posts[0]?.description && JSON.parse(posts[0]?.description)}</span>}
            </div>
          </div>
          <div>
            <h2 className='text-xl font-bold my-3'>Đặc điểm tin đăng</h2>
            <table>
              <tbody>
                <tr>
                  <td className='w-[200px] py-1'>Mã tin:</td>
                  <td>{posts[0]?.attributes?.hashtag}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Khu vực:</td>
                  <td>{posts[0]?.overviews?.area}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Loại tin rao:</td>
                  <td>{posts[0]?.overviews?.type}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Đối tượng:</td>
                  <td>{posts[0]?.overviews?.target}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Gói tin:</td>
                  <td>{posts[0]?.overviews?.bonus}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Ngày đăng</td>
                  <td>{posts[0]?.overviews?.created}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Ngày hết hạn</td>
                  <td>{posts[0]?.overviews?.expire}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 className='text-xl font-bold my-3'>Thông tin liên hệ</h2>
            <table>
              <tbody>
                <tr>
                  <td className='w-[200px] py-1'>Liên hệ:</td>
                  <td>{posts[0]?.users?.name}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Điện thoại:</td>
                  <td>{posts[0]?.users?.phone}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Zalo:</td>
                  <td>{posts[0]?.users?.zalo}</td>
                </tr>
                <tr>
                  <td className='w-[200px] py-1'>Facebook:</td>
                  <td>{posts[0]?.users?.fbUrl}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex flex-col gap-1 py-2'>
            <h2 className='text-xl font-bold mt-2'>Bản đồ</h2>
            <span className='italic'>Địa chỉ: {posts[0]?.address}</span>
            <Map address = {posts[0]?.address} />
            <span>Bạn đang xem nội dung tin đăng: <span class="italic">{posts[0]?.title} - Mã tin {posts[0]?.attributes?.hashtag}</span> Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để PhòngTrọ123 có thể xử lý.</span>
          </div>
        </div>
      </div>
      <div className="w-[35%] flex flex-col gap-4">
        <BoxInfo user={posts[0]?.users} postId = {postId} />
        <RelativePost />
        <RelativePost newPost />
      </div>
    </div>
    
    </>
  )
}

export default DetailPost