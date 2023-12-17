import React,{useId,forwardRef} from 'react';

function Select({
    labelText,
    options,
    className="",
    ...props
},ref) {
  const id = useId();
  return (
    <div className='w-full'>
       {
        labelText && <label
           className='inline-block mb-1 pl-1'
           htmlFor={id}
        >
          {labelText}
        </label>
       }
       {
       (<select id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props}>
            {options?.map((option)=>(<option value={option} key={option}>{option}</option>))}
       </select>)
        
       }
    </div>
  )
}

export default forwardRef(Select)