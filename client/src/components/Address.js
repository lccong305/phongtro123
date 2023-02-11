import React, {useEffect, useState, memo} from 'react'
import {Select} from './index'
import { apiGetPublicProvinces, apiGetPublicDistricts, apiGetPublicWards } from '../services'
import { useSelector } from 'react-redux'

const Address = ({ setPayload, invalidFields, setInvalidFields}) => {

    const { dataEdit } = useSelector(state => state.post)

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [ward, setWard] = useState('')
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [addAddress, setAddAddress] = useState(dataEdit?.address?.split(',')[0] || '')
    const [reset, setReset] = useState(false)
    const [readOnly, setReadOnly] = useState(false)

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundProvince = provinces?.length > 0 && provinces?.find(item => item?.province_name?.trim() === addressArr[addressArr?.length - 1]?.trim())
            setProvince(foundProvince ? foundProvince.province_id : '')      
        }
    },[provinces, dataEdit])
    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundDistrict = districts?.length > 0 && districts?.find(item => item?.district_name?.trim() === addressArr[addressArr?.length - 2]?.trim())
            setDistrict(foundDistrict ? foundDistrict.district_id : '')   
        }
    },[districts, dataEdit])
    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundWard =wards?.length > 0 && wards?.find(item => item?.ward_name?.trim() === addressArr[addressArr?.length - 3]?.trim())
            setWard(foundWard ? foundWard.ward_id : '')  
        }
    },[wards, dataEdit])
    // useEffect(() => {
    //     let foundAddress = dataEdit?.address?.split(',')[0].trim()
    //     setAddAddress(foundAddress ? foundAddress : '')
    // },[province, district, ward])

    useEffect(() => {
        const fetchPublicProvince = async() => {
            const response = await apiGetPublicProvinces()
            // console.log(response)
            if(response.status === 200) {
                setProvinces(response?.data?.results)
            }
        }
        fetchPublicProvince()
    },[])
    useEffect(() => {
        setDistrict(null)
        const fetchPublicDistrict = async(province) => {
            const response = await apiGetPublicDistricts(province)
            if(response.status === 200) {
                setDistricts(response?.data?.results)
            }
        }
        province && fetchPublicDistrict(province)
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    },[province])
    useEffect(() => {
        setWard(null)
        const fetchPublicWard = async(district) => {
            const response = await apiGetPublicWards(district)
            if(response.status === 200) {
                setWards(response?.data?.results)
            }
        }
        district && fetchPublicWard(district)
        !district ? setReset(true) : setReset(false)
        !district && setWards([])
    },[district])
    useEffect(() => {
        setAddAddress(dataEdit?.address?.split(',')[0] || '')
        // !ward ? setReset(true) : setReset(false)
        !ward ? setReadOnly(true) : setReadOnly(false)
    },[ward])
    // console.log(addAddress)
    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${addAddress ? `${addAddress},` : ''}${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ''}${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''}`,
            province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
        }))
    },[province, district,ward, addAddress])
  return (
    <div>
        <h2 className="font-medium text-2xl">Địa chỉ cho thuê</h2>
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4" >
                <Select
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    type='province'
                    value={province}
                    setValue={setProvince}
                    options={provinces}
                    label='Chọn Tỉnh/Thành Phố'/>
                <Select
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    reset={reset}
                    type='district'
                    value={district}
                    setValue={setDistrict}
                    options = {districts} 
                    label='Quận/Huyện'/>
                <Select
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    reset={reset}
                    type='ward'
                    value={ward}
                    setValue={setWard}
                    options={wards}
                    label='Phường/Xã'/>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                <label className='font-semibold' htmlFor="additional-address">Số nhà, tên đường, ấp, thôn ...</label>
                <input readOnly={readOnly} invalidFields={invalidFields} setInvalidFields={setInvalidFields}  onChange={(e) => setAddAddress(e.target.value)} value={addAddress} type='text' id="additional-address" className='outline-none border border-gray-400 w-full rounded-md py-1 px-2 focus:border-blue-500' />
                <label className='font-semibold' htmlFor="exactly-address">Địa chỉ chính xác</label>
                <input value={`${addAddress ? `${addAddress},` : ''} ${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''}`} type='text' id="exactly-address" readOnly className='outline-none border border-gray-200 w-full rounded-md py-1 px-2 mt-2' />
            </div>
        </div>
    </div>
  )
}

export default memo(Address)