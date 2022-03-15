import { Link } from "react-router-dom"
import { useContext , useEffect} from 'react' 
import logolight from './imgs/logo/logolight.png'
import logodark from './imgs/logo/logodark.png'
import Toggle from './ThemeToggle'
import {ThemeContext} from "./ThemeContext"
import location_context from "./locationcontext"



 const Header = () => {

  const {theme , set_theme} = useContext(ThemeContext);
  const whereami_arr = useContext(location_context);


  return (
    <header className="flex justify-between items-center fixed top-0 w-full z-20 h-16 border-b-2 bg-white dark:bg-black dark:border-0">

      <button className="dark:text-white block w-1/4  md:hidden" ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/></svg></button>

      <Link className="w-2/4 md:w-1/4 md:ml-8" to="/" >
        <img src={theme === "light" ? logolight : logodark} alt="logo" className="h-14 brightness-125 hover:brightness-100 md:mx-4 " /> 
      </Link>

      <button className="dark:text-white block w-1/4 flex justify-end md:hidden" ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="24" r="2" fill="currentColor"/></svg></button>

      <div className="hidden md:block"> <Toggle /> </div>

      <div className="w-1/5 hidden md:block">
        {whereami_arr[0] === "Reddit" ? 
        <Link to="/reddit" > <button className={"text-red-300 ml-2 lg:ml-16 hover:border-b-2 hover:border-red-300 dark:text-red-600"} >Reddit</button></Link> 
        : <Link to="/reddit" > <button className={"text-red-300 ml-2 lg:ml-16 hover:border-b-2 hover:border-red-300 dark:text-red-600"} >Reddit</button></Link>}

        {whereami_arr[0] === "Favorite" ? 
        <Link to="/myfavorites" > <button className={"text-red-300 ml-4 lg:ml-16 border-b-2 border-red-300 dark:text-red-600"} >Favorites</button></Link> 
        : <Link to="/myfavorites" > <button className={"text-red-300  ml-4 lg:ml-16 hover:border-b-2 border-red-300 dark:text-red-600"} >Favorites</button></Link>}
      </div>

    </header>
  )
};

export default Header