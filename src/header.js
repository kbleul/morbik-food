import React from 'react';
import logo from '././imgs/logo/logo.jpg'

const Header = () => {
  return (
      <header className="border-2">
        <img src={logo} alt="logo" className="mx-4 w-1/5"/>
      </header>
  )
};

export default Header;
