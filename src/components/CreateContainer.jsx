import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {MdFastfood} from 'react-icons/md'
import { categories } from '../utils/data'
import Loader from './Loader'

const CreateContainer = () => {
  const [title, setTitle] = useState("")
  const [calories, setCalories] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(null)

  // checks for error and reacts
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState("danger")

  // error Message
  const [msg, setMsg] = useState(null)

  const [isloading, setIsLoading] = useState(true);

  return (
    <div className='w-full min-h-screen py-4 md:py-2 flex items-center justify-center '>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 '>

        {/* Error Handling */}
        {
          fields && (
            <motion.p 
            initial ={{opacity:0}}
            animate = {{opacity: 1}}
            exit={{opacity: 0}}
            className={`w-full p-2 rounded-lg text-lg font-semibold transition-all duration-100 ease-in-out text-center ${alertStatus=="danger" ? 'bg-red-400 text-red-800':'bg-emerald-400 text-emerald-800'}`}>
              {msg}
            </motion.p>
          )
        }

        {/* Title */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className='text-xl text-gray-700'/>
          <input type="text" required  value={title} placeholder='Give me a title...'
          className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor'
          onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className='w-full'>
          <select
            className='outline-none text-base w-full border-b-2 border-gray-200 p-2 cursor-pointer rounded-md'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value= "other" className='bg-white'>
              Select Category
            </option>
            {categories && categories.map((category) => 
              <option 
                key ={category.id} 
                value={category.urlParamName}
                className='text-base outline-none border-0 capitalize bg-white text-headingColor'
              >
                {category.name}
              </option>
            )}
          </select>
        </div>

        {/* Image */}
        <div className="group flex justify-center items-center flex-cols border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg ">
            {isloading && (
              <Loader />
            )}
        </div>

      </div>
    </div>
  )
}

export default CreateContainer