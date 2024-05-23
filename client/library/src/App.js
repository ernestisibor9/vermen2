import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import { Routes, Route, Navigate } from'react-router-dom'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <div>
        <Routes>
        <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          <Route path='register' element={<PublicRoutes><Register/></PublicRoutes>}/>
          <Route path='login' element={<PublicRoutes><Login/></PublicRoutes>}/>
        </Routes>
        <ToastContainer theme='colored'/>
    </div>
  )
}

// Protected routes
export function ProtectedRoutes({children}) {
  const person = localStorage.getItem('person');
  if(person !== "" && person){
    return children
  }
  else{
    return <Navigate to = '/login'/>
  }
}


// Public routes
export function PublicRoutes({children}) {
  const person = localStorage.getItem('person');
  if(person !== "" && person){
    return <Navigate to = '/'/>
  }
  else{
    return children
  }
}

export default App
