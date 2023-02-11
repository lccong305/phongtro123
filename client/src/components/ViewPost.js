import React from 'react'
import {CreatePost } from '../containers/System'
import {Button, Map, SliderCustom} from '../components'

const ViewPost = ({setIsView, post}) => {
    console.log(post)
    console.log(JSON.parse(post.images.image))
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay-30 flex justify-center"
        onClick = {(e) => {
            e.stopPropagation();
            setIsView(false);
        }}
    >
        <div className="bg-white max-w-[1500px] w-full overflow-y-auto"
            onClick = {(e) => {
                e.stopPropagation();
            }}
        >
            
             <div className="px-9">
                <h1 className='font-medium text-3xl py-4 border-b'>
                    Xem bài đăng
                </h1>
                <div className="flex">
                    <div className="w-[65%] py-4 flex flex-col gap-2  ">
                        <label className='font-semibold text-2xl' htmlFor="additional-address">Địa chỉ</label>
                        <input readOnly value={post.address} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                        <span className='font-semibold text-2xl' htmlFor="additional-address">Thông tin mô tả</span>
                        <label className='font-semibold' htmlFor="additional-address">Loại chuyên mục</label>
                        <input readOnly value={post.overviews.type} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                        <label className='font-semibold' htmlFor="additional-address">Tiêu đề</label>
                        <input readOnly value={post.title} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                        <label className='font-semibold' htmlFor="additional-address">Nội dung mô tả</label>
                        <textarea cold="30" rows="10" readOnly value={JSON.parse(post.description)} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                        <div className='w-1/2'>
                            <label className='font-semibold' htmlFor="additional-address">Thông tin liên hệ</label>
                            <input readOnly value={post.users.name} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                            <label className='font-semibold' htmlFor="additional-address">Điện thoại</label>
                            <input readOnly value={post.users.phone} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                            <label className='font-semibold' htmlFor="additional-address">Giá cho thuê</label>
                            <input readOnly value={post.attributes.price} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                            <label className='font-semibold' htmlFor="additional-address">Diện tích</label>
                            <input readOnly value={post.attributes.acreage} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                            <label className='font-semibold' htmlFor="additional-address">Đối tượng cho thuê</label>
                            <input readOnly value={post.overviews.target} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                        </div>
                        <div className='w-full' >
                            <h2 className="font-medium text-2xl">Hình ảnh</h2>
                            <div className="w-full">
                            {/* <div>
                                <div className="flex gap-4 items-center flex-wrap">
                                {JSON.parse(post.images.image)?.map(item => (
                                    <div key={item} className="border rounded-bl-sm  rounded-br-sm">
                                    <img  src={item} alt='preview' className='w-52 h-32 object-cover border-b'/>
                                    </div>
                                ))}

                                </div>
                            </div> */}

                        
                        </div>
                        <SliderCustom images={post && JSON.parse(post.images.image)}/>
                        </div>
                    <Button text='Đóng' bgColor='bg-secondary1' textColor='text-white mt-10' 
                        onClick={()=> {
                            setIsView(false)
                        }}
                    />
                    
                    </div>
                    <div className="w-[35%] flex-none py-4 ml-4">
                    <Map address={post.address} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewPost