import React from 'react'

function InputForm(props) {
  const {
    id,
    placeholder,
    handleChange,
    error,
    value,
    type = 'Text',
    text
  } = props

  return (
    <div>
      <input 
        id={id} 
        placeholder={placeholder} 
        onChange={handleChange}
        value={value}
        className={`input bg-[#394050] text-base-300 mt-3 text-lg h-12 ${error ? 'outline-1 outline-red-600/80' : 'outline-0'}`}/>
      {error && 
        <p className='text-xs text-red-600/80'>{error}</p>
      }
    </div>
  )
}

export default InputForm