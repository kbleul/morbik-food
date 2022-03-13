import React, { useState, useEffect } from 'react'
import axios from 'axios'
import loading from './imgs/loading_.gif'

const Navigation = ({ setnavChoice, set_choicetype, set_togglerecipe_page }) => {

  const [ingredient_choiceresults, setingredient_choiceresults] = useState([]);
  const [glasses_choiceresults, setglasses_choiceresults] = useState([]);
  const [alcholic_choiceresults, setalcholic_choiceresults] = useState([]);


  const [showingredient_choiceresults, set_showingredient_choiceresults] = useState(false);
  const [showglasses_choiceresults, set_showglasses_choiceresults] = useState(false);
  const [showalcholic_choiceresults, set_showalcholic_choiceresults] = useState(false);


  const [showalcholic, set_showalcholic] = useState(true);
  const [showingredients, set_showingredients] = useState(false);
  const [showglasses, set_showglasses] = useState(false);

  const [picked , set_picked] = useState();




  const getCatagories = async () => {
    try {
      const result_alcholic = await axios(`https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`);
      setalcholic_choiceresults(result_alcholic.data.drinks);
      set_showalcholic_choiceresults(true);

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
    else if (type === "ingr") {
      if (showingredients) { set_showingredients(false); }
      else set_showingredients(true)
    }
    else {
      if (showalcholic) { set_showalcholic(false); }
      else set_showalcholic(true)
    }
  }


  return (
    <section className="fixed left-0 w-1/4 h-screen overflow-y-scroll overscroll-y-auto mt-16">
      <div>
        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3  flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M7.854 1.49a.5.5 0 0 0-.707 0L1.49 7.146a.5.5 0 0 0 0 .708l5.657 5.656a.5.5 0 0 0 .707 0l5.657-5.656a.5.5 0 0 0 0-.708L7.854 1.49ZM7.5 2.55L2.55 7.5l4.95 4.95v-9.9Z" clip-rule="evenodd" /></svg><p className="ml-2">Type</p></h2>
          <button className="border-b text-lg  mt-10 mb-3 mr-8 hover:text-red-400" onClick={() => showChoices("alcholic")}>{showalcholic ? "↑" : "↓"}</button>
        </div>
        {!showalcholic_choiceresults ? <div className="flex item-center justify-center mt-8"> 
        <img className="w-10 h-10" src={loading} alt="loading" /></div> :
          <div className={showalcholic ? "flex flex-col items-center" : "hidden"}>
            {alcholic_choiceresults.map(item => (
              <button className={picked === item.strAlcoholic ? "border-b px-4 py-3 w-3/4 font-bold border-l-4 border-l-green-400 dark:border-b-gray-300" :"border-b px-2 py-3 w-3/4 hover:border-b-amber-500 dark:border-b-gray-300 dark:hover:border-b-amber-500"} onClick={() => { set_togglerecipe_page(false); appendUnderscore(item.strAlcoholic); set_choicetype("a"); set_picked(item.strAlcoholic) }}
                key={item.strAlcoholic}>{item.strAlcoholic}</button>
            ))}
          </div>}

        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M768 64a192 192 0 1 1-69.952 370.88L480 725.376V896h96a32 32 0 1 1 0 64H320a32 32 0 1 1 0-64h96V725.376L76.8 273.536a64 64 0 0 1-12.8-38.4v-10.688a32 32 0 0 1 32-32h71.808l-65.536-83.84a32 32 0 0 1 50.432-39.424l96.256 123.264h337.728A192.064 192.064 0 0 1 768 64zM656.896 192.448H800a32 32 0 0 1 32 32v10.624a64 64 0 0 1-12.8 38.4l-80.448 107.2a128 128 0 1 0-81.92-188.16v-.064zm-357.888 64l129.472 165.76a32 32 0 0 1-50.432 39.36l-160.256-205.12H144l304 404.928l304-404.928H299.008z" /></svg><p className="ml-2">Glasses</p></h2>
          <button className="border-b text-lg  mt-10 mb-3 mr-8 hover:text-red-400" onClick={() => showChoices("glass")}>{showglasses ? "↑" : "↓"}</button>
        </div>
        {!showglasses_choiceresults ? <div className="flex item-center justify-center mt-8"> 
        <img  className="w-10 h-10" src={loading} alt="loading" /></div> :
          <div className={showglasses ? "flex flex-col items-center" : "hidden"}>
            {glasses_choiceresults.map(item => (
              <button className={picked === item.strGlass ? "border-b px-4 py-3 w-3/4 font-bold border-l-4 border-l-green-400 dark:border-b-gray-300" :"border-b px-2 py-3 w-3/4 hover:border-b-amber-500 dark:border-b-gray-400  dark:hover:border-b-amber-500"} onClick={() => { set_togglerecipe_page(false); appendUnderscore(item.strGlass); set_choicetype("g"); set_picked(item.strGlass) }}
                key={item.strGlass}>{item.strGlass}</button>
            ))}
          </div>}

        <div className="flex flex-row items-center justify-between ">
          <h2 className="font-black text-lg pl-12 mt-10 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16 13h-.5c-.7-1.3-1.2-3-1.7-4.7l.9.9c2.7 2.1 5.1 1.7 5.1 1.7s.7-3.8-2-5.8c-2.3-1.8-4.4-1.8-5-1.7c-.1-.6-.1-1.1-.2-1.5l-1.4.1c0 3.2-2.7 9.1-3.6 11c-2 .2-3.6 1.9-3.6 4c0 2.2 1.8 4 4 4c1.1 0 2-.4 2.7-1.1c-.4-.9-.7-1.9-.7-2.9s.3-2 .7-2.9c-.4-.4-1-.7-1.5-.9c.7-1.5 1.9-4.2 2.7-6.8c.4 2.3 1.2 5 2.2 7.1c-1.2.7-2.1 2-2.1 3.5c0 2.2 1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m-8 2.5c-.8 0-1.5.7-1.5 1.5h-1c0-1.4 1.1-2.5 2.5-2.5v1m8 0c-.8 0-1.5.7-1.5 1.5h-1c0-1.4 1.1-2.5 2.5-2.5v1Z" /></svg><p className="ml-2">Ingredients</p></h2>
          <button className="border-b text-lg  mt-10 mb-3 mr-8 hover:text-red-400" onClick={() => showChoices("ingr")}>{showingredients ? "↑" : "↓"}</button>
        </div>
        {!showingredient_choiceresults ? <div className="flex item-center justify-center mt-8">  <img  className="w-10 h-10" src={loading} alt="loading" /></div> :
          <div className={showingredients ? "grid grid-cols-2" : "hidden"}>
            {ingredient_choiceresults.map(item => (
              <button className={picked === item.strIngredient1 ? "border-b px-4 py-3 w-3/4 font-bold border-l-4 border-l-green-400 dark:border-b-gray-300" :"border-b px-2 py-4 w-4/4 ml-2 hover:border-b-amber-500 dark:border-b-gray-400  dark:hover:border-b-amber-500"} onClick={() => { set_togglerecipe_page(false); appendUnderscore(item.strIngredient1); set_choicetype("i"); set_picked(item.strIngredient1) }}
                key={item.strIngredient1}>{item.strIngredient1}</button>
            ))}
          </div>}
      </div>

    </section>
  )
}

export default Navigation