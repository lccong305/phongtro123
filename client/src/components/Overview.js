import React from 'react'
import {Select, InputReadOnly} from './index'
import { useSelector } from 'react-redux'

const target = [
  {
    code: 'Tất cả',
    value: 'Tất cả'
  },
  {
    code: 'Nam',
    value: 'Nam'
  },
  {
    code: 'Nữ',
    value: 'Nữ'
  }
]

const Overview = ({setPayload, payload, invalidFields, setInvalidFields}) => {

  const {categories} = useSelector(state => state.app)
  const {userData} = useSelector(state => state.user)


  return (
    <div>
      <h2 className="font-medium text-2xl">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-2">
        <div className="w-1/2">
          <Select 
            value={payload.categoryCode} setValue={setPayload} name='categoryCode' 
            label='Loại chuyên mục' 
            options={categories} 
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <InputReadOnly label='Tiêu đề' id='overview-title' 
          name='title' value={payload.title} setValue={setPayload} 
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <div className="flex flex-col gap-1">
          <label className = 'font-semibold' htmlFor='overview-desc'>Nội dung mô tả</label>
          <textarea cold="30" rows="10" id="overview-desc" 
            className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' 
            type='text'
            value={payload.description}
            setValue={setPayload}
            onChange={(e) => setPayload(prev => ({...prev, 'description': e.target.value}))}
            onFocus = {() => setInvalidFields([])}
          />
          <small className='text-red-500 italic'>
            {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.massage }
          </small>   
        </div>
        <InputReadOnly label='Thông tin liên hệ' id='overview-info' invalidFields={invalidFields} setInvalidFields={setInvalidFields} value={userData.name} readOnly half/>
        <InputReadOnly label='Điện thoại' id='overview-phonenumber' invalidFields={invalidFields} setInvalidFields={setInvalidFields} value={userData.phone} readOnly half/>
      </div>

      <div className="w-full flex flex-col gap-2 mt-2">
        <div className="w-1/2">
          <InputReadOnly small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000' label='Giá cho thuê' id='overview-price' unit='đồng' 
            value={payload.priceNumber} setValue={setPayload} 
            name='priceNumber'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputReadOnly small='Vui lòng nhập diện tích là con số nguyên (làm tròn)' label='Diện tích' id='overview-are' unit='m2' 
            value={payload.areaNumber} setValue={setPayload} 
            name='areaNumber'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select 
            label='Đối tượng cho thuê' 
            options={target} 
            value={payload.target} setValue={setPayload} name='target'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
      </div>
    
    </div>
  )
}

export default Overview