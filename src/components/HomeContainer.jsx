import React from 'react'
import Delivery from '../img/delivery.png'
import HeroBg from '../img/heroBg.png'

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full ' id='home'>
      <div className='py-2 flex-1 flex flex-col items-start gap-6 justify-start md:items-start' >
        <div className='flex items-center gap-2 justify-center bg-orange-100 rounded-full px-4 py-1'>
          <p className='text-base text-orange-500 font-semibold'>
            Bike Delivery
          </p>
          <div className='w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl'>
            <img src={Delivery} alt="delivery" className='w-full h-full object-contain ' />
          </div>
        </div>
        <p className='text-[3rem] lg:text-[4rem] md:text-[3.5rem] font-bold tracking-wide text-headingColor '>
          The Fastest Delivery in <span className='text-orange-600 text-[3.5rem] lg:text-[5rem] md:text-[4.5rem] '> Your City</span>
        </p>

        <p className='text-base text-textColor text-center md:w-[80%] md:text-left'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In inventore impedit eveniet ipsum illo amet neque, omnis et, ad nemo, accusantium necessitatibus nesciunt magni consequuntur. Officiis odit dicta quas atque?
        </p>

        <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out md:w-auto'>Order Now</button>

      </div>
      <div className='py-2 flex-1' >
        <img src={HeroBg} className = "lg:h-650 h-420 w-full lg:w-auto ml-auto" alt="" />
        <div className="w-full h-full absolute items-center justify center">

        </div>
      </div>
    </section>
  )
}

export default HomeContainer