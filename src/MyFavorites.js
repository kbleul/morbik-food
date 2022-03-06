
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import loading from "./imgs/loading.gif"

const MyFavorites = () => {

  const [foodfavorites, set_foodfavorites] = useState([]);
  const [drinkfavorites, set_drinkfavorites] = useState([]);
  const [redditfavorites, set_redditfavorites] = useState([]);

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

  useEffect(() => {
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

  },[])
  

  return (
    <article>
      {foodfavorites.length > 0 && <div>{ foodfavorites[0] === "None" ? 
      <div><p>No saved food recipes found ....</p></div> : <section> 
        <h1>Favorite Foods</h1>
        <div className="grid grid-cols-3 gap-10">
          
          {foodfavorites.map(item => (
            <div key={item.idMeal}>
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
            <div key={item.idDrink}>
              <img key={item.strDrinkThumb} src={item.strDrinkThumb} alt={item.strDrink} />
              <h3 key={item.strDrink}>{item.strDrink}</h3>
              <p  key={`${item.strAlcoholic}${item.strDrink}`}>{item.strTags ? `${item.strTags}` : ""}</p>
            </div>
          ))
          }
        </div>
      </section>  } </div> :
      <img className="mt-64" src={loading} alt="loading" /> 
      }

      {redditfavorites.length > 0 ? <div>{ redditfavorites[0] === "None" ? 
      <div className="border-2"><p>No saved subreddits ....</p></div> : <section>
        <h1>Favorite Subreddits</h1>
        <div className="grid grid-cols-3 gap-10">
          
          {redditfavorites.map(item => (
            <div className="border-b" key={item.subreddit_id}>
              <h3 key={item.subreddit}>{item.subreddit_name_prefixed}</h3>
              <p key={`${item.subreddit}${item.subreddit_subscribers}`}>{item.subreddit_subscribers ? `Subscribers ${item.subreddit_subscribers}` : ""}</p>
              <p key={`${item.subreddit_id}${item.subreddit}`}>{item.subreddit_type}</p>
            </div>
          ))
          }
        </div>
      </section>  } </div> :
      <img className="mt-64" src={loading} alt="loading" /> 
      }

    </article>
  )
}

export default MyFavorites