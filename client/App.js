import React, {useEffect} from 'react'
import { Route, Routes } from 'react-router'
import Homepage from './homepage'
import Login from './components/login'
import Layout from './Layout';

export default function App(){
  


  return(
    <Routes>
      <Route path='/' element = {<Layout/>} >


        <Route index element = {<Homepage/>}/>
        
        <Route path='/login' element = {<Login/>}/>

      </Route>
    </Routes>

  );

}