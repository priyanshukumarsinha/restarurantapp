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


const Header = () => {

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const userData = useSelector((state) => state.auth.user)
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
    dispatch(userLogout())
    localStorage.clear();
  }

  const newItem = () => (
    Navigate('/createItem')
  )


  return (
    <header className=' w-full p-6 px-16'>
      {/* Desktop & Tablet */}
      <div className='hidden md:flex p-4'>
        <Link to={'/'} className='flex items-center gap-8'>
          <img src={Logo} className='w-8 object-cover' alt="logo" />
          <p className='text-headingColor text-xl font-bold'>City</p>
        </Link>

        <div className=' w-full flex items-center justify-center gap-8'>
          <motion.ul 
          initial = {{opacity : 0, x: 200}}
          animate = {{opacity : 1, x: 0}}
          exit = {{opacity : 0, x: 200}}
          className='flex items-center gap-10 ml-auto'>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
          </motion.ul>
          <div className="flex items-center relative">
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
            <div className='w-5 h-5 rounded-full bg-red-500  ml-8 flex items-center justify-center absolute -top-2 -right-2'>
              <p className='text-xs text-white  font-semibold'>
                2
              </p>
            </div>
          </div>

          <div className="relative">
            <motion.img whileTap={{ scale: 0.6 }} src={userData ? userData.photoURL : Avatar} alt="userprofile" className='w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              onClick={login}
            />

            {/* // show this only if img is clicked : done using state */}

            {
              isMenu && (

                <motion.div 
                initial = {{opacity: 0, scale : 0.6}}
                animate = {{opacity: 1, scale : 1}}
                exit = {{opacity: 0, scale : 0.6}}
                className='w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col'>
                  {
                    userData && userData.email === adminEmail && (
                      <Link to={'/createItem'}>
                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor'
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
      <div className='flex md:hidden bg-blue-600 p-4'>

      </div>
    </header>
  )
}

export default Header