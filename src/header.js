import { Link } from "react-router-dom"
import React , {useContext} from 'react'

import { ThemeContext } from './ThemeContext';
import logolight from './imgs/logo/logolight.png'
import logodark from './imgs/logo/logodark.png'
import Toggle from './ThemeToggle'


const Header = () => {
  const { theme, set_theme } = useContext(ThemeContext);

  return (
    <header className="flex justify-between items-center fixed top-0 w-full z-20 h-16 border-b-2 bg-white dark:bg-black dark:border-0">
      <Link className="w-1/4 ml-8" to="/" >
        <img src={theme === "light" ? logolight : logodark} alt="logo" className="mx-4 h-14" /> 
      </Link>
      <Toggle />
      <div className="w-1/5 ">
        <Link to="/reddit" > <button className={"text-red-300 ml-16 hover:border-b-2 hover:border-red-300 dark:text-red-600"} >Reddit</button></Link>
        <Link to="/myfavorites" > <button className={"text-red-300 ml-16  hover:border-b-2 border-red-300 dark:text-red-600"} >Favorites</button></Link>
      </div>
    </header>
  )
};


export default Header;
