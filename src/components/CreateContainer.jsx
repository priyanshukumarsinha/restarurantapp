import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md'
import { categories } from '../utils/data'
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase.config'
import { saveItem } from '../utils/firebaseFunctions'
import { useDispatch } from 'react-redux'

const CreateContainer = () => {
  const [title, setTitle] = useState("")
  const [calories, setCalories] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)

  // checks for error and reacts
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState("danger")

  // error Message
  const [msg, setMsg] = useState(null)

  const [isloading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(uploadProgress)
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg("Error While Uploading : Please Try Again ⚠️");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl) => {
          setImageAsset(downloadUrl)
          setIsLoading(false);
          setFields(true);
          setMsg("Image Upload successfully 😊");
          setAlertStatus("success");

          setTimeout(() => {
            setFields(false);
          }, 4000);

        })
    })

  }
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef)
      .then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setAlertStatus("success");
        setFields(true);
        setMsg("Image Deleted successfully 😊")

        setTimeout(() => {
          setFields(false);
        }, 4000);

      })
  }
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if(!title || !category || !calories || !imageAsset || !price){
        setFields(true);
        setMsg("Required Fields Can't be empty : Please Try Again ⚠️");
        setAlertStatus("danger");
        setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000)
      }
      else{
        const data = {
          id : (Date.now()),
          title,
          imageURL : imageAsset,
          category,
          calories,
          quantity : 1,
          price,
        }
        saveItem(data);
        setImageAsset(null);
        setIsLoading(false);
        setAlertStatus("success");
        setFields(true);
        setMsg("Data Uploaded successfully 😊")
        clearData();
        
        setTimeout(() => {
          setFields(false);
        }, 4000);

        fetchData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error While Uploading : Please Try Again ⚠️");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000)
    }
  }

  const clearData = () => {
    setTitle("");
    setCalories("");
    setCategory("Select Category");
    setImageAsset(null);
    setPrice("")
  }

  const fetchData = async() =>{
    await getAllFoodItems().then((data) => {
      dispatch(setFoodItems(data))
    })
  }

  return (
    <div className='w-full min-h-screen py-4 md:py-2 flex items-center justify-center '>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 '>

        {/* Error Handling */}
        {
          fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-lg font-semibold transition-all duration-100 ease-in-out text-center ${alertStatus == "danger" ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
              {msg}
            </motion.p>
          )
        }

        {/* Title */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className='text-xl text-gray-700' />
          <input type="text" required value={title} placeholder='Give me a title...'
            className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className='w-full'>
          <select
            className='outline-none text-base w-full border-b-2 border-gray-200 p-2 cursor-pointer rounded-md'
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other" className='bg-white'>
              Select Category
            </option>
            {categories && categories.map((category) =>
              <option
                key={category.id}
                onClick={() => setCategory(category.urlParamName)}
                // value={category.name}
                className='text-base outline-none border-0 capitalize bg-white text-headingColor'
              >
                {category.name}
              </option>
            )}
          </select>
        </div>

        {/* Image */}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg ">
          {isloading ? 
            <>
              <Loader /> 
              
            </>
            :
            <>
              {!imageAsset ?
                <>
                  <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                    <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                      <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                      <p className='text-gray-500 hover:text-gray-700'>
                        Click Here to Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name='uploadimage'
                      accept='image/*'
                      className='w-0 h-0'
                      onChange={uploadImage}
                    />
                  </label>
                </>
                :
                <>
                  <div className="relative h-full">
                    <img src={imageAsset} alt="uploaded image" className='w-full h-full object-cover' />
                    <button type='button' className='absolute bottom-3 right-10 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-100 ease-in-out'
                      onClick={deleteImage}
                    >
                      <MdDelete className='text-white' />
                    </button>
                  </div>
                </>
              }
            </>
          }
        </div>
        

        <div className="w-full flex flex-col md:flex-row items-center gap-3">

          {/* Calories */}
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdFoodBank className='tex-gray-700 text-2xl' />
            <input
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              type="text" required placeholder='Calories' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
          </div>

          {/* Price */}
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdAttachMoney className='tex-gray-700 text-2xl' />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text" required placeholder='Price' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type='button'
            className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
            onClick={saveDetails}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateContainer