import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../img/NotFound.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from './store/cartItemsSlice'
import { fetchCart } from '../utils/fetchLocalStorageData'
import { setSubTotal } from './store/subTotalSlice'

const RowContainer = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef();
    const [items, setItems] = useState(fetchCart())
    useEffect(()=>{
        rowContainer.current.scrollLeft = scrollValue;
    },[scrollValue])
    const cartItems = useSelector((state) => state.cartItems.cartItems)
    const subTotal = useSelector((state) => state.subTotal.subTotal)
    const dispatch = useDispatch();
    const addToCart =(items) =>{
        dispatch(setCartItems(items))
    }
    useEffect(() => {
        addToCart(items)
    }, [items])
    return (
        <div 
        ref={rowContainer}
        className={`w-full my-12 flex items-center scroll-smooth gap-3 ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'}`}>
            {data?.length ?
                data.map((item) => (
                    (
                        <div key={item?.id} className="w-275 min-w-[275px] bg-cardOverlay border-gray-100 rounded-lg py-3 px-4 my-[70px] md:w-300 md:min-w-[300px] h-[175px] backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
                            <div className="w-full flex items-center justify-end">
                                <motion.div whileHover={{ scale: 1.2 }}
                                className='w-40  -mt-8 drop-shadow-2xl absolute left-2' 
                                >
                                <img 
                                className='w-full max-h-[200px] h-full object-contain'
                                src={item?.imageURL} alt="fruit image" />
                                </motion.div>
                                <motion.div whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md">
                                    <MdShoppingBasket 
                                    onClick={()=> {setItems([...cartItems, item]); dispatch(setSubTotal(subTotal + Number(item.price)))}}
                                    className='text-white' />
                                </motion.div>
                            </div>
                            <div className="w-full flex flex-col items-end justify-end">
                                <p className='text-textColor font-semibold text-base md:text-lg'>
                                    {item?.title}
                                </p>
                                <p className='mt-1 text-sm text-gray-500'>
                                    {item?.calories}
                                </p>
                                <div className="flex items-center gap-8">
                                    <p className='text-lg text-headingColor font-semibold'>
                                        <span className='text-sm text-red-500'>$</span> {item?.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                ))
            
                :
                (
                    <div className="w-full flex items-center justify-center flex-col">
                        <img src={NotFound} className= "w-340" alt="" />
                        <p className='text-xl text-headingColor font-semibold'>Items Not Available</p>
                    </div>
                )
            }
        </div>
    )
}

export default RowContainer