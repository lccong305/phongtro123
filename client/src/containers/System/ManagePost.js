import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'
import moment from 'moment'
import {Button, UpdatePost, ViewPost} from '../../components'
import { apiDeletePost } from '../../services'
import Swal from 'sweetalert2'

const ManagePost = () => {

    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [isView, setIsView] = useState(false)
    const [postView, setPostView] = useState({})
    const [updateData, setUpdateData] = useState(false)
    const { postOfCurrent, dataEdit } = useSelector(state => state.post)
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({
        statusC: 0,
        statusAc: 0,
    })

    useEffect(() => {
        !dataEdit && dispatch(actions.getPostsLimitadmin())
    },[dataEdit, updateData])

    useEffect(() => {
        setPosts(postOfCurrent)
    },[postOfCurrent])

    useEffect(() => {
        !dataEdit && setIsEdit(false)
    },[dataEdit])

    // console.log(postOfCurrent)

    const formatDate = 'DD/MM/YYYY'

    const checkStatus = (datetime) =>  moment(datetime, formatDate).isSameOrAfter(new Date().toDateString())

    const handleDeletePost = async (postId) => {
        // console.log(postId)
        const response = await apiDeletePost(postId)
        if (response?.data.err === 0) {
            setUpdateData(prev => !prev)
        }
        else {
            Swal.fire('Thất bại','Xóa bài đăng thất bài !', 'error')
        }
    }

    // const handleFilterByStatus = (statusCode) => {
    //     setStatus(statusCode)
    //     if (statusCode === 1) {
    //         const activePost = postOfCurrent?.filter(item => !checkStatus(item?.overviews?.expire?.split(' ')[3]))
    //         setPosts(activePost)
    //     }
    //     else if (statusCode === 2) {
    //         const expiredPost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expire?.split(' ')[3]))
    //         setPosts(expiredPost)
    //     }
    //     else {
    //         setPosts(postOfCurrent)
    //     }
    // }

    // useEffect(() => {
    //     if (statusAc === 1 && statusC === 1) {
    //         const activePost = postOfCurrent?.filter(item => (!checkStatus(item?.overviews?.expire?.split(' ')[3]) && item.status ==='checked'))
    //         setPosts(activePost)
    //     }
    //     else if (statusAc === 1 && statusC === 2) {
    //         const expiredPost = postOfCurrent?.filter(item => !checkStatus(item?.overviews?.expire?.split(' ')[3]) && item.status ==='unChecked')
    //         setPosts(expiredPost)
    //     }
    //     if (statusAc === 2 && statusC === 1) {
    //         const activePost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expire?.split(' ')[3]) && item.status ==='checked')
    //         setPosts(activePost)
    //     }
    //     else if (statusAc === 2 && statusC === 2) {
    //         const expiredPost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expire?.split(' ')[3]) && item.status ==='unChecked')
    //         setPosts(expiredPost)
    //     }
    //     else if (statusAc === 0 && statusC === 1) {
    //         const expiredPost = postOfCurrent?.filter(item => item.status ==='checked')
    //         setPosts(expiredPost)
    //     }
    //     else {
    //         setPosts(postOfCurrent)
    //     }
    //     console.log(statusC)
    //     console.log(statusAc)
    //     console.log(posts)

    // },[statusAc, statusC, posts])

    const handleFilterByStatus = ({statusC, statusAc}) => {
        if (statusC === 0 && statusAc === 0) {
                setPosts(postOfCurrent)
            }
            else if (statusC === 0 && statusAc === 1) {
                const expiredPost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
                setPosts(expiredPost)
            }
            else if (statusC === 0 && statusAc === 2) {
                const activePost = postOfCurrent?.filter(item => !checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
                setPosts(activePost)
            }
            else if (statusC === 1 && statusAc === 0) {
                const expiredPost = postOfCurrent?.filter(item => item.status ==='checked')
                setPosts(expiredPost)
            }
            else if (statusC === 1 && statusAc === 1) {
                const expiredPost = postOfCurrent?.filter(item => item.status ==='checked' && checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
                setPosts(expiredPost)
            }
            else if (statusC === 1 && statusAc === 2) {
                const expiredPost = postOfCurrent?.filter(item => item.status ==='checked' && !checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
                setPosts(expiredPost)
            }
            else if (statusC === 2 && statusAc === 0) {
                const expiredPost = postOfCurrent?.filter(item => item.status ==='unChecked')
                setPosts(expiredPost)
            }
            else if (statusC === 2 && statusAc === 1) {
                const expiredPost = postOfCurrent?.filter(item => item.status ==='unChecked' && checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
                setPosts(expiredPost)
            }
            else if (statusC === 2 && statusAc === 2) {
                const expiredPost = postOfCurrent?.filter(item => item.status ==='unChecked' && !checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire))
                setPosts(expiredPost)
            }
    }
    // console.log(posts)

  return (
    <div className="px-9">
        <div className="py-4 border-b flex justify-between items-center">
            <h1 className="font-medium text-3xl ">
                Quản lý bài đăng
            </h1>
            <div className="flex gap-2">
                <select
                    value={filter.statusC}
                    name=""
                    id=""
                    className="outline-none border border-gray-400 py-1 px-2 rounded-md"
                    onChange={e => setFilter(prev => ({...prev, statusC: +e.target.value}))}
                > 
                    <option value="0">Lọc theo trạng thái duyệt</option>
                    <option value="1">Đã duyệt</option>
                    <option value="2">Chờ duyệt</option>

                </select>
                <select
                    value={filter.statusAc}
                    name=""
                    id=""
                    className="outline-none border border-gray-400 py-1 px-2 rounded-md"
                    onChange={e => setFilter(prev => ({...prev, statusAc: +e.target.value}))}
                > 
                    <option value="0">Lọc theo trạng thái hoạt động</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="2">Đã hết hạn</option>

                </select>
                <button
                    type='button'
                    className="outline-none border rounded-md px-4 bg-secondary2 text-white"
                    onClick={() => {
                        console.log(filter)
                        handleFilterByStatus(filter)
                    }}
                >
                    Lọc
                </button>
            </div>
            
        </div>
        <table className="w-full table-auto">
            <thead>
                <tr className='bg-blue-500'>
                    <th className="border p-4">Mã tin</th>
                    <th className="border p-4">Ảnh đại diện</th>
                    <th className="border p-4">Tiêu đề</th>
                    <th className="border p-4">Giá</th>
                    <th className="border p-4">Ngày bắt đầu</th>
                    <th className="border p-4">Ngày hết hạn</th>
                    <th className="border p-4">Trạng thái hoạt động</th>
                    <th className="border p-4">Trạng thái duyệt</th>
                    <th className="border p-4">Số sao bài đăng được đánh giá</th>
                    <th className="border p-4">Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                {!posts || postOfCurrent.length === 0 ? 
                    <tr >
                        <td className=" italic">Bạn chưa có bài đăng. Hãy đăng bài ở mục Đăng tin cho thuê !</td>
                    </tr>
                    : posts?.map(item => (
                        <tr key={item.id} className="border px-1">
                            <td className="border text-center">{item?.overviews?.code}</td>
                            <td className="border p-1  text-center flex items-center justify-center">
                                <img className="w-[100px] h-[100px] object-cover" src={JSON.parse(item.images.image)[0]} alt='anh bai dang'/>
                            </td>
                            <td className="border text-center">{item?.title}</td>
                            <td className="border text-center">{item?.attributes?.price}</td>
                            <td className="border text-center">{item?.overviews?.created}</td>
                            <td className="border text-center">{item?.overviews?.expire}</td>
                            <td className="border text-center">
                                {checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire) ? 'Đang hoạt động' : 'Đã hết hạn'}
                            </td>
                            <td className="border text-center">{item?.status ==='checked'? 'Đã duyệt': 'Chờ duyệt' }</td>
                            <td className="border text-center">{item?.star}</td>
                            <td className="border text-center">
                                <div className="flex gap-2 justify-evenly items-center">
                                    {checkStatus(item?.overviews?.expire?.split(' ')[3] || item?.overviews?.expire) &&
                                    <Button text="Sửa" bgColor="bg-secondary1" textColor='text-white'
                                        onClick={() => {
                                            dispatch(actions.editData(item))
                                            setIsEdit(true)
                                        }}
                                    />
                                    }
                                    <Button text="Xóa" bgColor="bg-secondary2" textColor='text-white'
                                        onClick={() => {
                                            handleDeletePost(item.id)
                                        }}
                                    />
                                    <Button text="Xem" bgColor="bg-yellow-500" textColor='text-white'
                                        onClick={() => {
                                            setIsView(true)
                                            setPostView(item)
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))
                    
                }
            </tbody>
        </table>
        {isEdit && <UpdatePost setIsEdit={setIsEdit}  />}
        {isView && <ViewPost setIsView={setIsView} post={postView} />}
    </div>
  )
            }

export default ManagePost