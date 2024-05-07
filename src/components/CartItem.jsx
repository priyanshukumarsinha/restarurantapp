import React, { useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from './store/cartItemsSlice'
import { setSubTotal } from './store/subTotalSlice'

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const cartItems = useSelector((state) => state.cartItems.cartItems)
    const subTotal = useSelector((state) => state.subTotal.subTotal)
    const dispatch = useDispatch()
    let newItems = []

    const updateQuantity = (action, id) => {
        if (action == 'add') {
            setQuantity(quantity + 1)
            cartItems.map((item) => {
                if (item.id === id) {
                    newItems.push({ ...item, quantity: item.quantity + 1 })
                    dispatch(setSubTotal(subTotal + Number(item.price)))

                }
                else {
                    newItems.push(item)
                }
            })
            dispatch(setCartItems(newItems))
            newItems = []
        }
        else if (action == 'remove') {
            setQuantity(quantity - 1)
            cartItems.map((item) => {
                if (item.id === id) {
                    if (quantity > 1) {
                        newItems.push({ ...item, quantity: quantity })
                        dispatch(setSubTotal(subTotal - Number(item.price)))
                    }
                }
                else {
                    newItems.push(item)
                }
            })
            dispatch(setCartItems(newItems))
            newItems = []

        }

    }

    return (
        <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
            <img src={item.imageURL} className='w-20 h-20 ' alt="" />
            {/* name section */}
            <div className='flex flex-col gap-2'>
                <p className='text-base text-gray-50'>
                    {item.title}
                </p>
                <p className='text-sm block text-gray-300 font-semibold'>
                    $ {(item.price * quantity).toFixed(2)}
                </p>
            </div>

            {/* Button Section */}
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                <motion.div
                    whileTap={{ scale: 0.75 }}
                >
                    <BiMinus
                        onClick={() => updateQuantity("remove", item?.id)}
                        className='text-gray-50' />
                </motion.div>
                <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>
                    {quantity}
                </p>
                <motion.div
                    whileTap={{ scale: 0.75 }}
                >
                    <BiPlus
                        onClick={() => updateQuantity("add", item?.id)}
                        className='text-gray-50' />
                </motion.div>
            </div>
        </div>
    )
}

export default CartItem