import React, { useState, useEffect } from 'react'
import axios from 'axios'
import loading from './imgs/loading.gif'

const Navigation = ({ setnavChoice, set_choicetype, set_togglerecipe_page }) => {

  const [area_choiceresults, setarea_choiceresults] = useState([]);
  const [ingredient_choiceresults, setingredient_choiceresults] = useState([]);
  const [showarea_choiceresults, set_showarea_choiceresults] = useState(false);
  const [showingredient_choiceresults, set_showingredient_choiceresults] = useState(false);

  const [showareas, set_showareas] = useState(false);
  const [showingredients, set_showingredients] = useState(true);


  const getCatagories = async () => {
    try {
      const result_area = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
      setarea_choiceresults(result_area.data.meals);
      set_showarea_choiceresults(true);

      const result_ingredient = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
      setingredient_choiceresults(result_ingredient.data.meals);
      set_showingredient_choiceresults(true);

    } catch (e) {
      console.log(`Fetch available areas list failed ${e} `)
    }
  }
  useEffect(() => { getCatagories(); }, [])


  //splits the single string and addes underscore between them for api call
  //Eg Apple Cidar => Apple_Cidar
  const appendUnderscore = (ingredient) => {
    let temp_ingredientarr = ingredient.split(" ");
    let newingredient_str = "";
    temp_ingredientarr.forEach(item => {
      if (temp_ingredientarr.indexOf(item) !== 0) { newingredient_str += `_${item}` }
      else { newingredient_str += item }
    })

    setnavChoice(newingredient_str);
  }

  const showChoices = (type) => {
    if (type === "area") {
      if (showareas) { set_showareas(false); }
      else set_showareas(true)
    }
    else {
      if (showingredients) { set_showingredients(false); }
      else set_showingredients(true)
    }
  }


  return (
    <section className="fixed left-0 w-1/4 h-screen overflow-y-scroll overscroll-y-auto">
      <div>
        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3">Areas</h2>
          <button className="border-b text-lg  mt-10 mb-3 mr-8" onClick={() => showChoices("area")}>{showareas ? "↑" : "↓"}</button>
        </div>
        {!showarea_choiceresults ? <img src={loading} alt="loading" /> :
          <div className={showareas ? "flex flex-col items-center" : "hidden"}>
            {area_choiceresults.map(item => (
              <button className="border-b px-2 py-3 w-3/4" onClick={() => { set_togglerecipe_page(false); setnavChoice(item.strArea); set_choicetype("a") }}
                key={item.strArea}>{item.strArea}</button>
            ))}
          </div>}

        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3">Ingredients</h2>
          <button className="border-b text-lg  mt-10 mb-3 mr-8" onClick={() => showChoices("ingr")}>{showingredients ? "↑" : "↓"}</button>
        </div>
        {!showingredient_choiceresults ? <img src={loading} alt="loading" /> :
          <div className={showingredients ? "grid grid-cols-2" : "hidden"}>
            {ingredient_choiceresults.map(item => (
              <button className="border-b px-2 py-4 w-4/4 ml-2" onClick={() => { set_togglerecipe_page(false); appendUnderscore(item.strIngredient); set_choicetype("i") }}
                key={item.strIngredient}>{item.strIngredient}</button>
            ))}
          </div>}
      </div>

    </section>
  )
}

export default Navigation