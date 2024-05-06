import React, { useEffect, useRef, useState } from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import { useSelector } from 'react-redux'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'

const MainContainer = () => {
  const foodItems = useSelector((state) => state.food.foodItems);
  const [scrollValue, setScrollValue] = useState(0);
  const scrollOffset = 1000
  useEffect(()=>{}, [scrollValue])

  const scrollLeft =() =>{
    setScrollValue(scrollValue - scrollOffset)
  }

  const scrollRight =() =>{
    setScrollValue(scrollValue + scrollOffset)
  }

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
              <MdChevronLeft 
              onClick={scrollLeft}
              className='text-lg text-white' />
            </motion.div>
            <motion.div whileTap={{scale : 0.75}} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center">
              <MdChevronRight 
              onClick={scrollRight}
              className='text-lg text-white' />
            </motion.div>

          </div>
        </div>
        <RowContainer 
        scrollValue = {scrollValue}
        flag = {true} data = {foodItems?.filter((item) => item.category === 'Fruits')}/>
      </section>
      <MenuContainer />
      <CartContainer />
    </div>
  )
}

export default MainContainer