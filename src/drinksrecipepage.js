import { useState, useEffect } from 'react'
import axios from 'axios'
import loading from './imgs/loading.gif'


const RecipePage = ({ drinkid, similardrinks }) => {

  const [currentdrink_id, set_currentdrink_id] = useState(drinkid)
  const [recipedata, set_recipedata] = useState([]);
  const [recipetext, set_recipetext] = useState([]);
  const [ingredients, set_ingridients] = useState([]);
  const [ingredientamount, set_ingredientsamount] = useState([]);

  const getRecipe = async () => {

    try {
      const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${currentdrink_id}`)

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

  useEffect(() => { getRecipe() }, [currentdrink_id])

  return (<section className="mt-8">
    {recipedata.length === 0 ?<div className="flex item-center justify-center"> 
    <img src={loading} alt="loading" className="" /> 
    </div> :
      <div className="mt-16">
        {
          recipedata.map(item => (
            <div key={`${item.strDrink} ${item.strDrink} ${item.idDrink}`}>
              <section className="flex flex-row items-center">
                <div className="ml-8 flex flex-col w-2/4">
                  <img className="ml-1" key={item.strDrinkThumb} src={item.strDrinkThumb} alt={item.strDrink} width="480" height="315" />
                  <h4 className="text-center border-b-2 font-black" key={item.strDrink}>{item.strDrink} </h4>
                </div>
              </section>

              <section className="flex flex-col justify-items-center items-center">
                {ingredientamount.length > 0 && <div className="bg-gray-100 rounded-r-lg w-5/12 my-20 py-8 pl-4 font-serif	">
                  <h2 className="text-center capitalize text-2xl leading-10 pb-8">Ingredients Needed</h2>
                  {ingredients.map(obj => (<p className="text-center leading-8" key={`${item.idDrink}${obj} ${item.idDrink}`}>{ingredientamount[ingredients.indexOf(obj)]} {obj}</p>))}
                </div>}

                <div className="w-3/4 border-l-2 border-l-green-700 pl-8 my-40 font-serif leading-8">
                  <h2 className="text-center capitalize text-2xl leading-10 mb-8 font-bold ">Recipe</h2>
                  {recipetext.map(steps => (steps !== "" && <p key={steps}> {steps}</p>))}
                </div>


              </section>


            </div>

          ))
        } </div>}

     {recipedata.length !== 0  && <h2 className="capitalize text-xl leading-10 font-light pl-2 ml-24 ">Similar Drinks</h2>}

    <div className="h-96 overflow-y-scroll ml-24 ">

      {similardrinks.map(item => (<div className="float-left w-1/5 ml-2" onClick={() => set_currentdrink_id(item.idDrink)} key={`${item.idDrink}${item.strDrinkThumb}${item.strDrink}`}>
        {
          (recipedata[0] !== undefined && recipedata[0].strDrink !== item.strDrink) && <div className="text-sm font-light hover:opacity-75" key={`${item.strDrinkThumb}${item.strDrink}`} >
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
