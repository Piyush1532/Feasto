import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import {Routes,Route} from "react-router-dom"
import Add from './Pages/Add/Add'
import Lists from './Pages/Lists/Lists'
import Orders from './Pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
<Route path="/add" element={<Add/>}/>
<Route path="/list" element={<Lists/>}/>
<Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
