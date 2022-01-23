import {    Routes,  Route} from "react-router-dom";
import SignIn from "./components/Auth/SignIn"
import SignUp from "./components/Auth/SignUp"
import Home from "./components/Home/Home"
import AppContext from './components/Context/AppContext';
import React, { useEffect, useState } from "react";
import Blocked from "./components/Auth/Blocked";
import { useLoading } from 'react-hook-loading'

export default function App(){
  const [blockedTime, setBlockedTime] = useState(0);
  const [loading, setLoading] = useLoading()

  return (
<AppContext.Provider
      value={{
        blockedTime,
        setBlockedTime,
        loading,
        setLoading
      }}
    >
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/SignIn' element ={<SignIn/>}/>
      <Route path='/SignUp' element ={<SignUp/>}/>
      <Route path='/Blocked' element ={<Blocked/>}/>
    </Routes>  
 </AppContext.Provider>

  )
}