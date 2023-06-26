import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Pages/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './Pages/SignIn/Signin';
import Signup from './Pages/Signup/Signup';


import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <BrowserRouter> */}
      
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      {/* </BrowserRouter> */}

    
      {/* <Home/> */}
   

    </>
  )
}

export default App
