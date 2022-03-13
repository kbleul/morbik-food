import { Link } from "react-router-dom"
import logo from '././imgs/logo/logo.jpg'
import Toggle from './ThemeToggle'


const Header = () => {

  return (
      <header className="border-b-2 flex justify-between items-center fixed top-0 w-full z-20 bg-white h-12 ark:bg-black">
        <Link className="w-1/5 ml-8" to="/" ><img src={logo} alt="logo" className="mx-4 " /></Link>
        <Toggle />
        <div className="w-1/5 ">
          <Link to="/reddit" > <button className={whereami === "reddit" ? "text-red-300 ml-16 hover:opacity-70 border-b-2 border-red-300" 
          :"text-red-300 ml-16 hover:opacity-70 hover:border-b-2 hover:border-red-300"} >Reddit</button></Link>
          <Link to="/myfavorites" > <button className={whereami === "favorite" ? "text-red-300 ml-16 hover:opacity-70 border-b-2 border-red-300" 
          : "text-red-300 ml-16 hover:opacity-70 hover:border-b-2 hover:border-red-300"} >Favorites</button></Link>
        </div>
      </header>
  )
};


export default Header;
