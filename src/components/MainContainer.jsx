import React from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'

const MainContainer = () => {
  return (
    <div className='flex w-full h-auto flex-col items-center justify-center'>
      <HomeContainer />
      <section className='w-full p-4 my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='font-semibold capitalize text-headingColor text-2xl relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all duration-100 ease-in-out'>
            Our Fresh & Healthy Fruits
          </p>

          <div className='hidden md:flex items-center gap-3'>
            <motion.div whileTap={{scale : 0.75}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center">
              <MdChevronLeft className='text-lg text-white' />
            </motion.div>
            <motion.div whileTap={{scale : 0.75}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center">
              <MdChevronRight className='text-lg text-white' />
            </motion.div>

          </div>
        </div>
        <RowContainer flag = {true}/>
      </section>
    </div>
  )
}

export default MainContainer