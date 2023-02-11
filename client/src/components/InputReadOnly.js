import React from 'react'

const InputReadOnly = ({label, id, readOnly, unit, half, value, setValue, name, small, invalidFields, setInvalidFields, password}) => {
  // console.log(name)
  
  return (
    <div className='flex flex-col'>
          <label className = 'font-semibold' htmlFor={id}>{label}</label>
          <div className = 'flex items-center'>
            <input  
                value={value || ''} 
                id={id} 
                className = {`${readOnly ? 'bg-gray-200' : ''} ${half ? 'w-1/2' : 'flex-auto'}   outline-none border border-gray-400 rounded-sm py-1 px-2 focus:border-blue-500`} 
                type = {password || 'text' }
                readOnly={readOnly ? true : false}
                onChange={(e) => setValue(prev => ({...prev, [name]: e.target.value}))}
                onFocus = {() => setInvalidFields([])}
            /> 
            {unit && 
                <span className='w-16 py-1 px-2 flex-none bg-gray-300 flex justify-center  border-t border-r border-b border-gray-400 ' >
                    {unit}
                </span>
            }
           </div>
           {small && 
                <small className='italic'>
                    {small}
                </small>
            }
          <small className='text-red-500 italic'>
            {invalidFields?.some(item => item.name === name) && invalidFields?.find(item => item.name === name)?.massage }
          </small> 
    </div>
  )
}

export default InputReadOnly