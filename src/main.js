import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RecipePage from './recipepage'
import { Link } from "react-router-dom"
import loading from "./imgs/loading_.gif"


const Main = ({ navChoice, setChoice, choicetype, set_choicetype, togglerecipe_page, set_togglerecipe_page }) => {
  const [catagories, set_catagories] = useState([]);
  const [frontfood_list, set_frontfood_list] = useState([]);

  const [recipefor, set_recipefor] = useState("");

  const getCatagories = async () => {
    try {
      const result = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
      set_catagories(result.data.meals)

    } catch (e) { console.log("Fetch catagory failed ! " + e) }
  }

  const getFoods_list = async () => {
    try {
      if (choicetype === "c") {
        const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${navChoice}`)
        if (result.data.meals == null) { set_frontfood_list(["No Food Found Error"]) }
        else { set_frontfood_list(result.data.meals) }

      }
      else if (choicetype === "a") {
        const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${navChoice}`)
        if (result.data.meals == null) { set_frontfood_list([{ "idMeal": "No Food Found Error" }]) }
        else { set_frontfood_list(result.data.meals) }

      }
      else {
        const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${navChoice}`)
        if (result.data.meals == null) { set_frontfood_list(["No Food Found Error"]) }
        else { set_frontfood_list(result.data.meals) }

      }

    } catch (e) { console.log(`Fetch ${navChoice} based foods failed !  ` + e) }

  }


  useEffect(() => { getCatagories(); }, [])

  useEffect(() => { getFoods_list(); }, [navChoice])



  return (
    <article className="ml-4 mt-16">
      <section className=" ">
        {
          catagories.map(item => (
            <button className=" text-xs font-black bg-amber-400 border-0 rounded-full px-6 py-2 mb-2 ml-4  hover:bg-amber-200 dark:text-black " key={item.strCategory} onClick={() => { set_choicetype("c"); setChoice(item.strCategory); set_togglerecipe_page(false); }}>{item.strCategory}</button>
          ))
        }
      </section>

      <div className="mt-8 flex justify-center">
          <button className="font-extrabold underline">Foods</button>

        <Link to={`/drinks`} >
          <button className="ml-8 font-light hover:bg-amber-200 px-4 dark:hover:text-black">Drinks</button>
        </Link>


      </div>

      {togglerecipe_page ? <RecipePage foodid={recipefor} similarfoods={frontfood_list} /> :
        <div>
        
          {frontfood_list.length === 0 ? <div className="h-screen flex justify-center mt-12">
          <img className="w-12 h-12" src={loading} alt="loading" /></div> :
          <section className="grid grid-cols-3 gap-2 m-16 ml-10">
            {frontfood_list[0] === "No Food Found Error" ? <div><p>No available food for this ingrident.</p></div> :
              frontfood_list.map(item => (
                <div className="hover:brightness-90" key={item.idMeal} onClick={() => { set_recipefor(item.idMeal); set_togglerecipe_page(true); }}>
                  <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} />
                  <p className="font-light text-center" key={item.strMeal}>{item.strMeal}</p>
                </div>
              ))
            }
          </section>
         }
      </div>
      }
    </article>
  )
}


export default Main

