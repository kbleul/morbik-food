import { useState, useEffect } from 'react'
import axios from 'axios'
import loading from './imgs/loading_.gif'
import saveFavorites from './savefavorites_function'
import removeFavorite from "./removefavorites_function"


const RecipePage = ({ drinkid, similardrinks }) => {

  const [currentdrink_id, set_currentdrink_id] = useState(drinkid)
  const [recipedata, set_recipedata] = useState([]);
  const [recipetext, set_recipetext] = useState([]);
  const [ingredients, set_ingridients] = useState([]);
  const [ingredientamount, set_ingredientsamount] = useState([]);
  const [isfavorite , set_isfavorite] = useState(false);
  let favoritedrinks = [];

  const getRecipe = async () => {

    try {
      const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${currentdrink_id}`)

      if(localStorage.getItem("SavedDrinks"))
      {  favoritedrinks = localStorage.getItem("SavedDrinks").split(",");
      favoritedrinks = localStorage.getItem("SavedDrinks").split(",");

          if(favoritedrinks.includes(currentdrink_id) ) { set_isfavorite(true); }
      }

      set_recipedata(result.data.drinks)
      let temparr = result.data.drinks[0].strInstructions.split("\n");

      set_recipetext(temparr);

      temparr = [];
      let temparr_two = [];

      for (let i = 1; i < 16; i++) {
        let str = "strIngredient" + i;
        let str2 = "strMeasure" + i;

        if (result.data.drinks[0][str] || result.data.drinks[0][str] !== "") {
          temparr.push(result.data.drinks[0][str])
          temparr_two.push(result.data.drinks[0][str2])
        }

        if (result.data.drinks[0][str] == null) {
          temparr.pop();
          temparr_two.pop();
        }
      }

      set_ingridients(temparr);
      set_ingredientsamount(temparr_two);

      temparr = []; temparr_two = [];



    } catch (e) { console.log(`Fetch recipe for ${drinkid} failed !  ` + e) }

  }

  useEffect(() => { set_isfavorite(false); getRecipe() }, [currentdrink_id])

  return (<section className="mt-8">
    {recipedata.length === 0 ?<div className="flex item-center justify-center mt-8"> 
    <img src={loading} alt="loading" className="w-12 h-12" /> 
    </div> :
      <div className="mt-16">
        {
          recipedata.map(item => (
            <div key={`${item.strDrink} ${item.strDrink} ${item.idDrink}`}>
              <section key={`${item.strDrink}1`} className="flex flex-col lg:flex-row justify-center items-center">
                <div  key={`${item.strDrink}2`}  className="mb-20 lg:mb-0 lg:ml-2 flex flex-col w-11/12 justify-center lg:w-3/4" >
                  <div  key={`${item.strDrink}3`} className="flex justify-center"><img className="ml-1 w-full lg:w-[440] " key={item.strDrinkThumb} src={item.strDrinkThumb} alt={item.strDrink} width="480" height="315" /></div>

                   <div  key={`${item.strDrink}4`} className="flex flex-col lg:flex-row justify-between text-base">
                    <h4 className="mt-4 lg:mt-0 text-center border-b-2  font-black pl-2 lg:w-3/5" key={item.strDrink}>{item.strDrink} </h4>
  
                  {   isfavorite ?
                    <button key={`${item.idDrink}${item.idDrink}1`} className="order-first lg:order-last pr-4 text-red-400 ml-8 self-end hover:border-b-2 hover:border-red-300 flex" onClick={() => {set_isfavorite(false); removeFavorite("drink" , item.idDrink)} }><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11 15h2V9h3l-4-5l-4 5h3z" /><path fill="currentColor" d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z" /></svg><p className="ml-2">Saved</p></button> :

                    <button key={`${item.idDrink}${item.idDrink}2`} className="order-first lg:order-last  text-red-400 border-b-2 border-red-300 hover:opacity-70 ml-8 self-end flex" onClick={() => { set_isfavorite(true); saveFavorites("drink", item.idDrink) }}><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5l-5-5l1.41-1.41L11 12.67V3h2v9.67z" /></svg><p className="ml-2">Add to Favories</p></button>
                  }
                  </div>


                </div>
              </section>
            
              <section  key={`${item.strDrink}5`} className="flex flex-col justify-items-center items-center">
                {ingredientamount.length > 0 && <div  key={`${item.strDrink}6`} className="bg-gray-100 rounded-r-lg w-full lg:w-3/5 my-20 py-8 pl-4 font-serif dark:bg-gray-700 ">
                  <h2  key={`${item.strDrink}7`} className="text-center capitalize text-2xl leading-10 pb-8">Ingredients Needed</h2>
                  {ingredients.map(obj => (<p className="text-center leading-8" key={`${item.idDrink}${obj} ${item.idDrink}`}>{ingredientamount[ingredients.indexOf(obj)]} {obj}</p>))}
                </div>}

                <div  key={`${item.strDrink}8`} className="w-full lg:w-3/4 border-l-2 border-l-green-700 px-2 lg:pl-8 my-40 font-serif leading-6  lg:leading-8">
                  <h2  key={`${item.strDrink}9`} className="text-center capitalize text-2xl leading-10 mb-8 font-bold ">Recipe</h2>
                  {recipetext.map(steps => (steps !== "" && <p key={steps}> {steps}</p>))}
                </div>


              </section>


            </div>

          ))
        } </div>}

     {recipedata.length !== 0  && <h2 className="capitalize text-xl leading-10 font-light pl-2 text-center  lg:text-left lg:ml-24">Similar Drinks</h2>}

    <div className="h-96 overflow-y-scroll lg:ml-24 ">

      {similardrinks.map(item => (<div className="float-left w-1/3 lg:w-1/5 lg:ml-2" onClick={() => set_currentdrink_id(item.idDrink)} key={`${item.idDrink}${item.strDrinkThumb}${item.strDrink}`}>
        {
          (recipedata[0] !== undefined && recipedata[0].strDrink !== item.strDrink) && <div  className="p-1 text-sm font-light hover:opacity-75" key={`${item.strDrinkThumb}${item.strDrink}`} >
            <img key={item.strMealThumb} src={item.strDrinkThumb} alt={item.strDrink} />
            <p className=" text-center" key={item.strDrink}>{item.strDrink}</p>
          </div>
        }
      </div>
      )
      )}
    </div>
  </section>)
}

export default RecipePage;
