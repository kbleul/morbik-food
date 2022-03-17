import { useState } from 'react';
import Main from "./main";
import Navigation from "./nav";
import Footer from "./fotter";

const RecipeContent = () => {
  const [selectedCatagory, set_selectedCatagory] = useState("Beef");
  const [catagoryType, set_catagorytype] = useState("c");
  //Categories, Area, Ingredients (c,i,a)
  const [showrecipe_page, set_showrecipe_page] = useState(false);

  return (<div className="grid grid-cols-8 gap-3 dark:bg-gray-800 dark:text-white ">
    <nav id="sidenav" className="min-h-screen w-11/12 z-10 absolute top-16 left-0 bg-white dark:bg-gray-800 md:static md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-2 md:mt-10 hidden md:block">
      <Navigation setnavChoice={set_selectedCatagory} set_choicetype={set_catagorytype} set_togglerecipe_page={set_showrecipe_page} />
    </nav>
    <main className="col-start-1 md:col-start-3 col-end-9 row-start-2 row-end-5 mt-4">
      <Main navChoice={selectedCatagory} setChoice={set_selectedCatagory} choicetype={catagoryType} set_choicetype={set_catagorytype} togglerecipe_page={showrecipe_page} set_togglerecipe_page={set_showrecipe_page} />
    </main>


    <div className="col-start-1 md:col-start-3 col-end-9 row-start-5 row-end-7  ">
      <Footer />
    </div>
  </div>)
}

export default RecipeContent;
