import React, { useState } from 'react'
import { IoFastFood } from 'react-icons/io5'
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useSelector } from 'react-redux';

const MenuContainer = () => {
    const [filter, setFilter] = useState("chicken");
    const foodItems = useSelector((state) => state.food.foodItems);
    return (
        <section className='w-full p-4 my-6'>
            <div className="w-full flex flex-col items-center justify-center">
                <p className='font-semibold capitalize text-headingColor text-2xl relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all duration-100 ease-in-out mr-auto'>
                    Our Hot Dishes
                </p>

                <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none '>
                    {categories &&
                        categories.map((category) => (
                            <motion.div
                            whileTap={{scale: 0.75}} 
                            onClick={() => setFilter(category.urlParamName)}
                            key= {category.id} className= {`group ${filter === category.urlParamName ? 'bg-cartNumBg' : 'bg-card'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg shadow-lg drop-shadow-xl backdrop-blur-lg flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}>
                                <div className= {`w-10 h-10 rounded-full  group-hover:bg-white flex items-center justify-center ${filter === category.urlParamName ? 'bg-white' : 'bg-cartNumBg'}`}>
                                    <IoFastFood className= {` shadow-lg  group-hover:text-textColor text-lg ${filter === category.urlParamName ? 'text-textColor' : 'text-white'} `} />
                                </div>
                                <p className= {`text-sm group-hover:text-white ${filter === category.urlParamName ? 'text-white' : 'text-textColor'} `}>
                                    {category.name}
                                </p>
                            </motion.div>
                        ))
                    }
                </div>
                <div className='w-full '>
                    <RowContainer flag= {false} data={foodItems?.filter((data) =>data.category === filter.charAt(0).toUpperCase() + filter.slice(1))}/>
                </div>
            </div>
        </section>
    )
}

export default MenuContainer