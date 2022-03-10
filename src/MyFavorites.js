
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import loading from "./imgs/loading.gif"
import Fotter from "./fotter.js"
import RecipePage from './recipepage'
import DrinkRecipePage from './drinksrecipepage'


const MyFavorites = () => {

  const [foodfavorites, set_foodfavorites] = useState([]);
  const [drinkfavorites, set_drinkfavorites] = useState([]);
  const [redditfavorites, set_redditfavorites] = useState([]);

  const [frontfood_list , set_frontfood_list] = useState([]);

  const [recipefor , set_recipefor] = useState("");
  const [drink_recipefor , set_drink_recipefor] = useState("");
  const [reloadpage, set_reloadpage] = useState(1)


  let foodfavs_arr = [];
  let drinkfavs_arr = [];
  let redditfavs_arr = [];

  
  let temparr = []
  let temparr2 = []
  let temparr3 = []


  const fetchfood = async (item) => {
  const result = await axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`);
  temparr.push(result.data.meals[0])
               if(temparr.length === foodfavs_arr.length)
                  {  set_foodfavorites(temparr); }
}

const fetchdrink = async (item) => {
  const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item}`);
  temparr2.push(result.data.drinks[0])
             console.log(item)
               if(temparr2.length === drinkfavs_arr.length)
                  {  set_drinkfavorites(temparr2)}
}

const fetchreddit = async (item) => {
  const result = await axios(`https://www.reddit.com/r/${item}.json`);
  temparr3.push(result.data.data.children[0].data)
               if(temparr3.length === redditfavs_arr.length)
                  {  set_redditfavorites(temparr3)}
}

  useEffect(() => { console.log("reloaded")
    if (localStorage.getItem("SavedFoods")) {
      foodfavs_arr = localStorage.getItem("SavedFoods").split(",");
       foodfavs_arr.map(item => {
        fetchfood(item);
    })
  } else { set_foodfavorites(["None"])}

   if (localStorage.getItem("SavedDrinks")) {
     drinkfavs_arr = localStorage.getItem("SavedDrinks").split(",");
    drinkfavs_arr.map(item => {
      fetchdrink(item);
    })  
  } else { set_drinkfavorites(["None"])}
  
  if (localStorage.getItem("SavedSubReddits")) {
    redditfavs_arr = localStorage.getItem("SavedSubReddits").split(",");
    redditfavs_arr.map(item => {
      fetchreddit(item);
   })
  } else { set_redditfavorites(["None"])}

  },[reloadpage])
  
  //type== food,drink or reddit catagory == strCatagory
  const viewFavorite = (type ,id , catagory) => {
     
   if(type === "food") {
    const fetchitems = async () => {
        try {
          const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catagory}`);
          if (result.data.meals == null) { set_frontfood_list(["No Food Found Error"]) }
          else { set_frontfood_list(result.data.meals) }
          set_recipefor(id);
        } catch(e) { console.log(`Fetch ${catagory} based foods failed !  ` + e)  }
      }

      fetchitems();
    }
    else if(type=== "drink") {
      const fetchitems = async () => {
        try {
          const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catagory}`);
          if (result.data.drinks == null) { set_frontfood_list(["No Food Found Error"]) }
          else { set_frontfood_list(result.data.drinks) }
          set_drink_recipefor(id);
        } catch(e) { console.log(`Fetch ${catagory} based drinks failed !  ` + e)  }
      }

      fetchitems();
    }
  }

  return (<article >
    {drink_recipefor !== "" &&  <div className="pl-32 mt-16">
    <button onClick = {() => {set_reloadpage(reloadpage + 1); set_drink_recipefor(""); }}>←</button>
    <DrinkRecipePage drinkid={drink_recipefor} similardrinks={frontfood_list} /></div>}

    {recipefor !== "" && <div className="pl-32 mt-16">
    <button onClick = {() => {set_reloadpage(reloadpage + 1); set_recipefor(""); }}>←</button>
      <RecipePage foodid={recipefor} similarfoods={frontfood_list} />
    </div>  }
    { (drink_recipefor === "" &&  recipefor === "") &&    <article>
        {foodfavorites.length > 0 && <div>{ foodfavorites[0] === "None" ?
        <div><p>No saved food recipes found ....</p></div> : <section className="h-screen overflow-y-scroll">
          <h1>Favorite Foods</h1>
          <div className="grid grid-cols-3 gap-10">
    
            {foodfavorites.map(item => (
              <div key={item.idMeal} onClick={() => viewFavorite("food",item.idMeal , item.strCategory)}>
                <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} />
                <h3 key={item.strMeal}>{item.strMeal}</h3>
                <p key={`${item.strMeal}${item.idMeal}`}>{item.strTags ? `${item.strTags}` : ""}</p>
              </div>
            ))
            }
          </div>
        </section>}</div>
        }
        {drinkfavorites.length > 0 ? <div>{ drinkfavorites[0] === "None" ?
        <div><p>No saved drinks recipes found ....</p></div> : <section>
          <h1>Favorite Drinks</h1>
          <div className="grid grid-cols-3 gap-10">
    
            {drinkfavorites.map(item => (
              <div key={item.idDrink} onClick={() => viewFavorite("drink",item.idDrink , item.strCategory)}>
                <img key={item.strDrinkThumb} src={item.strDrinkThumb} alt={item.strDrink} />
                <h3 key={item.strDrink}>{item.strDrink}</h3>
                <p  key={`${item.strAlcoholic}${item.strDrink}`}>{item.strTags ? `${item.strTags}` : ""}</p>
              </div>
            ))
            }
          </div>
        </section>  } </div> :
        <div className="mt-64 flex justify-center"><img className="w-16" src={loading} alt="loading" /></div>
        }
        {redditfavorites.length > 0 ? <div>{ redditfavorites[0] === "None" ?
        <div className="border-2"><p>No saved subreddits ....</p></div> : <section>
          <h1>Favorite Subreddits</h1>
          <div className="grid grid-cols-3 gap-10">
    
            {redditfavorites.map(item => (
              <Link key={`${item.subreddit_name_prefixed}${item.id}`} to={`/reddit/${item.subreddit}`} >
              <div className="border-b" key={item.subreddit_id}>
                <h3 key={item.subreddit}>{item.subreddit_name_prefixed}</h3>
                <p key={`${item.subreddit}${item.subreddit_subscribers}`}>{item.subreddit_subscribers ? `Subscribers ${item.subreddit_subscribers}` : ""}</p>
                <p key={`${item.subreddit_id}${item.subreddit}`}>{item.subreddit_type}</p>
              </div>
              </Link>
            ))
            }
          </div>
        </section>  } </div> :        
        <div className="mt-64 flex justify-center"><img className="w-24" src={loading} alt="loading" /></div>

        }
      </article>}

  <Fotter />

  </article>
  )
}

export default MyFavorites