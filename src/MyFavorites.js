
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import loading from "./imgs/loading.gif"
import Fotter from "./fotter.js"
import RecipePage from './recipepage'
import DrinkRecipePage from './drinksrecipepage'


const MyFavorites = () => {

  const [foodfavorites, set_foodfavorites] = useState([]);
  const [drinkfavorites, set_drinkfavorites] = useState([]);
  const [redditfavorites, set_redditfavorites] = useState([]);

  const [frontfood_list, set_frontfood_list] = useState([]);

  const [recipefor, set_recipefor] = useState("");
  const [drink_recipefor, set_drink_recipefor] = useState("");
  const [reloadpage, set_reloadpage] = useState(1)
  const [type, set_type] = useState("food")
  const [leftimg, set_leftimg] = useState([]);
  const [leftimg_drink , set_leftimg_drink] = useState([])
  let [leftcounter, set_leftcounter] = useState(1);
  let [leftcounter_drink, set_leftcounter_drink] = useState(1);



  let foodfavs_arr = [];
  let drinkfavs_arr = [];
  let redditfavs_arr = [];


  let temparr = []
  let temparr2 = []
  let temparr3 = []

  const fetchfood = async (item) => {
    const result = await axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`);
    temparr.push(result.data.meals[0]);

    if (foodfavs_arr.indexOf(item) === 0) {
      let arr = [result.data.meals[0].strMealThumb, result.data.meals[0].strMeal, result.data.meals[0].strTags];
      set_leftimg(arr)
      console.log(leftimg  )
      console.log([result.data.meals[0].strMealThumb, result.data.meals[0].strMeal, result.data.meals[0].strTags])
      
    }

    if (temparr.length === foodfavs_arr.length) { set_foodfavorites(temparr); }
  }


  const fetchdrink = async (item) => {
    const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item}`);
    temparr2.push(result.data.drinks[0]);

    if (drinkfavs_arr.indexOf(item) === 0) {
      set_leftimg_drink([result.data.drinks[0].strDrinkThumb, result.data.drinks[0].strDrink, result.data.drinks[0].strTags])
    }

    if (temparr2.length === drinkfavs_arr.length) { set_drinkfavorites(temparr2) }
  }

  const fetchreddit = async (item) => {
    const result = await axios(`https://www.reddit.com/r/${item}.json`);
    temparr3.push(result.data.data.children[0].data)
    if (temparr3.length === redditfavs_arr.length) { set_redditfavorites(temparr3) }
  }

  console.log("ola_two")

  useEffect(() => { 

    if(type === "food"){
    if (localStorage.getItem("SavedFoods")) {
      foodfavs_arr = localStorage.getItem("SavedFoods").split(",");
      console.log("length" + foodfavs_arr)
      foodfavs_arr.map(item => {
        fetchfood(item);
      })
    } else { set_foodfavorites(["None"]) }
  }
  else if(type === "drink"){
    if (localStorage.getItem("SavedDrinks")) {
      drinkfavs_arr = localStorage.getItem("SavedDrinks").split(",");
      drinkfavs_arr.map(item => {
        fetchdrink(item);
      })
    } else { set_drinkfavorites(["None"]) }
  }
    else {
    if (localStorage.getItem("SavedSubReddits")) {
      redditfavs_arr = localStorage.getItem("SavedSubReddits").split(",");
      redditfavs_arr.map(item => {
        fetchreddit(item);
      })
    } else { set_redditfavorites(["None"]) }
 }
  }, [reloadpage, type])

  //type== food,drink or reddit catagory == strCatagory
  const viewFavorite = (type, id, catagory) => {

    if (type === "food") {
      const fetchitems = async () => {
        try {
          const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catagory}`);
          if (result.data.meals == null) { set_frontfood_list(["No Food Found Error"]) }
          else { set_frontfood_list(result.data.meals) }
          set_recipefor(id);
        } catch (e) { console.log(`Fetch ${catagory} based foods failed !  ` + e) }
      }

      fetchitems();
    }
    else if (type === "drink") {
      const fetchitems = async () => {
        try {
          const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catagory}`);
          if (result.data.drinks == null) { set_frontfood_list(["No Food Found Error"]) }
          else { set_frontfood_list(result.data.drinks) }
          set_drink_recipefor(id);
        } catch (e) { console.log(`Fetch ${catagory} based drinks failed !  ` + e) }
      }

      fetchitems();
    }
  }

  const setleft_imgfunc = goto => {
    if(type === "food"){
    if (goto === "next") {console.log(leftcounter)
      set_leftcounter(leftcounter + 1);
      if (leftcounter === foodfavorites.length - 1) { set_leftcounter(0); }
    }
    else {
      set_leftcounter(leftcounter - 1);
      if (leftcounter === 0) { set_leftcounter(foodfavorites.length - 1); }
    }
    set_leftimg([foodfavorites[leftcounter].strMealThumb, foodfavorites[leftcounter].strMeal, foodfavorites[leftcounter].strTags]);
  }
     else if(type === "drink") {
      if (goto === "next") {console.log(leftcounter)
        set_leftcounter_drink(leftcounter_drink + 1);
        if (leftcounter_drink ===drinkfavorites.length - 1) { set_leftcounter_drink(0); }
      }
      else {
        set_leftcounter_drink(leftcounter_drink - 1);
        if (leftcounter_drink === 0) { set_leftcounter_drink(drinkfavorites.length - 1); }
      }
      set_leftimg_drink([drinkfavorites[leftcounter_drink].strDrinkThumb, drinkfavorites[leftcounter_drink].strDrink, drinkfavorites[leftcounter_drink].strTags]);
     }
  }

  return (<article className="mt-18">

  {(drink_recipefor === "" && recipefor === "") &&
    <div className="flex justify-center mt-16">
      <button className={type === "food" ? "font-black underline" : "font-light hover:bg-amber-200 px-4"} onClick={() => set_type("food")}>Foods</button>
      <button className={type === "drink" ? "ml-8 font-black underline px-4" :"ml-8 font-light hover:bg-amber-200 px-4" } onClick={() => set_type("drink")}>Drinks</button>
      <button className={type === "reddit" ? "ml-8 font-black underline px-4" : "ml-8 font-light hover:bg-amber-200 px-4" } 
      onClick={() => set_type("reddit")}>Reddits</button>
    </div>
}
    {drink_recipefor !== "" && <div className="pl-32 mt-16">
      <button className="text-4xl hover:text-rose-500" onClick={() => { set_reloadpage(reloadpage + 1); set_drink_recipefor(""); }}>←</button>
      <DrinkRecipePage drinkid={drink_recipefor} similardrinks={frontfood_list} /></div>}

    {recipefor !== "" && <div className="pl-32 mt-16">
      <button className="text-4xl  hover:text-rose-500" onClick={() => { set_reloadpage(reloadpage + 1); set_recipefor(""); }}>←</button>
      <RecipePage foodid={recipefor} similarfoods={frontfood_list} />
    </div>}

    {(drink_recipefor === "" && recipefor === "") && <article>
      {type === "food" &&
        <section>
          {foodfavorites.length > 0 ? <div>{foodfavorites[0] === "None" ?
            <div><p>No saved food recipes found ....</p></div> : <section className="h-screen">
              <h1 className="ml-16 text-5xl font-light font-serif">Favorite Foods</h1>
              <div className="grid grid-cols-3 gap-3 ">

                <div className="col-span-1 h-[77vh] flex justify-center items-center">
                  <div>
                   {leftimg.length > 0 && <img className="p-4" src={leftimg[0]} alt={leftimg[1]} />}
                    <h3 className="font-light text-center px-2" key={leftimg[1]}>{leftimg[1]}</h3>
                    <p className="font-light text-center" key={`${leftimg[1]}${leftimg[1]}`}>{leftimg[2] ? `Tags : ${leftimg[2]}` : "Tags : "}</p>
                  </div>
                  <div className="text-4xl font-extrabold">
                    <button className="text-green-600 hover:text-gray-500" onClick={() => setleft_imgfunc("next")}>→</button>
                    <button className="text-rose-600 hover:text-gray-500" onClick={() => setleft_imgfunc("back")}>←</button>
                  </div>
                </div>
                <section className="h-[77vh] overflow-y-scroll col-span-2 grid grid-cols-3 gap-1  ">
                  {foodfavorites.map(item => (
                    <div className="w-11/12 hover:brightness-90" key={item.idMeal} onClick={() => viewFavorite("food", item.idMeal, item.strCategory)}>
                      <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} />
                    </div>
                  ))
                  }
                </section>
              </div>
            </section>} </div> :
            <div className="mt-8 flex justify-center h-screen"><img className="w-20 h-24" src={loading} alt="loading" /></div>

          }

        </section>
      }

      {type === "drink" &&
        <section>
          {drinkfavorites.length > 0 ? <div>{drinkfavorites[0] === "None" ?
            <div><p>No saved drinks recipes found ....</p></div> : <section className="h-screen">
              <h1 className="ml-16 text-5xl font-light font-serif">Favorite Drinks</h1>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 h-[77vh] flex justify-center items-center">
                  <div>
                    <img className="p-4" src={leftimg_drink[0]} alt={leftimg_drink[1]} />
                    <h3 className="font-light text-center px-2" key={leftimg_drink[1]}>{leftimg_drink[1]}</h3>
                    <p className="font-light text-center" key={`${leftimg_drink[1]}${leftimg_drink[1]}`}>{leftimg_drink[2] ? `Tags : ${leftimg_drink[2]}` : "Tags : "}</p>
                  </div>
                  <div className="text-4xl font-extrabold">
                    <button className="text-green-600 hover:text-gray-500" onClick={() => setleft_imgfunc("next")}>→</button>
                    <button className="text-rose-600 hover:text-gray-500" onClick={() => setleft_imgfunc("back")}>←</button>
                  </div>
                </div>
                <section className="h-[77vh] overflow-y-scroll col-span-2 grid grid-cols-3 gap-1  ">
                  {drinkfavorites.map(item => (
                    <div className="w-11/12 hover:brightness-90" key={item.idDrink} onClick={() => viewFavorite("drink", item.idDrink, item.strCategory)}>
                      <img key={item.strDrinkThumb} src={item.strDrinkThumb} alt={item.strDrink} />
                    </div>
                  ))
                  }
                </section>
              </div>
            </section>} </div> :
            <div className="mt-8 flex justify-center h-screen"><img className="w-20 h-24" src={loading} alt="loading" /></div>
          }

        </section>

      }

      {type === "reddit" &&  
        <section>
        {redditfavorites.length > 0 ? <div>{ redditfavorites[0] === "None" ?
        <div className="border-2"><p>No saved subreddits ....</p></div> : <section className="h-screen">
          <h1 className="ml-16 mb-6 text-5xl font-light font-serif">Favorite Subreddits</h1>
          <div className="grid grid-cols-3 gap-10 h-[74vh] overflow-y-scroll text-center ">
    
            {redditfavorites.map(item => (
              <Link className="w-3/4 ml-12 mb-8 border-2 border-black py-10 rounded-t-md rounded-r-full rounded-l-3xl hover:bg-yellow-100 even:bg-gray-100" key={`${item.subreddit_name_prefixed}${item.id}`} to={`/reddit/${item.subreddit}`} >
              <div className="border-b mr-4" key={item.subreddit_id}>
                <h3 className="font-mono text-2xl leading-8" key={item.subreddit}>{item.subreddit_name_prefixed}</h3>
                <p key={`${item.subreddit}${item.subreddit_subscribers}`}>{item.subreddit_subscribers ? `Subscribers ${item.subreddit_subscribers}` : ""}</p>
                <p className="text-gray-400" key={`${item.subreddit_id}${item.subreddit}`}>{item.subreddit_type}</p>
              </div>
              </Link>
            ))
            }
          </div>
        </section>  } </div> :        
        <div className="mt-8 flex justify-center h-screen"><img className="w-20 h-24" src={loading} alt="loading" /></div>

        }

        </section>

      }

    </article>




    }

    <Fotter />

  </article>
  )
}

export default MyFavorites

/*
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
        <div className="mt-64 flex justify-center "><img className="w-16" src={loading} alt="loading" /></div>
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
        <div className="mt-64 flex justify-center h-screen"><img className="h-28" src={loading} alt="loading" /></div>

        }

  */