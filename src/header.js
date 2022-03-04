import React from 'react';
import { Link } from "react-router-dom"

import logo from '././imgs/logo/logo.jpg'

const Header = () => {
  return (
    <header className="border-b-2 flex justify-between items-center fixed top-0 w-full z-20 bg-white h-12">
      <Link className="w-1/5 ml-8" to="/" ><img src={logo} alt="logo" className="mx-4 " /></Link>
      <div className="w-1/5 ">
        <Link to="/reddit" > <button className="text-red-300 ml-16 hover:opacity-70" >Reddit</button></Link>
        <Link to="/myfavorites" > <button className="text-red-300 ml-16 hover:opacity-70" >Favorites</button></Link>
      </div>
    </header>
  )
};


export default Header;
