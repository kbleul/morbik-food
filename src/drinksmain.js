import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RecipePage from './drinksrecipepage'
import { Link } from "react-router-dom"
import loading from "./imgs/loading_.gif"
import Footer from "./fotter";




const Main = ({ navChoice, setChoice, choicetype, set_choicetype, togglerecipe_page, set_togglerecipe_page }) => {
  const [catagories, set_catagories] = useState([]);
  const [frontdrink_list, set_frontdrink_list] = useState([]);

  const [recipefor, set_recipefor] = useState("");
  const [isnav, set_isnav] = useState("text-xs font-black bg-white border-2 rounded-full px-6 py-2 mb-2 ml-4")

  const getCatagories = async () => {
    try {
      const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

         let arr = result.data.drinks;
         let temparr = [];
            arr.forEach(item => {
              let tempstr = item.strCategory.split(" ");
              let newstr = "";
                tempstr.forEach(str => { newstr += str;  })
                temparr.push(newstr);
                console.log(temparr)
            }) 

            set_catagories(temparr);

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
      else if (choicetype === "a") {
        const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${navChoice}`)
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



  return (<div>
    
      <article className="md:ml-4 mt-16 ">
        <section className="flex overflow-x-scroll md:overflow-hidden md:block">
          {
            catagories.map(item => (
              <button className=" text-xs font-black bg-amber-400 border-0 rounded-full px-6 py-2 mb-2 ml-4  hover:bg-amber-200 dark:text-black" key={item} onClick={() => { set_choicetype("c"); setChoice(item); set_togglerecipe_page(false); }}>{item}</button>
            ))
          }
        </section>
        <div className="mt-4 md:mt-8 flex justify-center">
          <Link to={`/`} >
            <button className="font-light px-4 hover:bg-amber-200 dark:hover:text-black">Foods</button>
          </Link>
          <button className="ml-8 font-black underline ">Drinks</button>
        </div>
        {togglerecipe_page ? <RecipePage drinkid={recipefor} similardrinks={frontdrink_list} /> :
    
        <div>
        {frontdrink_list.length === 0 ? <div className="h-screen flex justify-center mt-8">
           <img className="w-12 h-12" src={loading} alt="loading" /></div> :
          <section className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-2 mt-4 md:m-16 md:ml-10">
            {frontdrink_list[0] === "No Drink Found Error" ? <div><p>No available drink for this ingrident.</p></div> :
              frontdrink_list.map(item => (
                <div className="hover:brightness-90" key={item.idDrink} onClick={() => { set_recipefor(item.idDrink); set_togglerecipe_page(true); }}>
                  <img key={item.strDrinkThumb} src={item.strDrinkThumb} alt={item.strDrink} />
                  <p className="font-light text-center  text-xs md:text-base" key={item.strDrink}>{item.strDrink}</p>
                </div>
              ))
            }
          </section>}
          </div>}
      </article>

      <div>
      <Footer />
    </div>

  </div>
  )
}


export default Main

