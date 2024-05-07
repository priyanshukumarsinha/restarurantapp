import React, { useState } from 'react'
import Logo from '../img/logo.png'

import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion';
import { Link, Navigate, json } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase.config';

import { useSelector, useDispatch } from 'react-redux';
import { login as userLogin } from './store/authSlice'
import { logout as userLogout } from './store/authSlice'
import { setCartShow } from './store/cartSlice';

import { navItems } from '../utils/data';
import { setSubTotal } from './store/subTotalSlice';
import { setCartItems } from './store/cartItemsSlice';
import { setFoodItems } from './store/foodSlice';


const Header = () => {

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const userData = useSelector((state) => state.auth.user)
  const cartItems = useSelector((state) => state.cartItems.cartItems)

  const dispatch = useDispatch()

  const [isMenu, setIsMenu] = useState(false);

  const adminEmail = "1ds22cb039@dsce.edu.in"

  const login = async () => {
    setIsMenu(!isMenu);
    if (!userData) {
      const response = await signInWithPopup(auth, provider);
      const userData = response.user.providerData[0]
      dispatch(userLogin(userData));
      localStorage.setItem('user', JSON.stringify(userData))
      setIsMenu(false)
    }
  }

  const logout = () => {
    setIsMenu(false)
    dispatch(userLogout())
    // dispatch(setSubTotal(0));
    // dispatch(setCartItems(""));
    localStorage.clear();
  }


  return (
    <header className='fixed w-full p-3 px-4 md:p-6 md:px-16 bg-inherit z-50'>
      {/* Desktop & Tablet */}
      <div className='hidden md:flex p-4'>
        <Link to={'/'} className='flex items-center gap-8'>
          <img src={Logo} className='w-8 object-cover' alt="logo" />
          <p className='text-headingColor text-xl font-bold'>City</p>
        </Link>

        <div className=' w-full flex items-center justify-center gap-8'>
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='flex items-center gap-10 ml-auto'
          >

            {
              navItems && navItems.map((item) => (
                <Link key={item.id} to={item.path}>
                  <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' key={item.id}>{item.name}</li>
                </Link>
              ))
            }


          </motion.ul>
          <div className="flex items-center relative">
            <MdShoppingBasket
              onClick={() => dispatch(setCartShow(true))}
              className='text-textColor text-2xl cursor-pointer' />
            {cartItems?.length>0 && (
              <div className='w-5 h-5 rounded-full bg-red-500  ml-8 flex items-center justify-center absolute -top-2 -right-2'>
                <p className='text-xs text-white  font-semibold'>
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img whileTap={{ scale: 0.6 }} src={userData ? userData.photoURL : Avatar} alt="userprofile" className='w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              onClick={login}
            />

            {/* // show this only if img is clicked : done using state */}

            {
              isMenu && (

                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className='w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col'>
                  {
                    userData && userData.email === adminEmail && (
                      <Link to={'/createItem'}>
                        <p
                          onClick={() => setIsMenu(false)}
                          className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor'
                        >New Item
                          <MdAdd />
                        </p>
                      </Link>
                    )}
                  {userData &&
                    <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor'
                      onClick={logout}
                    >Logout
                      <MdLogout />
                    </p>
                  }
                </motion.div>
              )
            }


          </div>


        </div>


      </div>
      {/* Mobile */}
      <div className='flex md:hidden p-4 justify-between items-center'>
        <div className="flex items-center relative">
          <MdShoppingBasket
            onClick={() => dispatch(setCartShow(true))}
            className='text-textColor text-2xl cursor-pointer' />
          
          {cartItems?.length >0 && (
              <div className='w-5 h-5 rounded-full bg-red-500  ml-8 flex items-center justify-center absolute -top-2 -right-2'>
                <p className='text-xs text-white  font-semibold'>
                  {cartItems.length}
                </p>
              </div>
            )}
        </div>

        <Link to={'/'} className='flex items-center gap-8'>
          <img src={Logo} className='w-8 object-cover' alt="logo" />
          <p className='text-headingColor text-xl font-bold'>City</p>
        </Link>


        <div className="relative">
          <motion.img whileTap={{ scale: 0.6 }} src={userData ? userData.photoURL : Avatar} alt="userprofile" className='w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
            onClick={login}
          />

          {
            isMenu && userData && (

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className='w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col'>
                {
                  userData && userData.email === adminEmail && (
                    <Link to={'/createItem'}>
                      <p
                        onClick={() => setIsMenu(false)}
                        className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor'
                      >New Item
                        <MdAdd />
                      </p>
                    </Link>
                  )}

                <ul className='flex flex-col'>

                  {
                    navItems && navItems.map((item) => (
                      <Link key={item.id} to={item.path}>
                        <li className='text-base text-textColor hover:bg-slate-100 transition-all duration-100 ease-in-out cursor-pointer px-4 py-2'
                          key={item.id}
                          onClick={() => setIsMenu(false)}
                        >{item.name}</li>
                      </Link>
                    ))
                  }

                </ul>

                {userData &&
                  <p className='m-2 p-2 rounded-mg shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-base text-textColor'
                    onClick={logout}
                  >Logout
                    <MdLogout />
                  </p>
                }
              </motion.div>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header