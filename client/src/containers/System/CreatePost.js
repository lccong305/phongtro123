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
          Swal.fire('Th??nh c??ng','C???p nh???t b??i ????ng th??nh c??ng !','success').then(()=> {
            resetPayload()
            dispatch(resetDataEdit())
          })
        }
        else {
          Swal.fire('Th???t b???i','C???p nh???t b??i ????ng kh??ng th??nh c??ng !','error')
        }

      }
      else {
        const response = await apiCreatePost(finalPayload)
        if(response?.data.err === 0) {
          Swal.fire('Th??nh c??ng','Th??m b??i ????ng th??nh c??ng !','success').then(()=> {
            resetPayload()
          })
    
        }
        else {
          Swal.fire('Th???t b???i','Th??m b??i ????ng kh??ng th??nh c??ng !','error')
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
     {isEdit ? 'Ch???nh s???a b??i ????ng' : '????ng tin m???i'}
   </h1>
   <div className="flex">
     <div className="py-4 flex flex-col gap-4 flex-auto ">
       <Address invalidFields={invalidFields} setInvalidFields={setInvalidFields} setPayload={setPayload} />
       <Overview invalidFields={invalidFields} setInvalidFields={setInvalidFields} payload={payload} setPayload={setPayload}/>
       <div className='w-full' >
         <h2 className="font-medium text-2xl">H??nh ???nh</h2>
         <small>C???p nh???t h??nh ???nh r?? g??ng s??? gi??p b???n cho thu?? nhanh h??n</small>
         <div className="w-full">
           <label htmlFor="create-file" className= "flex items-center flex-col justify-center my-4 w-full h-[200px] border-2 border-dashed rounded-md" 
           >
             {isLoading ? <Loading /> : 
               <div className="flex items-center flex-col justify-center">
                 <img src={upload} className="w-[100px] h-[100px] object-cover"/>
                 Th??m ???nh
               </div>
             }
             
           </label>
           <input onChange={handleFiles} hidden id="create-file" type="file" multiple/>
           <small className='text-red-500 italic'>
             {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.massage }
           </small> 
           <div>
             <small className="py-2">???nh ???? ch???n</small>
             <div className="flex gap-4 items-center flex-wrap">
               {imagesPreview?.map(item => (
                 <div key={item} className="border rounded-bl-sm  rounded-br-sm">
                   <img  src={item} alt='preview' className='w-44 h-28 object-cover border-b'/>
                   <span 
                     className='flex justify-center items-center gap-1 py-1 px-2 rounded-bl-sm  rounded-br-sm cursor-pointer'
                     onClick = {() => handleDeleteImage(item)}
                   >
                     <RiDeleteBin6Line/> 
                     <span>X??a</span> 
                   </span>
                 </div>
               ))}
             </div>
           </div>
         
         
         </div>
       </div>
       <Button 
         text={isEdit ? 'C???p nh???t': 'T???o m???i'}
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
          <h3 className="font-semibold text-xl mb-2">{!dataEdit ? 'L??u ?? khi ????ng tin' : 'L??u ?? khi s???a b??i'}</h3>
          <span>+ N???i dung ph???i vi???t b???ng ti???ng Vi???t c?? d???u</span>
          <span>+ Ti??u ????? tin kh??ng d??i qu?? 100 k?? t???</span>
          <span>+ C??c b???n n??n ??i???n ?????y ????? th??ng tin v??o c??c m???c ????? tin ????ng c?? hi???u qu??? h??n.</span>
          <span>+ ????? t??ng ????? tin c???y v?? tin rao ???????c nhi???u ng?????i quan t??m h??n, h??y s???a v??? tr?? tin rao c???a b???n tr??n b???n ????? b???ng c??ch k??o icon t???i ????ng v??? tr?? c???a tin rao.</span>
          <span>+ Tin ????ng c?? h??nh ???nh r?? r??ng s??? ???????c xem v?? g???i g???p nhi???u l???n so v???i tin rao kh??ng c?? ???nh. H??y ????ng ???nh ????? ???????c giao d???ch nhanh ch??ng!</span>
          <span>+ B??i ????ng c??ng chi ti???t th?? s??? sao ???????c ????nh gi?? c??ng cao (sao c??ng cao b??i vi???t s??? ???????c s???p x???p ph??a tr??n c??ng) !</span>

       </div>
     </div>
   </div>
 </div>
 : <span className='text-2xl font-semibold m-10 italic text-red-600'>
  T??i kho???n c???a b???n ???? b??? kh??a quy???n ????ng b??i !
  </span>} 
    </>
  )
}

export default CreatePost