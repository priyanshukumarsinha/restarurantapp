import React from 'react'
import Logo from '../img/logo.png'
import { MdShoppingBasket } from "react-icons/md";
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase.config';

import { useSelector, useDispatch } from 'react-redux';
import {login as userLogin} from './store/authSlice'


const Header = () => {

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const userData = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const login = async() => {
    const response = await signInWithPopup(auth, provider);
    dispatch(userLogin(response.user.providerData[0]));
  }

  return (
    <header className=' w-full p-6 px-16'>
      {/* Desktop & Tablet */}
      <div className='hidden md:flex p-4'>
        <Link to={'/'} className='flex items-center gap-8'>
          <img src={Logo} className='w-8 object-cover' alt="logo" />
          <p className='text-headingColor text-xl font-bold'>City</p>
        </Link>

        <div className=' w-full flex items-center justify-center gap-8'>
          <ul className='flex items-center gap-10 ml-auto'>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
          </ul>
          <div className="flex items-center relative">
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
            <div className='w-5 h-5 rounded-full bg-red-500  ml-8 flex items-center justify-center absolute -top-2 -right-2'>
              <p className='text-xs text-white  font-semibold'>
                2
              </p>
            </div>
          </div>
        
          <div className="relative">
          <motion.img  whileTap={{scale:0.6}} src={userData ? userData.payload.photoURL : Avatar} alt="userprofile" className='w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
          onClick={login}
          />
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