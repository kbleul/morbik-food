import { useState } from 'react';
import Main from "./drinksmain";
import Navigation from "./drinksnav";

const DrinkRecipeContent = () => {

    const [selectedCatagory, set_selectedCatagory] = useState("Ordinary_Drink");
    const [catagoryType, set_catagorytype] = useState("c");
    // categories, glasses, ingredients or alcoholic (c,g,i,a)
    const [showrecipe_page, set_showrecipe_page] = useState(false);

    return(<div  className="nav_container-drink">
    <nav id="sidenav" className=" w-11/12 lg:w-full z-10 absolute top-16 left-0 bg-white dark:bg-gray-800 lg:static lg:col-start-1 lg:col-end-3  lg:mt-10 hidden lg:block" >
            <Navigation setnavChoice={set_selectedCatagory} set_choicetype={set_catagorytype} set_togglerecipe_page={set_showrecipe_page} />
          </nav>
          <main className="col-start-1 lg:col-start-3 col-end-9 mt-4 h-screen overflow-y-scroll">
            <Main navChoice={selectedCatagory} setChoice={set_selectedCatagory} choicetype={catagoryType} set_choicetype={set_catagorytype} togglerecipe_page={showrecipe_page} set_togglerecipe_page={set_showrecipe_page} />
          </main>
  
        </div>)
}

export default DrinkRecipeContent