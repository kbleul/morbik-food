
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import loading from "./imgs/loading.gif"

const MyFavorites = () => {

  const [foodfavorites, set_foodfavorites] = useState([]);
  const [drinkfavorites, set_drinkfavorites] = useState([]);

  useEffect(() => {

    let foodfavs_arr;
    let drinkfavs_arr;
    let temparr = [];


    if (localStorage.getItem("SavedFoods")) {
      foodfavs_arr = localStorage.getItem("SavedFoods").split(",");
       temparr = [];
       console.log("hhjhh")

      foodfavs_arr.map(item => {
        const fetchfood = async () => {
          const result = await axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`);
          temparr.push(result.data.meals[0])
        }
        fetchfood();
        if (foodfavs_arr.indexOf(item) === foodfavs_arr.length - 1) { set_foodfavorites(temparr); }
        console.log("hh")
      })
    }

    if (localStorage.getItem("SavedDrinks")) {
      drinkfavs_arr = localStorage.getItem("SavedDrinks").split(",");
      temparr = [];

      drinkfavs_arr.map(item => {
        const fetchdrink = async () => {
          const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item}`);
          temparr.push(result.data.drinks[0])
        }
        fetchdrink();
        if (drinkfavs_arr.indexOf(item) === drinkfavs_arr.length - 1) { set_drinkfavorites(temparr); }
      })
    }

  })

  return (
    <article>
      {foodfavorites.length > 0 && <section>
        <h1>Favorite Foods</h1>
        {foodfavorites.map(item => (
          <div key={item.idMeal}>
            <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} />
            <h3 key={item.strMeal}>{item.strMeal}</h3>
            <p>{`${item.strCategory} , ${item.strArea} , ${item.strTags}`}</p>
          </div>
        ))
        }
      </section>
      }

      {drinkfavorites.length > 0 ? <section>
        <h1>Favorite Drinks</h1>
        {drinkfavorites.map(item => (
          <div key={item.idDrink}>
            <img key={item.strDrinkThumb} src={item.strDrinkThumb} alt={item.strDrink} />
            <h3 key={item.strDrink}>{item.strDrink}</h3>
            <p>{`${item.strAlcoholic} , ${item.strGlass}, ${item.strCategory} , ${item.strTags}`}</p>
          </div>
        ))
        }
      </section> :
        <img className="mt-64" src={loading} alt="loading" />
      }

    </article>
  )
}

export default MyFavorites