import { Header, MainContainer, CreateContainer } from "./components"
import {Routes, Route} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';


function App() {

  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
      <Header />
        <main className="mt-24 p-8 w-full">
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
