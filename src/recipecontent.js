import { useState,useEffect, useContext } from 'react';
import location_context from "./locationcontext"
import Main from "./main";
import Navigation from "./nav";

const RecipeContent = () => {
  const [selectedCatagory, set_selectedCatagory] = useState("Beef");
  const [catagoryType, set_catagorytype] = useState("c");
  //Categories, Area, Ingredients (c,i,a)
  const [showrecipe_page, set_showrecipe_page] = useState(false);
  const whereami_arr = useContext(location_context);


  useEffect(() => { whereami_arr[1]("Home") }, []);

  return (<div className="nav_container">
  
    <nav id="sidenav" className="w-11/12 lg:w-full z-10 absolute top-16 left-0 bg-white dark:bg-gray-800 lg:static lg:col-start-1 lg:col-end-3  lg:mt-10 hidden lg:block">
      <Navigation setnavChoice={set_selectedCatagory} set_choicetype={set_catagorytype} set_togglerecipe_page={set_showrecipe_page} />
    </nav>
    <main className="col-start-1 lg:col-start-3 col-end-9  mt-8">
      <Main navChoice={selectedCatagory} setChoice={set_selectedCatagory} choicetype={catagoryType} set_choicetype={set_catagorytype} togglerecipe_page={showrecipe_page} set_togglerecipe_page={set_showrecipe_page} />
    </main>

  </div>)
}

export default RecipeContent;
