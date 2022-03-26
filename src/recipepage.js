import { useState, useEffect } from 'react'
import axios from 'axios'
import loading from './imgs/loading_.gif'
import saveFavorites from './savefavorites_function'
import removeFavorite from './removefavorites_function'


const RecipePage = ({ foodid, similarfoods }) => {

  const [currentfood_id, set_currentfood_id] = useState(foodid)
  const [recipedata, set_recipedata] = useState([]);
  const [recipetext, set_recipetext] = useState([]);
  const [ingredients, set_ingridients] = useState([]);
  const [ingredientamount, set_ingredientsamount] = useState([]);
  const [youtubeid, set_youtubeid] = useState("");
  const [showvideo, set_showvideo] = useState(false);
  const [isfavorite, set_isfavorite] = useState(false);
  let favoritefoods = [];

  const getRecipe = async () => {

    try {
      const result = await axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currentfood_id}`)

      if (localStorage.getItem("SavedFoods")) {
        favoritefoods = localStorage.getItem("SavedFoods").split(",");
        if (favoritefoods.includes(currentfood_id)) { set_isfavorite(true); }
      }


      set_recipedata(result.data.meals)
      let temparr = result.data.meals[0].strInstructions.split("\n");

      set_recipetext(temparr);

      temparr = [];
      let temparr_two = [];

      for (let i = 1; i < 21; i++) {
        let str = "strIngredient" + i;
        let str2 = "strMeasure" + i;

        if (result.data.meals[0][str] || result.data.meals[0][str] !== "") {
          temparr.push(result.data.meals[0][str])
          temparr_two.push(result.data.meals[0][str2])
        }

        if (result.data.meals[0][str] == null) {
          temparr.pop();
          temparr_two.pop();
        }
      }


      set_ingridients(temparr);
      set_ingredientsamount(temparr_two);

      temparr = []; temparr_two = [];

      temparr = result.data.meals[0].strYoutube.split("=");

      set_youtubeid(temparr[temparr.length - 1]);
      temparr = [];


    } catch (e) { console.log(`Fetch recipe for ${foodid} failed !  ` + e) }

  }

  useEffect(() => { set_isfavorite(false); getRecipe() }, [currentfood_id])




  return (<section className="mt-8">
    {recipedata.length === 0 ? <div className="loading_container">
      <img src={loading} alt="loading" className="w-12 h-12" />
    </div> :
      <div className="mt-16">
        {
          recipedata.map(item => (
            <div key={`${item.strMeal} ${item.strMeal} ${item.idMeal}`}>
              <section key={`${item.strMeal} ${item.strMeal} ${item.idMeal}1`} className="top_section">
                <div key={`${item.strMeal} ${item.strMeal} ${item.idMeal}2`} className="top_section-top--div">
                  <div className="flex justify-center"><img className="ml-1 w-full lg:w-[440] " key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} /></div>
                  <div key={`${item.strMeal} ${item.strMeal} ${item.idMeal}3`} className="top_section-top--secondary---div">
                    <h4 className="top_section-top--h4" key={item.strMeal}>{item.strMeal} </h4>
                    {isfavorite ?

                      <button key={`${item.idMeal}${item.idMeal}1`} className="isfavorite_btn-saved" onClick={() => {set_isfavorite(false); removeFavorite("food", item.idMeal)}}><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11 15h2V9h3l-4-5l-4 5h3z" /><path fill="currentColor" d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z" /></svg><p className="lg:ml-2">Saved</p></button> :

                      <button key={`${item.idMeal}${item.idMeal}2`} className="isfavorite_btn-add" onClick={() => { set_isfavorite(true); saveFavorites("food", item.idMeal) }}><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5l-5-5l1.41-1.41L11 12.67V3h2v9.67z" /></svg><p className="lg:ml-2">Add to Favories</p></button>
                    }
                  </div>
                </div>

                {!showvideo && <button key={`${item.strMeal} ${item.strMeal} ${item.idMeal}5`} className="showyoutube" onClick={() => set_showvideo(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-4  self-center" aria-hidden="true" role="img" width="2em" height="2em" viewBox="0 0 16 16"><path fill="currentColor" d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104l.022.26l.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105l-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006l-.087-.004l-.171-.007l-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103l.003-.052l.008-.104l.022-.26l.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007l.172-.006l.086-.003l.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" /></svg><span className="self-center">Watch Video Instead</span></button>}

                {
                  (showvideo && youtubeid !== "") && <div className="lg:ml-8 w-full lg:w-4/5 xl:w-1/2" key={`${item.strMeal} ${item.strMeal} ${item.idMeal}6`}>
                    <iframe className="w-full lg:w-[440]" key={`${item.strMeal} ${item.strMeal} ${item.idMeal}9`}  height="425" src={`https://www.youtube.com/embed/${youtubeid}`} title="YouTube video player" frameborder="0" allowFullScreen></iframe>
                    <button key={`${item.strMeal} ${item.strMeal} ${item.idMeal}10`} className="w-full hover:bg-gray-200" onClick={() => set_showvideo(false)}>❌</button>
                  </div>
                }

              </section>

              <section className="secondary_section">
                {ingredientamount.length > 0 && <div className="secondary_section-top--div">
                  <h2 className="text-center capitalize text-2xl leading-10 pb-8">Ingredients Needed</h2>
                  {ingredients.map(obj => (<p className="text-center leading-8" key={`${item.idMeal}${obj} ${item.idMeal}`}>{ingredientamount[ingredients.indexOf(obj)]} {obj}</p>))}
                </div>}

                <div className="secondary_section-secondary-top--div">
                  <h2 className="secondary_section-secondary--h2">Recipe</h2>
                  {recipetext.map(steps => (steps !== "" && <p  key={steps}> {steps}</p>))}
                </div>
              </section>


            </div>

          ))
        } </div>}

    {recipedata.length !== 0 && <h2 className="simmilarfoods_h2">Similar Foods</h2>}

    <div className="simmilarfoods_div-container">

      {similarfoods.map(item => (<div className="simmilarfoods_div-container--div" onClick={() => set_currentfood_id(item.idMeal)} key={`${item.idMeal}${item.strMealThumb}${item.strMeal}`}>
        {
          (recipedata[0] !== undefined && recipedata[0].strMeal !== item.strMeal) && <div className="simmilarfoods_div-container--div---div" key={`${item.strMealThumb}${item.strMeal}`} >
            <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} />
            <p className="text-center" key={item.strMeal}>{item.strMeal}</p>
          </div>
        }
      </div>
      )
      )}
    </div>
  </section>)
}

export default RecipePage;
