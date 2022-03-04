import React, { useState, useEffect } from 'react'
import axios from 'axios'
import loading from './imgs/loading_2.gif'

const Navigation = ({ setnavChoice, set_choicetype, set_togglerecipe_page }) => {

  const [ingredient_choiceresults, setingredient_choiceresults] = useState([]);
  const [glasses_choiceresults, setglasses_choiceresults] = useState([]);

  const [showingredient_choiceresults, set_showingredient_choiceresults] = useState(false);
  const [showglasses_choiceresults, set_showglasses_choiceresults] = useState(false);

  const [showingredients, set_showingredients] = useState(true);
  const [showglasses, set_showglasses] = useState(false);



  const getCatagories = async () => {
    try {
      const result_glass = await axios(`https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`);
      setglasses_choiceresults(result_glass.data.drinks);
      set_showglasses_choiceresults(true);

      const result_ingredient = await axios(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
      setingredient_choiceresults(result_ingredient.data.drinks);
      set_showingredient_choiceresults(true);

    } catch (e) {
      console.log(`Fetch glass and ingridents list failed ${e} `)
    }
  }


  useEffect(() => { getCatagories(); }, [])


  //splits the single string and addes underscore between them for api call
  //Eg Apple Cidar => Apple_Cidar
  const appendUnderscore = (tempstring) => {
    let temp_ingredientarr = tempstring.split(" ");
    let newingredient_str = "";
    temp_ingredientarr.forEach(item => {
      if (temp_ingredientarr.indexOf(item) !== 0) { newingredient_str += `_${item}` }
      else { newingredient_str += item }
    })

    setnavChoice(newingredient_str);
  }

  const showChoices = (type) => {
    if (type === "glass") {
      if (showglasses) { set_showglasses(false); }
      else set_showglasses(true)
    }
    else {
      if (showingredients) { set_showingredients(false); }
      else set_showingredients(true)
    }
  }


  return (
    <section className="fixed left-0 w-1/4 h-screen overflow-y-scroll overscroll-y-auto mt-16">
      <div>
        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3">Glasses</h2>
          <button className="border-b text-lg  mt-10 mb-3 mr-8" onClick={() => showChoices("glass")}>{showglasses ? "↑" : "↓"}</button>
        </div>
        {!showglasses_choiceresults ?<div className="flex item-center justify-center"> <img src={loading} alt="loading" /></div> :
          <div className={showglasses ? "flex flex-col items-center" : "hidden"}>
            {glasses_choiceresults.map(item => (
              <button className="border-b px-2 py-3 w-3/4" onClick={() => { set_togglerecipe_page(false); appendUnderscore(item.strGlass); set_choicetype("g") }}
                key={item.strGlass}>{item.strGlass}</button>
            ))}
          </div>}

        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3">Ingredients</h2>
          <button className="border-b text-lg  mt-10 mb-3 mr-8" onClick={() => showChoices("ingr")}>{showingredients ? "↑" : "↓"}</button>
        </div>
        {!showingredient_choiceresults ?<div className="flex item-center justify-center">  <img src={loading} alt="loading" /></div> :
          <div className={showingredients ? "grid grid-cols-2" : "hidden"}>
            {ingredient_choiceresults.map(item => (
              <button className="border-b px-2 py-4 w-4/4 ml-2" onClick={() => { set_togglerecipe_page(false); appendUnderscore(item.strIngredient1); set_choicetype("i") }}
                key={item.strIngredient1}>{item.strIngredient1}</button>
            ))}
          </div>}
      </div>

    </section>
  )
}

export default Navigation