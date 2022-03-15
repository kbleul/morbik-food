import { Link } from "react-router-dom"
import { useContext, useEffect } from 'react'
import logolight from './imgs/logo/logolight.png'
import logodark from './imgs/logo/logodark.png'
import Toggle from './ThemeToggle'
import { ThemeContext } from "./ThemeContext"
import location_context from "./locationcontext"
import {tooglemain_menu} from "./tooglemenus"



const Header = () => {

  const { theme, set_theme } = useContext(ThemeContext);
  const whereami_arr = useContext(location_context);


  return (<article >
    
      <header className="flex  justify-between items-center fixed top-0 w-full z-20 h-16 border-b-2 bg-white dark:bg-black dark:border-0">

          <button className="dark:text-white block w-1/4  md:hidden" ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5" /></svg></button>
          <Link className="w-2/4 md:w-1/4 md:ml-8" to="/" >
            <img src={theme === "light" ? logolight : logodark} alt="logo" className="h-14 brightness-125 hover:brightness-100 md:mx-4 " />
          </Link>
          <button id="dropdown_btn" className="dark:text-white  w-1/4 flex justify-center md:hidden hover:text-red-700 " onClick={tooglemain_menu}>
          <svg id="dropdown_svg" className="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m5 8l7 8l7-8z"/></svg>
          <svg id="dropdown_upsvg" className="hidden" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor"  d="m12 8l7 8H5z"/></svg>
          </button>
          <div className="hidden md:block"> <Toggle /> </div>
          <div className="w-1/5 hidden md:block">
            {whereami_arr[0] === "Reddit" ?
              <Link to="/reddit" > <button className={"text-red-300 ml-2 xl:ml-16 hover:border-b-2 hover:border-red-300 dark:text-red-600"} >Reddit</button></Link>
              : <Link to="/reddit" > <button className={"text-red-300 ml-2 xl:ml-16 hover:border-b-2 hover:border-red-300 dark:text-red-600"} >Reddit</button></Link>}
            {whereami_arr[0] === "Favorite" ?
              <Link to="/myfavorites" > <button className={"text-red-300 ml-4 xl:ml-16 border-b-2 border-red-300 dark:text-red-600"} >Favorites</button></Link>
              : <Link to="/myfavorites" > <button className={"text-red-300  ml-4 xl:ml-16 hover:border-b-2 border-red-300 dark:text-red-600"} >Favorites</button></Link>}
          </div>
    
      </header>


      <section id="topnav" className="hidden flex items-center fixed top-16 w-full justify-center bg-white dark:bg-black">
      {whereami_arr[0] === "Reddit" ?
      <Link to="/reddit" className="" > <button className={"flex items-center  text-red-300 ml-2 xl:ml-16 hover:border-b-2 hover:border-red-300 dark:text-red-600"} >
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="-2 -3 24 24"><g fill="currentColor"><path d="M19.986 8.029a2.51 2.51 0 0 0-4.285-1.771c-1.404-.906-3.197-1.483-5.166-1.573a2.734 2.734 0 0 1 1.028-2.139a2.735 2.735 0 0 1 2.315-.539l.112.025c0 .028-.004.056-.004.084a2.095 2.095 0 1 0 .328-1.121L14.113.95a3.812 3.812 0 0 0-3.228.752a3.812 3.812 0 0 0-1.433 2.983c-1.97.09-3.762.667-5.165 1.572a2.51 2.51 0 1 0-2.94 3.994c-.061.31-.093.628-.093.952c0 3.606 3.912 6.53 8.74 6.53c4.826 0 8.739-2.924 8.739-6.53c0-.324-.032-.641-.093-.952a2.508 2.508 0 0 0 1.346-2.222zm-3.905-6.925a1.013 1.013 0 0 1 0 2.025a1.013 1.013 0 0 1 0-2.025zM1.083 8.03c0-.787.64-1.427 1.427-1.427c.337 0 .646.118.89.314c-.763.655-1.354 1.425-1.721 2.27a1.423 1.423 0 0 1-.596-1.157zm14.442 6.923c-1.465 1.095-3.43 1.698-5.532 1.698s-4.067-.603-5.531-1.698c-1.37-1.023-2.125-2.355-2.125-3.75c0-1.394.754-2.725 2.125-3.75C5.926 6.359 7.89 5.757 9.993 5.757c2.103 0 4.067.602 5.532 1.697c1.37 1.024 2.125 2.355 2.125 3.75c0 1.394-.755 2.726-2.125 3.75zm2.782-5.767c-.367-.845-.958-1.614-1.721-2.269c.244-.196.554-.314.89-.314c.787 0 1.427.64 1.427 1.427c0 .476-.235.898-.596 1.156z"/><circle cx="6.801" cy="9.678" r="1.143"/><circle cx="13.185" cy="9.678" r="1.143"/><path d="M12.701 12.455a4.357 4.357 0 0 1-2.94 1.138a4.325 4.325 0 0 1-3.195-1.39a.541.541 0 1 0-.793.738a5.47 5.47 0 0 0 3.988 1.735a5.437 5.437 0 0 0 3.67-1.421a.541.541 0 1 0-.73-.8z"/></g></svg><p className="ml-2">Reddit</p></button></Link>
      : <Link to="/reddit" className="" > <button className={"flex items-center  text-red-300 ml-2 xl:ml-16 hover:border-b-2 hover:border-red-300 dark:text-red-600"} >
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="-2 -3 24 24"><g fill="currentColor"><path d="M19.986 8.029a2.51 2.51 0 0 0-4.285-1.771c-1.404-.906-3.197-1.483-5.166-1.573a2.734 2.734 0 0 1 1.028-2.139a2.735 2.735 0 0 1 2.315-.539l.112.025c0 .028-.004.056-.004.084a2.095 2.095 0 1 0 .328-1.121L14.113.95a3.812 3.812 0 0 0-3.228.752a3.812 3.812 0 0 0-1.433 2.983c-1.97.09-3.762.667-5.165 1.572a2.51 2.51 0 1 0-2.94 3.994c-.061.31-.093.628-.093.952c0 3.606 3.912 6.53 8.74 6.53c4.826 0 8.739-2.924 8.739-6.53c0-.324-.032-.641-.093-.952a2.508 2.508 0 0 0 1.346-2.222zm-3.905-6.925a1.013 1.013 0 0 1 0 2.025a1.013 1.013 0 0 1 0-2.025zM1.083 8.03c0-.787.64-1.427 1.427-1.427c.337 0 .646.118.89.314c-.763.655-1.354 1.425-1.721 2.27a1.423 1.423 0 0 1-.596-1.157zm14.442 6.923c-1.465 1.095-3.43 1.698-5.532 1.698s-4.067-.603-5.531-1.698c-1.37-1.023-2.125-2.355-2.125-3.75c0-1.394.754-2.725 2.125-3.75C5.926 6.359 7.89 5.757 9.993 5.757c2.103 0 4.067.602 5.532 1.697c1.37 1.024 2.125 2.355 2.125 3.75c0 1.394-.755 2.726-2.125 3.75zm2.782-5.767c-.367-.845-.958-1.614-1.721-2.269c.244-.196.554-.314.89-.314c.787 0 1.427.64 1.427 1.427c0 .476-.235.898-.596 1.156z"/><circle cx="6.801" cy="9.678" r="1.143"/><circle cx="13.185" cy="9.678" r="1.143"/><path d="M12.701 12.455a4.357 4.357 0 0 1-2.94 1.138a4.325 4.325 0 0 1-3.195-1.39a.541.541 0 1 0-.793.738a5.47 5.47 0 0 0 3.988 1.735a5.437 5.437 0 0 0 3.67-1.421a.541.541 0 1 0-.73-.8z"/></g></svg> <p className="ml-2">Reddit</p></button></Link>
  
    }
    {whereami_arr[0] === "Favorite" ?
      <Link to="/myfavorites" class="mr-4" > <button className={"flex text-red-300 ml-4 xl:ml-16 border-b-2 border-red-300 dark:text-red-600"} >
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M28.766 4.256A4.212 4.212 0 0 0 23 4.032a4.212 4.212 0 0 0-5.766.224a4.319 4.319 0 0 0 0 6.044l5.764 5.84l.002-.002l.002.001l5.764-5.839a4.319 4.319 0 0 0 0-6.044zm-1.424 4.639l-4.34 4.397L23 13.29l-.002.002l-4.34-4.397a2.308 2.308 0 0 1 0-3.234a2.264 2.264 0 0 1 3.156 0l1.181 1.207l.005-.005l.005.005l1.18-1.207a2.264 2.264 0 0 1 3.157 0a2.308 2.308 0 0 1 0 3.234zM16 30h-2v-5a3.003 3.003 0 0 0-3-3H7a3.003 3.003 0 0 0-3 3v5H2v-5a5.006 5.006 0 0 1 5-5h4a5.006 5.006 0 0 1 5 5zM9 10a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5z"/></svg>
      <p className="ml-2">Favorites</p></button></Link>
      : <Link to="/myfavorites" class="mr-4" > <button className={"flex text-red-300  ml-4 xl:ml-16 hover:border-b-2 border-red-300 dark:text-red-600"} >
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M28.766 4.256A4.212 4.212 0 0 0 23 4.032a4.212 4.212 0 0 0-5.766.224a4.319 4.319 0 0 0 0 6.044l5.764 5.84l.002-.002l.002.001l5.764-5.839a4.319 4.319 0 0 0 0-6.044zm-1.424 4.639l-4.34 4.397L23 13.29l-.002.002l-4.34-4.397a2.308 2.308 0 0 1 0-3.234a2.264 2.264 0 0 1 3.156 0l1.181 1.207l.005-.005l.005.005l1.18-1.207a2.264 2.264 0 0 1 3.157 0a2.308 2.308 0 0 1 0 3.234zM16 30h-2v-5a3.003 3.003 0 0 0-3-3H7a3.003 3.003 0 0 0-3 3v5H2v-5a5.006 5.006 0 0 1 5-5h4a5.006 5.006 0 0 1 5 5zM9 10a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0-2a5 5 0 1 0 5 5a5 5 0 0 0-5-5z"/> </svg><p className="ml-2">Favorites</p>
      </button></Link>}
      <Toggle />
      </section>

  </article>
  )
};

export default Header