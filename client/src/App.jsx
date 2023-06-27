import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom';
import Signin from './Pages/SignIn/Signin';
import Signup from './Pages/Signup/Signup';
import './App.css'


function App() {

  return (
    <>
        <Routes>
          <Route path="/sleep-track" element={<Home/>}></Route>
          <Route path="/" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </>
  )
}

export default App
