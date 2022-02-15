import React , {useState , useEffect} from 'react'
import axios from 'axios'

const Main = () => {
  const [catagories, set_catagories] = useState([]);
  const [frontfood_list, set_frontfood_list] = useState([]);
  const [currentcatagory, set_currentcatagory] = useState("Beef");
  const [showrecipe_page , set_showrecipe_page] = useState(false);
  const [recipefor , set_recipefor] = useState("");

  const getCatagories = async () => {
     try {
    const result = await axios(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
    set_catagories(result.data.meals)

     }catch(e) { console.log("Fetch catagory failed ! " + e)}
  }

  const getFoods_list = async () => {
    try {
      const result = await axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentcatagory}`)
      set_frontfood_list(result.data.meals)

        
    }catch(e) { console.log(`Fetch ${currentcatagory} based foods failed !  ` + e)}

  }


  useEffect(() => {  getCatagories();  },[])

  useEffect(() => { getFoods_list(); },[currentcatagory])

  return (
    <article>
       <section>
        {
          catagories.map(item => (
            <button key={item.strCategory} onClick={() => set_currentcatagory(item.strCategory) }>{item.strCategory}</button>
          ))
        }
        </section>

  { showrecipe_page ? <RecipePage foodid={recipefor}/> :
     <section className="grid grid-cols-3 gap-2">
         {
           frontfood_list.map(item => (
             <div key={item.idMeal} onClick={() => { set_recipefor(item.idMeal); set_showrecipe_page(true);}}>
             <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} />
             <p key={item.strMeal}>{item.strMeal}</p>

             </div>
           ))
         }
        </section>}
    </article>
  )
}

const RecipePage = ({foodid}) => {

  const [recipedata, set_recipedata] = useState([]);
  const [recipetext, set_recipetext] = useState([]);
  const [ingredients , set_ingridients] = useState([]);
  const [ingredientamount , set_ingredientsamount] = useState([]);


  const getRecipe = async () => {

    try {
      const result = await axios(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodid}`)

      set_recipedata(result.data.meals)
      let temparr = result.data.meals[0].strInstructions.split("."); 

      set_recipetext(temparr);

      temparr= [];
     let temparr_two = [];

          for(let i=1; i<21 ; i++)
          { 
            let str = "strIngredient" + i;
            let str2 = "strMeasure" + i;
              temparr.push(result.data.meals[0][str])  
              temparr_two.push(result.data.meals[0][str2])  
          }

          set_ingridients(temparr);
          set_ingredientsamount(temparr_two);

               temparr =[];  temparr_two =[];
               console.log(ingredients)
               console.log(ingredientamount);


    }catch(e) { console.log(`Fetch recipe for ${foodid} failed !  ` + e)}
  }

  useEffect(() => {  getRecipe()  },[])

  return (<section>
    {
      recipedata.map(item => (
        <div key={`${item.strMeal} ${item.idMeal}`}>
          <h4 key={item.strMeal}>{item.strMeal}</h4>
          <img key={item.strMealThumb} src={item.strMealThumb} alt={item.strMeal} />
          { recipetext.map(steps => (   <p key={steps}>- {steps}</p>   )) }

          { ingredients.map(obj => (obj !== "" && <p key={obj}>{obj} ------- {ingredientamount[ingredients.indexOf(obj)] }</p>   )) }

        </div>
      ))
    }
    </section>)
}

export default Main