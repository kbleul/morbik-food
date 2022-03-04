import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RecipePage from './drinksrecipepage'
import { Link } from "react-router-dom"


const Main = ({ navChoice, setChoice, choicetype, set_choicetype, togglerecipe_page, set_togglerecipe_page }) => {
  const [catagories, set_catagories] = useState([]);
  const [frontdrink_list, set_frontdrink_list] = useState([]);

  const [recipefor, set_recipefor] = useState("");
  const [isnav, set_isnav] = useState("text-xs font-black bg-white border-2 rounded-full px-6 py-2 mb-2 ml-4")

  const getCatagories = async () => {
    try {
      const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
      set_catagories(result.data.drinks)

    } catch (e) { console.log("Fetch drinks catagory failed ! " + e) }
  }

  const getFoods_list = async () => {
    try {
      if (choicetype === "c") {
        const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${navChoice}`)
        if (result.data.drinks == null) { set_frontdrink_list(["No Drinks Found Error"]) }
        else { set_frontdrink_list(result.data.drinks) }

      }
      else if (choicetype === "g") {
        const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${navChoice}`)
        if (result.data.drinks == null) { set_frontdrink_list(["No Drink Found Error"]) }
        else { set_frontdrink_list(result.data.drinks) }

      }
      else {
        const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${navChoice}`)
        if (result.data.drinks == null) { set_frontdrink_list(["No Drink Found Error"]) }
        else { set_frontdrink_list(result.data.drinks) }

      }

    } catch (e) { console.log(`Fetch ${navChoice} based drinks failed !  ` + e) }

  }


  useEffect(() => { getCatagories(); }, [])

  useEffect(() => { getFoods_list(); }, [navChoice])



  return (
    <article className="ml-4 mt-2 ">
      <section className=" ">
        {
          catagories.map(item => (
            <button className="  text-xs font-black bg-amber-400 border-0 rounded-full px-6 py-2 mb-2 ml-4  hover:bg-amber-200 " key={item.strCategory} onClick={() => { set_choicetype("c"); setChoice(item.strCategory); set_togglerecipe_page(false); }}>{item.strCategory}</button>
          ))
        }
      </section>

      <div className="mt-8 flex justify-center">
        <Link to={`/drinks`} >

          <button className=" font-black underline ">Drinks</button>
        </Link>

        <button className="ml-8 font-light hover:bg-amber-200">Foods</button>

      </div>

      {togglerecipe_page ? <RecipePage drinkid={recipefor} similardrinks={frontdrink_list} /> :
        <section className="grid grid-cols-3 gap-2 m-16">
          {frontdrink_list[0] === "No Drink Found Error" ? <div><p>No available drink for this ingrident.</p></div> :
            frontdrink_list.map(item => (
            <div key={item.idDrink} onClick={() => { set_recipefor(item.idDrink); set_togglerecipe_page(true); }}>
                <img key={item.strDrinkThumb} src={item.strDrinkThumb} alt={item.strDrink} />
                <p key={item.strDrink}>{item.strDrink}</p>

              </div>
            ))
          }
        </section>}
    </article>
  )
}


export default Main
