import React from 'react';
import logo from '././imgs/logo/logo.jpg'

const Header = () => {
  return (
      <header className="border-2 flex justify-between items-center fixed top-0 w-full z-20 bg-white">
        <img src={logo} alt="logo" className="mx-4 w-1/5"/>
        <div className="w-1/5 ">
         <button className="text-red-300 ml-16" >Reddit</button>
         <button className="ml-8">Youtube</button>
        </div>
      </header>
  )
};

export default Header;
