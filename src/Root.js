import React from 'react'
import { Outlet } from 'react-router-dom'
//import './Root.css';

function Root() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Root