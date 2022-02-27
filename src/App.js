import Header from "./header";
import Footer from "./fotter";
import Main from "./main";
import Navigation from "./nav";
import {useState} from 'react';

function App() {

  const [selectedCatagory , set_selectedCatagory]= useState("Beef");
  const [catagoryType, set_catagorytype] = useState("c");
  //Categories, Area, Ingredients (c,i,a)
  const [showrecipe_page , set_showrecipe_page] = useState(false);

  return (
    <div className="grid grid-cols-8 gap-3">
    <div className="col-span-9 ">
      <Header />
      </div>
      <nav className="col-start-1 col-end-3 row-start-2 row-end-2 ">
       <Navigation setnavChoice={set_selectedCatagory} set_choicetype={set_catagorytype} set_togglerecipe_page={set_showrecipe_page}/>
      </nav>
      <main className="col-start-3 col-end-9 row-start-2 row-end-5 ">
        <Main navChoice={selectedCatagory} setChoice={set_selectedCatagory} choicetype={catagoryType}  set_choicetype={set_catagorytype} togglerecipe_page={showrecipe_page} set_togglerecipe_page={set_showrecipe_page}/>
      </main>

      <div className="col-span-9 ">
      <Footer />
      </div>
    </div>
  );
}

export default App;
