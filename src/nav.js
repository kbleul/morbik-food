import React, { useState, useEffect } from 'react'
import axios from 'axios'
import loading from './imgs/loading_2.gif'

const Navigation = ({ setnavChoice, set_choicetype, set_togglerecipe_page }) => {

  const [area_choiceresults, setarea_choiceresults] = useState([]);
  const [ingredient_choiceresults, setingredient_choiceresults] = useState([]);
  const [showarea_choiceresults, set_showarea_choiceresults] = useState(false);
  const [showingredient_choiceresults, set_showingredient_choiceresults] = useState(false);

  const [showareas, set_showareas] = useState(false);
  const [showingredients, set_showingredients] = useState(true);
  const [picked , set_picked] = useState()


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
    <section className="fixed left-0 w-1/4 h-screen overflow-y-scroll overscroll-y-auto mt-16">
      <div>
        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8Z"/></g></svg><p className="ml-2 ">Areas</p></h2>
          <button className="border-b text-lg  mt-10 mb-3 mr-8" onClick={() => showChoices("area")}>{showareas ? "↑" : "↓"}</button>
        </div>
        {!showarea_choiceresults ?<div className="flex item-center justify-center"> <img src={loading} alt="loading" /></div> :
          <div className={showareas ? "flex flex-col items-center" : "hidden"}>
            {area_choiceresults.map(item => (
              <button className={picked === item.strArea ? "border-b px-4 py-3 w-3/4 font-bold border-l-2 border-l-green-500" : "border-b px-4 py-3 w-3/4 hover:border-b-amber-500"} onClick={() => { set_togglerecipe_page(false); setnavChoice(item.strArea); set_choicetype("a"); set_picked(item.strArea) }}
                key={item.strArea}>{item.strArea}</button>
            ))}
          </div>}

        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16 13h-.5c-.7-1.3-1.2-3-1.7-4.7l.9.9c2.7 2.1 5.1 1.7 5.1 1.7s.7-3.8-2-5.8c-2.3-1.8-4.4-1.8-5-1.7c-.1-.6-.1-1.1-.2-1.5l-1.4.1c0 3.2-2.7 9.1-3.6 11c-2 .2-3.6 1.9-3.6 4c0 2.2 1.8 4 4 4c1.1 0 2-.4 2.7-1.1c-.4-.9-.7-1.9-.7-2.9s.3-2 .7-2.9c-.4-.4-1-.7-1.5-.9c.7-1.5 1.9-4.2 2.7-6.8c.4 2.3 1.2 5 2.2 7.1c-1.2.7-2.1 2-2.1 3.5c0 2.2 1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m-8 2.5c-.8 0-1.5.7-1.5 1.5h-1c0-1.4 1.1-2.5 2.5-2.5v1m8 0c-.8 0-1.5.7-1.5 1.5h-1c0-1.4 1.1-2.5 2.5-2.5v1Z"/></svg><p className="ml-2 ">Ingredients</p></h2>
          <button className="border-b text-lg mt-10 mb-3 mr-8 hover:text-red-400" onClick={() => showChoices("ingr")}>{showingredients ? "↑" : "↓"}</button>
        </div>
        {!showingredient_choiceresults ?<div className="flex item-center justify-center">  <img src={loading} alt="loading" /></div> :
          <div className={showingredients ? "grid grid-cols-2" : "hidden"}>
            {ingredient_choiceresults.map(item => (
              <button className={picked === item.strIngredient ? "ml-2 border-b px-4 py-3 w-3/4 font-bold border-l-2 border-l-green-500" : "border-b px-4 py-4 w-4/4 ml-2 hover:border-b-amber-500"} onClick={() => { set_togglerecipe_page(false); appendUnderscore(item.strIngredient); set_choicetype("i"); set_picked(item.strIngredient) }}
                key={item.strIngredient}>{item.strIngredient}</button>
            ))}
          </div>}
      </div>

    </section>
  )
}

export default Navigation