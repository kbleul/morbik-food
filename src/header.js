import React from 'react';
import {Link} from "react-router-dom"

import logo from '././imgs/logo/logo.jpg'

const Header = () => {
  return (
      <header className="border-2 flex justify-between items-center fixed top-0 w-full z-20 bg-white">
      <Link to="/" ><img src={logo} alt="logo" className="mx-4 w-1/5"/></Link>
        <div className="w-1/5 ">
        <Link to="/reddit" > <button className="text-red-300 ml-16" >Reddit</button></Link>
         <button className="ml-8">Youtube</button>
        </div>
      </header>
  )
};


export default Header;
