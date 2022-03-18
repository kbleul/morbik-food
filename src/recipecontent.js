import { useState } from 'react';
import Main from "./main";
import Navigation from "./nav";

const RecipeContent = () => {
  const [selectedCatagory, set_selectedCatagory] = useState("Beef");
  const [catagoryType, set_catagorytype] = useState("c");
  //Categories, Area, Ingredients (c,i,a)
  const [showrecipe_page, set_showrecipe_page] = useState(false);

  return (<div className="grid grid-cols-8 gap-3 dark:bg-gray-800 dark:text-white">
    <nav id="sidenav" className="w-11/12 md:w-full z-10 absolute top-16 left-0 bg-white dark:bg-gray-800 md:static md:col-start-1 md:col-end-3  md:mt-10 hidden md:block">
      <Navigation setnavChoice={set_selectedCatagory} set_choicetype={set_catagorytype} set_togglerecipe_page={set_showrecipe_page} />
    </nav>
    <main className="col-start-1 md:col-start-3 col-end-9  mt-4 h-screen overflow-y-scroll">
      <Main navChoice={selectedCatagory} setChoice={set_selectedCatagory} choicetype={catagoryType} set_choicetype={set_catagorytype} togglerecipe_page={showrecipe_page} set_togglerecipe_page={set_showrecipe_page} />
    </main>


  
  </div>)
}

export default RecipeContent;
