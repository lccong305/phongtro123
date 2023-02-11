import React, {useState, useEffect} from 'react'
import {Address, Overview, Loading, Button, ContactBot, Map} from '../../components'
import upload from '../../assets/upload_image.jpg'
import { apiUploadImages } from '../../services/post'
import { CiLogin } from 'react-icons/ci'
import icons from '../../ultils/icons'
import {getCodes, getCodesArea} from '../../ultils/Common/getCodes'
import { useSelector } from 'react-redux'
import {apiCreatePost, apiUpdatePost} from '../../services'
import validate from '../../ultils/Common/validateFields'
import {useDispatch} from 'react-redux'
import Swal from 'sweetalert2'
import { resetDataEdit } from '../../store/actions'

const { RiDeleteBin6Line } = icons

const CreatePost = ({isEdit}) => {

  const {prices, areas, categories, provinces} = useSelector(state => state.app)
  const {userData} = useSelector(state => state.user)
  const dispatch = useDispatch()
  


  const {dataEdit} = useSelector(state => state.post)

  const [payload, setPayload] = useState((callback) => { 
    const initData = {
      categoryCode : dataEdit?.categoryCode || '',
      title: dataEdit?.title || '',
      priceNumber: dataEdit?.priceNumber * 1000000 || '',
      areaNumber: dataEdit?.areaNumber ||'',
      images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : '',
      address: dataEdit?.address || '',
      priceCode: dataEdit?.priceCode || '',
      areaCode: dataEdit?.areaCode || '',
      description: dataEdit?.description ? JSON.parse(dataEdit?.description) : '',
      target: dataEdit?.overviews?.target || ''
    }

    return initData
   })
  // console.log(payload)
  const [imagesPreview, setImagesPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])

   useEffect(() => {
    if (dataEdit) {
        let images = JSON.parse(dataEdit?.images?.image)
        images && setImagesPreview(images)
    }
   },[dataEdit])

  const handleFiles = async(e) => {
    e.stopPropagation()
    setIsLoading(true)
    let images = []
    const files = e.target.files
    const formData = new FormData()
    for (let i of files) {
      formData.append('file', i)
      formData.append('upload_preset', 'de991j7a')

      const response = await apiUploadImages(formData)
      if(response.status === 200) images = [...images, response.data.secure_url]
    }
    setIsLoading(false)
    setImagesPreview(prev => [...prev, ...images])
    setPayload(prev => ({...prev, images: [...payload.images, ...images]}))
  }

  const handleDeleteImage = (image) => {
    setImagesPreview(prev => prev?.filter(item => item !== image))
    // setPayload(prev => prev?.images?.filter(item => item !== image))
    setPayload(prev => ({...prev, images: prev?.images?.filter(item => item !== image)}))
  }

  const handleSubmit = async() => {
    let priceCodeArr = getCodes(+payload.priceNumber / Math.pow(10, 6), prices, 1, 15)
    let priceCode = priceCodeArr[0]?.code
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 20, 90)
    let areaCode = areaCodeArr[0]?.code

    // console.log(priceCode, areaCode );
    let finalPayload = {
      ...payload,
      priceCode ,
      areaCode,
      userId: userData.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6) === 0 ? '' : +payload.priceNumber / Math.pow(10, 6) ,
      label: `${categories?.find(item => item.code === payload.categoryCode)?.value} ${payload?.address?.split(',')[2]}`,
      area: `${categories?.find(item => item.code === payload.categoryCode)?.value}${payload?.address?.split(',')[3]}`,
      category: `${categories?.find(item => item.code === payload.categoryCode)?.value}`
    }
    console.log(finalPayload)


    const result = validate(finalPayload, setInvalidFields)
    // console.log(invalidFields)
    if (result === 0) {
      if (isEdit && dataEdit) {
        finalPayload.postId = dataEdit?.id
        finalPayload.attributeId = dataEdit?.attributeId
        finalPayload.overviewId = dataEdit?.overviewId
        finalPayload.imageId = dataEdit?.imageId
        // console.log(finalPayload)
        const response = await apiUpdatePost(finalPayload)
        // console.log(response);
        if(response?.data.err === 0) {
          Swal.fire('Thành công','Cập nhật bài đăng thành công !','success').then(()=> {
            resetPayload()
            dispatch(resetDataEdit())
          })
        }
        else {
          Swal.fire('Thất bại','Cập nhật bài đăng không thành công !','error')
        }

      }
      else {
        const response = await apiCreatePost(finalPayload)
        if(response?.data.err === 0) {
          Swal.fire('Thành công','Thêm bài đăng thành công !','success').then(()=> {
            resetPayload()
          })
    
        }
        else {
          Swal.fire('Thất bại','Thêm bài đăng không thành công !','error')
        }

      }
    }

  }

  const resetPayload = () => {
    setPayload({
      categoryCode : '',
      title: '',
      priceNumber: '',
      areaNumber: '',
      images: '',
      address: '',
      priceCode: '',
      areaCode: '',
      description: '',
      target: ''
    })
  }

  return (
    <>
   {userData?.positionCode === 'P1'
   ? <div className="px-9">
   <h1 className='font-medium text-3xl py-4 border-b'>
     {isEdit ? 'Chỉnh sửa bài đăng' : 'Đăng tin mới'}
   </h1>
   <div className="flex">
     <div className="py-4 flex flex-col gap-4 flex-auto ">
       <Address invalidFields={invalidFields} setInvalidFields={setInvalidFields} setPayload={setPayload} />
       <Overview invalidFields={invalidFields} setInvalidFields={setInvalidFields} payload={payload} setPayload={setPayload}/>
       <div className='w-full' >
         <h2 className="font-medium text-2xl">Hình ảnh</h2>
         <small>Cập nhật hình ảnh rõ gàng sẽ giúp bạn cho thuê nhanh hơn</small>
         <div className="w-full">
           <label htmlFor="create-file" className= "flex items-center flex-col justify-center my-4 w-full h-[200px] border-2 border-dashed rounded-md" 
           >
             {isLoading ? <Loading /> : 
               <div className="flex items-center flex-col justify-center">
                 <img src={upload} className="w-[100px] h-[100px] object-cover"/>
                 Thêm ảnh
               </div>
             }
             
           </label>
           <input onChange={handleFiles} hidden id="create-file" type="file" multiple/>
           <small className='text-red-500 italic'>
             {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.massage }
           </small> 
           <div>
             <small className="py-2">Ảnh đã chọn</small>
             <div className="flex gap-4 items-center flex-wrap">
               {imagesPreview?.map(item => (
                 <div key={item} className="border rounded-bl-sm  rounded-br-sm">
                   <img  src={item} alt='preview' className='w-44 h-28 object-cover border-b'/>
                   <span 
                     className='flex justify-center items-center gap-1 py-1 px-2 rounded-bl-sm  rounded-br-sm cursor-pointer'
                     onClick = {() => handleDeleteImage(item)}
                   >
                     <RiDeleteBin6Line/> 
                     <span>Xóa</span> 
                   </span>
                 </div>
               ))}
             </div>
           </div>
         
         
         </div>
       </div>
       <Button 
         text={isEdit ? 'Cập nhật': 'Tạo mới'}
         textColor='text-white'
         bgColor='bg-secondary1' 
         onClick = {handleSubmit}
       />
       
       
       <div className='w-full flex justify-center'>
         <ContactBot />
       </div>
     </div>
     <div className="w-[35%] flex-none py-4 ml-4">
       <Map address={payload.address} />

       <div className='flex flex-col bg-[#fff3cd] p-4 my-5 text-[#856404] text-justify'>
          <h3 className="font-semibold text-xl mb-2">{!dataEdit ? 'Lưu ý khi đăng tin' : 'Lưu ý khi sửa bài'}</h3>
          <span>+ Nội dung phải viết bằng tiếng Việt có dấu</span>
          <span>+ Tiêu đề tin không dài quá 100 kí tự</span>
          <span>+ Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.</span>
          <span>+ Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.</span>
          <span>+ Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!</span>
          <span>+ Bài đăng càng chi tiết thì số sao được đánh giá càng cao (sao càng cao bài viết sẽ được sắp xếp phía trên cùng) !</span>

       </div>
     </div>
   </div>
 </div>
 : <span className='text-2xl font-semibold m-10 italic text-red-600'>
  Tài khoản của bạn đã bị khóa quyền đăng bài !
  </span>} 
    </>
  )
}

export default CreatePost