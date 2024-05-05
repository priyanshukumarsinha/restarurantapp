import { Header, MainContainer, CreateContainer } from "./components"
import {Routes, Route} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setFoodItems} from './components/store/foodSlice'


function App() {

  const dispatch = useDispatch();
  
  const fetchData = async() =>{
    await getAllFoodItems().then((data) => {
      dispatch(setFoodItems(data))
    })
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
      <Header />
        <main className="mt-16 md:mt-24 px-8 md:px-16 py-4 w-full">
            <Routes>
              <Route path = "/*" element={<MainContainer />}/>
              <Route path = "/createItem" element={<CreateContainer />} />
            </Routes>
        </main>
    </div>
    </AnimatePresence>
  )
}

export default App
